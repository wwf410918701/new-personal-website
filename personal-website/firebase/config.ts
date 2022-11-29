import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

firebase.initializeApp({
  apiKey: process.env.FIREBASE_CONFIGS_APIKEY,
  authDomain: process.env.FIREBASE_CONFIGS_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_CONFIGS_PROJECT_ID,
  storageBucket: process.env.FIREBASE_CONFIGS_SOTRAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_CONFIGS_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_CONFIGS_APP_ID,
  measurementId: process.env.FIREBASE_CONFIGS_MEASUREMEN_ID
})

export const firestore = firebase.firestore();