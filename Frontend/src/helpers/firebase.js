// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getEnv } from "./getEnv";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:getEnv('VITE_FIREBASE_API_KEY'),
  authDomain: "frontend-task-be630.firebaseapp.com",
  projectId: "frontend-task-be630",
  storageBucket: "frontend-task-be630.firebasestorage.app",
  messagingSenderId: "713616465060",
  appId: "1:713616465060:web:55920ce3cc30fe24de5a31",
  measurementId: "G-W4Y3CF4N81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};