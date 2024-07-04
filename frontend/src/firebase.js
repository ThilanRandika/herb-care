// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3_JowslpjTgrsZUxIwgMGQUra5QEk1N4",
  authDomain: "herbcare-e8b47.firebaseapp.com",
  projectId: "herbcare-e8b47",
  storageBucket: "herbcare-e8b47.appspot.com",
  messagingSenderId: "570616096060",
  appId: "1:570616096060:web:14e4e4509b52430af8ea39",
  measurementId: "G-J0L7P4RF7Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;