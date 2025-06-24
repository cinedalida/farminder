// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkh2Etov6Ut_pzge0tu7vmL2AsxY3jDc8",
  authDomain: "to-do-app-56672.firebaseapp.com",
  projectId: "to-do-app-56672",
  storageBucket: "to-do-app-56672.firebasestorage.app",
  messagingSenderId: "519601501164",
  appId: "1:519601501164:web:389fd7a22b1ab3fb3846c9",
  measurementId: "G-13Z0XF9GJ1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
