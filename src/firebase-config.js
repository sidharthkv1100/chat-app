// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdbWQ0mA7vVDjHiJ_jEBXhic6JoALjVbQ",
  authDomain: "chat-app-b479e.firebaseapp.com",
  projectId: "chat-app-b479e",
  storageBucket: "chat-app-b479e.appspot.com",
  messagingSenderId: "542528158640",
  appId: "1:542528158640:web:e8bac7a9a76b3b59acf475"
};

// Initialize Firebase ONCE
const app = initializeApp(firebaseConfig);

// Exports used by your app
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
