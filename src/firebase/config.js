// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClf7P_lF08FfpR5muAMqpaDtVZSUA1ha4",
  authDomain: "olx-clone-99caf.firebaseapp.com",
  projectId: "olx-clone-99caf",
  storageBucket: "olx-clone-99caf.appspot.com",
  messagingSenderId: "1006346479179",
  appId: "1:1006346479179:web:d4fa567722ee0f9487cfce",
  measurementId: "G-ZLPSRLPH0N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);


    
