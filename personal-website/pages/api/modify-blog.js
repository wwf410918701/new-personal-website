import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const storage = getStorage();

const metadata = {
  contentType: 'image/jpeg'
};

const uploadImg = (filename, file) => {
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

export const updatePost = async(postID, title, summary, paragraph, author, posterImgUrl, userID) => {
  const createAt = new Date()
  const postAbstractRef = firestore.doc(`postsAbstract/${postID}`)
  const postRef = firestore.doc(`posts/${postID}`)
  const blogComments = await (await postRef.get()).data()['comments']

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
          comments: blogComments
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

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  const {postID, title, summary, paragraph, author, posterFile, posterFileName, userID} = req.body

  if(posterFile) {
    uploadImg(posterFileName, posterFile)
    .then(async (posterImgUrl) => {
      const isSuccess = await updatePost(postID, title, summary, paragraph, author, posterImgUrl, userID)

      if(isSuccess) {
        res.status(200).send({message: 'Successfully create a new blog'})
      } else {
        console.log('Error when creating user')
        res.status(500).send({ message: 'Fail to create new blog' })
        return
        }
    })
  }
}

export default handler