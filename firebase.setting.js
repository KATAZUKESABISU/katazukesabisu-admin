// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB0x0bvPt6Z8lgbI8xor7J3RtHSBsk0Tao',
  authDomain: 'katazukesabisu.firebaseapp.com',
  projectId: 'katazukesabisu',
  storageBucket: 'katazukesabisu.appspot.com',
  messagingSenderId: '236278276570',
  appId: '1:236278276570:web:f5435950638473ef72e0e3',
  measurementId: 'G-70XT8FH61Q',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
