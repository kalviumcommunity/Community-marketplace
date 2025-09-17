// getProductsBySeller.js
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const getProductsBySeller = async (sellerID) => {
  const q = query(collection(db, "products"), where("sellerID", "==", sellerID));
  const querySnapshot = await getDocs(q);

  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });

  return products;
};
