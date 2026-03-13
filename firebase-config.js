// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYdj8lqtZhbcZYrFz6lMxO_-5H67E_7Kk",
  authDomain: "project-6b317.firebaseapp.com",
  projectId: "project-6b317",
  storageBucket: "project-6b317.firebasestorage.app",
  messagingSenderId: "991496929921",
  appId: "1:991496929921:web:732baf782d66a23bd54380",
  measurementId: "G-64H6QW8NHJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };