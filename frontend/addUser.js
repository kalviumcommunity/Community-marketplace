// addUser.js
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const addUser = async (user) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      username: user.username,
      email: user.email,
      profileImageURL: user.profileImageURL,
      bio: user.bio,
      location: user.location,
      createdAt: Timestamp.now()
    });
    console.log("User added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};
