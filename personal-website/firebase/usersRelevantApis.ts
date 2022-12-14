import firebase from 'firebase/compat/app';
import { auth, firestore } from './config';

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export const storeUser = async (uid: string, displayName: string, email: string, createAt: string, blogs: string[]) => {
  const userRef = firestore.doc(`users/${uid}`)
  const userSnapshot = await userRef.get()
  

  if(!userSnapshot.exists) {
    return userRef.set({
      uid,
      displayName,
      email,
      createAt,
      blogs,
    })
    .catch((e) => {
      console.log("Error when saving google login users' info")
      console.log(e)
    })
  }
}

//google authentication won't provide user name
export const fetchUserInfo = (uid: string) => {
  const userRef = firestore.doc(`users/${uid}`)

  return userRef.get()
  .then(userDoc => userDoc.data())
}