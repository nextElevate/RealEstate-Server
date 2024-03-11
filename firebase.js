// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOzf0A46cpv2ZlndRMEuAkaehHh3o7Y4g",
  authDomain: "armoda-8a8d7.firebaseapp.com",
  projectId: "armoda-8a8d7",
  storageBucket: "armoda-8a8d7.appspot.com",
  messagingSenderId: "467246138233",
  appId: "1:467246138233:web:294509fac140924d3865a8",
  measurementId: "G-0CFMZX4XPM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);
