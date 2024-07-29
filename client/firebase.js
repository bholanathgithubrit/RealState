// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  apiKey:"AIzaSyCBHHiTFPHLpJrg6LDSwl9HIbyvoT7AChI",
  authDomain: "mern-realstate-29c93.firebaseapp.com",
  projectId: "mern-realstate-29c93",
  storageBucket: "mern-realstate-29c93.appspot.com",
  messagingSenderId: "414796609152",
  appId: "1:414796609152:web:c8ce23e9ab7e03a9a9d865",
  measurementId: "G-66EKZVX2TT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
