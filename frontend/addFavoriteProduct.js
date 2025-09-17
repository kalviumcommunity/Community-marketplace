// addFavoriteProduct.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const addFavoriteProduct = async (userID, productID) => {
  try {
    const docRef = await addDoc(collection(db, "users", userID, "favorites"), {
      productID: productID
    });
    console.log("Favorite added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};
