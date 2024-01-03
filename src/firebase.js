// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDOKTxTUCa5aQbgQbH2guxxKJpiQGctQ4I",
  authDomain: "loginform-5a9a7.firebaseapp.com",
  projectId: "loginform-5a9a7",
  storageBucket: "loginform-5a9a7.appspot.com",
  messagingSenderId: "150703092551",
  appId: "1:150703092551:web:6b592be9931632e9eb9262",
  measurementId: "G-ZM360BNNKV"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };