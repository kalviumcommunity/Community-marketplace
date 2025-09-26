// addUser.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const addUser = async (user) => {
  try {
    // Create a user object with only defined values
    const userData = {
      username: user.username,
      email: user.email,
      createdAt: serverTimestamp(),
      // Only add optional fields if they have values
      ...(user.bio && { bio: user.bio }),
      ...(user.location && { location: user.location }),
      ...(user.profileImageURL && { profileImageURL: user.profileImageURL }),
      ...(user.uid && { uid: user.uid })
    };

    const docRef = await addDoc(collection(db, "users"), userData);
    console.log("User added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};
