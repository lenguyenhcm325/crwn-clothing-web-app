import { initializeApp } from "firebase/app";
import { getAuth, 
  signInWithRedirect, 
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,

} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDI7k30j6AKoCWMcMXCCprBs5FKwCVIMRI",
  authDomain: "crwn-clothing-db-a7b2e.firebaseapp.com",
  projectId: "crwn-clothing-db-a7b2e",
  storageBucket: "crwn-clothing-db-a7b2e.appspot.com",
  messagingSenderId: "574220431750",
  appId: "1:574220431750:web:c9ce4fa38fde74c361bc07",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth(); 
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth,
                                                additionalInformation  = {}) => {
  if (!userAuth) return ;
  const userDocRef = doc(db, 'users', userAuth.uid);

  // console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  // console.log(userSnapshot.exists());

  if (!userSnapshot.exists()){
    const {displayName, email} = userAuth; 
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    }
    catch (error){
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;

};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return ;
  return await createUserWithEmailAndPassword(auth, email, password);

};

