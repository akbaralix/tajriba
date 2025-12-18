import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQ1ABAdTYT-xsGZvPRSvgIUofAqezr9d8",
  authDomain: "my-app-4da9d.firebaseapp.com",
  projectId: "my-app-4da9d",
  storageBucket: "my-app-4da9d.firebasestorage.app",
  messagingSenderId: "538171065502",
  appId: "1:538171065502:web:61beb088e08cab050d278f",
  measurementId: "G-ZDYS55P7C1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
