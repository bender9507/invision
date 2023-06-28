// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwBmvnTOLr2hU8DgCkZ0VR45ALkJjxu1w",
  authDomain: "news-feed-934b1.firebaseapp.com",
  projectId: "news-feed-934b1",
  storageBucket: "news-feed-934b1.appspot.com",
  messagingSenderId: "674626926382",
  appId: "1:674626926382:web:084d2f4af208c21a2b6cbf",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
