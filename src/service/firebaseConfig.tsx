// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBa9tU5Vt8uuamrd5XBLMu_YK3rNJG4qF0",
  authDomain: "ai-tour-planner-48e4b.firebaseapp.com",
  projectId: "ai-tour-planner-48e4b",
  storageBucket: "ai-tour-planner-48e4b.appspot.com", // Corrected the storage bucket URL
  messagingSenderId: "579112895941",
  appId: "1:579112895941:web:276de60fe45b63c14bf7ac",
  measurementId: "G-513H9YH3KG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
