// firebaseConfig.js (create this file and paste your config)
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyCC4mxnmgoa5ynompZFMQlQ9SqbstXLBto",
  authDomain: "communitymarketplace-ba558.firebaseapp.com",
  projectId: "communitymarketplace-ba558",
  storageBucket: "communitymarketplace-ba558.firebasestorage.app",
  messagingSenderId: "145790767430",
  appId: "1:145790767430:web:55319e9ef2dfeab2d95547",
  measurementId: "G-XB63PQBEB1"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});


export { storage, db, auth };
