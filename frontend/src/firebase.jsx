import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAYXjesy2hFtCPfTSnHGs0xSX2DFb62z8Q",
    authDomain: "gadget-hunt-8f2b6.firebaseapp.com",
    projectId: "gadget-hunt-8f2b6",
    storageBucket: "gadget-hunt-8f2b6.firebasestorage.app",
    messagingSenderId: "390888398672",
    appId: "1:390888398672:web:de9f74f98654a102725655",
    measurementId: "G-F8NDX36YQG"
  };
  
// Initialize Firebase with the provided config
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };