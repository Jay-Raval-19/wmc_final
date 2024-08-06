// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAagZfLU7E3atiDZj6HA-ra_8DtA_N8lX4",
  authDomain: "luxury-los-santos.firebaseapp.com",
  projectId: "luxury-los-santos",
  storageBucket: "luxury-los-santos.appspot.com",
  messagingSenderId: "117441796947",
  appId: "1:117441796947:web:a50e7b07c023c650dbdfa6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const prov = new GithubAuthProvider();

export { app, auth, provider, prov };
