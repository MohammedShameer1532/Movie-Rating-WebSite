// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB3rwzARACmIjUy5HPRHNNRUIw2dDEeEaU",
  authDomain: "movieworld-7595f.firebaseapp.com",
  projectId: "movieworld-7595f",
  storageBucket: "movieworld-7595f.appspot.com",
  messagingSenderId: "319731404089",
  appId: "1:319731404089:web:49cb0bbc097b53829eece8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const dataRef  = collection(db, "userData");

export default app;