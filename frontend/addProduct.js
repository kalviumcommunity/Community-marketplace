// addProduct.js
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const addProduct = async (product) => {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      name: product.name,
      description: product.description,
      price: product.price,
      imageURL: product.imageURL,
      category: product.category,
      createdAt: Timestamp.now(),
      sellerID: product.sellerID
    });
    console.log("Product added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
