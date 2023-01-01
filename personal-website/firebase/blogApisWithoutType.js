import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firestore, storage } from './config'
import moment from "moment";

const metadata = {
  contentType: 'image/jpeg'
};

export const uploadImg = (filename, file) => {
  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, 'images/' + filename);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  return new Promise((resolve, reject) => {
    // Listen for state changes, errors, and completion of the upload.  
    uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          reject("User doesn't have permission to access the object when uploading img")
          break;
        case 'storage/canceled':
          // User canceled the upload
          reject("User canceled the upload when uploading img")
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          reject("Unknown error occurred when uploading img")
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        resolve(downloadURL)
      });
    }
  );})
  .catch(error => {
    console.log(error)
  })
}

export const addBlogToUserAccount = (userID, blogID) => {
  const userAccountRef = firestore.doc(`users/${userID}`)
  
  return userAccountRef.get().then(data => data.data()['blogs'])
    .then(preBlogs => [...preBlogs, blogID])
    .then(updatedBlogs => userAccountRef.update('blogs', updatedBlogs))
    .catch(e => {
      console.log('Error when trying to save the post to your account.')
      console.log(e);
    })
} 

export const updatePost = async(postID, title, summary, paragraph, author, posterImgUrl, userID) => {
  const createAt = moment().format("DD/MM/YYYY") 
  const postAbstractRef = firestore.doc(`postsAbstract/${postID}`)
  const postRef = firestore.doc(`posts/${postID}`)
  const blogComments = await (await postRef.get()).data()?.comments?? []

  await postAbstractRef.set(
    {
      id: postID,
      title,
      summary,
      time: createAt,
      author,
      posterImgUrl,
    }
  )
  .then(async() => {
    
    await postRef.set(
      {
          id: postID,
          title,
          content: paragraph,
          comments: blogComments,
          time: createAt,
          author,
      }
    )
  })
  .catch((e) => {
    // TODO:发生失败时数据库两个均需回退，也即删除已创建的某一部分数据
    console.log('Error when updating post to firebase=>')
    console.log(e)
    return false
  })
  return true
}

export const storePost = async(blogId, title, summary, paragraph, author, posterImgUrl, userID) => {
  const createAt = moment().format("DD/MM/YYYY") 
  const postAbstractRef = firestore.doc(`postsAbstract/${blogId}`)

  return postAbstractRef.set(
    {
      id: blogId,
      title,
      summary,
      time: createAt,
      author,
      posterImgUrl,
    }).then(async () => {
      const postRef = firestore.doc(`posts/${blogId}`)
      await postRef.set(
        {
            id: blogId,
            title,
            content: paragraph,
            comments: [],
            time: createAt,
            author,
        }
        )
    }).then(async () => {
      await addBlogToUserAccount(userID, blogId)
    })
    .catch((e) => {
      // TODO:发生失败时数据库两个均需回退，也即删除已创建的某一部分数据
      console.log('Error when saving post to firebase=>')
      console.log(e)
    })
  // return postsSummariesCollectionRef.orderBy('id', 'desc').limit(1).get()
  //   .then(lastData => {
  //     return lastData.docs[0].data().id
  //   })
  //   .then(async (lastId) => {
  //     const postAbstractRef = firestore.doc(`postsAbstract/${blogId}`)
  //     await postAbstractRef.set(
  //       {
  //         id: blogId,
  //         title,
  //         summary,
  //         time: createAt,
  //         author,
  //         posterImgUrl,
  //       }
  //     )
  //     .then(async() => {
  //       const postRef = firestore.doc(`posts/${blogId}`)
  //       await postRef.set(
  //         {
  //             id: blogId,
  //             title,
  //             content: paragraph,
  //             comments: [],
  //             time: createAt,
  //             author,
  //         }
  //       )
  //     })
  //     .then(async () => {
  //       await addBlogToUserAccount(userID, blogId)
  //     })
  //   })
  
}

export const deletePost = (postID, userID) => {
  const postRef = firestore.doc(`posts/${postID}`)
  const postAbstractRef = firestore.doc(`postsAbstract/${postID}`)

  return postRef.delete()
  .then(async () => {
    await postAbstractRef.delete()
  })
  .then(() => deletePostBelongingOnUserAccount(postID, userID))
}

const deletePostBelongingOnUserAccount = (postID, userID) => {
  const userRef = firestore.doc(`users/${userID}`)

  userRef.get()
  .then(res => res.data()['blogs'])
  .then(userBlogs => userBlogs.filter(userBlog => userBlog !== postID))
  .then(updatedUserBlog => userRef.update('blogs', updatedUserBlog))
}

export const createComment = (blogID, content, displayName, uid) => {
  const postRef = firestore.doc(`posts/${blogID}`)
  const createAt = new moment().format("DD/MM/YYYY") 

  return postRef.get().then(postRes => postRes.data())
  .then(post => post.comments)
  .then(preComments => {
    let latestID = 0;

    if (preComments.length !== 0) {
      latestID = preComments.map(preComment => preComment.commentID).sort((a, b) => {
        if (a > b) {
          return -1;
        }
        if (b > a) {
          return 1;
        }
        return 0;
      })[0]
    }

    return{
      latestCommentID: latestID + 1,
      preComments,
    }
  })
  .then(preCommentsData => {
    const addedCommentsArray = [...preCommentsData.preComments, {
      commentID: preCommentsData.latestCommentID,
      content, 
      displayName, 
      createAt, 
      uid,
    }]
    postRef.update('comments', addedCommentsArray)
    return addedCommentsArray
  })
}