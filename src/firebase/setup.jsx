
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVois8ULW28uKSJYWufa0SnWI8qeqHFlw",
  authDomain: "newsportal-e0cd9.firebaseapp.com",
  projectId: "newsportal-e0cd9",
  storageBucket: "newsportal-e0cd9.appspot.com",
  messagingSenderId: "325923153134",
  appId: "1:325923153134:web:a283e9eeff7091afabffff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =  getAuth(app);
export const googleProvider = new GoogleAuthProvider(app)