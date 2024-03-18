// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getStorage, ref} from 'firebase/storage';
import storage from '@react-native-firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyBn1X5oFyE7PqyHrcy6ng5LLbZQEZl-xUs',
  authDomain: 'college-xplorer.firebaseapp.com',
  projectId: 'college-xplorer',
  storageBucket: 'college-xplorer.appspot.com',
  messagingSenderId: '323101372233',
  appId: '1:323101372233:web:9a6cbb876b3c87dc777498',
  measurementId: 'G-1109XTP4X9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { storage };