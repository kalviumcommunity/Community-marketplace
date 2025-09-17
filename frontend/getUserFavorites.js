// getUserFavorites.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const getUserFavorites = async (userID) => {
  const querySnapshot = await getDocs(collection(db, "users", userID, "favorites"));

  const favoriteProductIDs = [];
  querySnapshot.forEach((doc) => {
    favoriteProductIDs.push(doc.data().productID);
  });

  return favoriteProductIDs;
};
