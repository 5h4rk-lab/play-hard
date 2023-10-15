import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvLfdQfcfOlYudNigNcriuVWLjVd2idAE",
  authDomain: "playhard-a8b7f.firebaseapp.com",
  projectId: "playhard-a8b7f",
  storageBucket: "playhard-a8b7f.appspot.com",
  messagingSenderId: "941691401150",
  appId: "1:941691401150:web:a3c1a3e167d7c27d527fef",
  measurementId: "G-D07HSF7XJK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  db,
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  doc,
  setDoc
};
