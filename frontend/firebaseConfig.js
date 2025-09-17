import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBTGQVRD-LGTHWz0qBnBoIKjPW-bUFVA38",
  authDomain: "communitymarketplace-2201c.firebaseapp.com",
  projectId: "communitymarketplace-2201c",
  storageBucket: "communitymarketplace-2201c.appspot.com",
  messagingSenderId: "335943867842",
  appId: "1:335943867842:web:ed7b425b75d67de1c58a5b",
  measurementId: "G-6MTHDGZ5YS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
