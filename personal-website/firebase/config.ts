import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { getStorage } from "firebase/storage";

firebase.initializeApp({
  apiKey: "AIzaSyDlgcSFXk0KKe7zUPy2TU34GyXn1jyXp64",
  authDomain: "wwf-blog.firebaseapp.com",
  projectId: "wwf-blog",
  storageBucket: "wwf-blog.appspot.com",
  messagingSenderId: "785735803966",
  appId: "1:785735803966:web:1de416af3ed64f6ee7dd6f",
  measurementId: "G-9QRV1GTH53",
});

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = getStorage();
