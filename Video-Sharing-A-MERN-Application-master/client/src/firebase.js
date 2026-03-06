// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBvm2Wo4nGu_-1CPj-31mrJVyzdsFAFbcI",
  authDomain: "video-sharing-b7240.firebaseapp.com",
  projectId: "video-sharing-b7240",
  storageBucket: "video-sharing-b7240.appspot.com",
  messagingSenderId: "348653060019",
  appId: "1:348653060019:web:fd3be1c03d45cd3c7f95c6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app); // Add this line

export default app;
