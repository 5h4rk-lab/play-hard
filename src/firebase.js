// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
export const auth = getAuth(app);