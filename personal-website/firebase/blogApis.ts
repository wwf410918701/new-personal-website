import moment from "moment";
import { firestore, storage } from "./config";
import { Blog, Summary } from "./type";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  list,
  listAll,
  ref as stRef,
  StorageReference,
  uploadBytesResumable,
} from "firebase/storage";

// Create the file metadata
/** @type {any} */
const metadatas = {
  jpeg: { contentType: "image/jpeg" },
  jpg: { contentType: "image/jpg" },
  png: { contentType: "image/png" },
  pdf: { contentType: "application/pdf" },
};

export const storeEmployerMessage = async (
  name: string,
  email: string,
  message: string
) => {
  try {
    const createAt = moment().format("MMM Do YY");
    const employerMessageRef = firestore.doc(
      `employer-messages/${createAt}_${name}`
    );
    await employerMessageRef.set({
      name,
      email,
      message,
      time: createAt,
    });
    return true;
  } catch (error) {
    console.log("Error when saving employer message to firebase");
    return false;
  }
};

//Get the next linesToReadCount lines of summary data start at startAt id
export const fetchAllPostsSummaries = async () => {
  const postsSummariesCollectionRef = firestore.collection(`postsAbstract/`);

  const data = await postsSummariesCollectionRef.get();
  return data.docs.map((doc) => {
    const { author, id, posterImgUrl, summary, time, title } = doc.data();
    return {
      author: author ?? "",
      id: id ?? "",
      posterImgUrl: posterImgUrl ?? "",
      summary: summary ?? "",
      time: time?.toString() ?? "",
      title: title ?? "",
    };
  }) as Summary[];
};

export const fetchPost = async (id: string) => {
  const postRef = firestore.doc(`posts/${id}`);

  const response = await postRef.get();
  const postData = await response.data();
  if (postData) {
    postData.comments = (postData as Blog).comments.map((comment) => ({
      ...comment,
      createAt: comment.createAt.toString(),
    }));
  }

  return postData as Blog | null;
};

export const uploadBlogsImgs = (
  filename: string,
  file: File
): Promise<string | null | undefined> => {
  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = stRef(storage, "images/" + filename);
  const uploadTask = uploadBytesResumable(
    storageRef,
    file,
    metadatas[filename.split(".")[1] as "jpeg" | "jpg" | "png"]
  );

  return new Promise((resolve, reject) => {
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            reject(
              "User doesn't have permission to access the object when uploading img"
            );
            break;
          case "storage/canceled":
            // User canceled the upload
            reject("User canceled the upload when uploading img");
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            reject("Unknown error occurred when uploading img");
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

export const fetchPostSummary = (id: string) => {
  const postSummaryRef = firestore.doc(`postsAbstract/${id}`);

  return postSummaryRef
    .get()
    .then((postdoc) => postdoc.data() as Summary | null);
};
