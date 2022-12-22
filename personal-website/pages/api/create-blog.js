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

const storePost = async(title, summary, paragraph, author, posterImgUrl, userID) => {
  const createAt = new Date()
  const postsSummariesCollectionRef = firestore.collection(`postsAbstract/`)
  
  postsSummariesCollectionRef.orderBy('id', 'desc').limit(1).get()
    .then(lastData => {
      return lastData.docs[0].data().id
    })
    .then(async (lastId) => {
      const postAbstractRef = firestore.doc(`postsAbstract/${lastId+1}`)
      await postAbstractRef.set(
        {
          id: lastId + 1,
          title,
          summary,
          time: createAt,
          author,
          posterImgUrl,
        }
      )
      .then(async() => {
        const postRef = firestore.doc(`posts/${lastId+1}`)
        await postRef.set(
          {
              id: lastId + 1,
              title,
              content: paragraph,
              comments: [],
          }
        )
      })
      .then(async () => {
        await addBlogToUserAccount(userID, (lastId + 1))
      })
    })
  .catch((e) => {
    // TODO:发生失败时数据库两个均需回退，也即删除已创建的某一部分数据
    console.log('Error when saving post to firebase=>')
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
  const {title, summary, paragraph, author, posterFile, posterFileName, userID} = req.body

  if(posterFile) {
    uploadImg(posterFileName, posterFile)
    .then(async (posterImgUrl) => {
      const isSuccess = await storePost(title, summary, paragraph, author, posterImgUrl, userID)

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