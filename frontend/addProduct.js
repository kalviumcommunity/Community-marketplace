// addProduct.js
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebaseConfig';
// import { uploadImage } from './components/screens/uploadImage'; // ❌ Disabled for now

export async function addProduct({ name, description, price, category, imageUri, sellerID }) {
  try {
    // const imageURL = imageUri
    //   ? await uploadImage(imageUri, `products/${sellerID}/${Date.now()}.jpg`)
    //   : null;

    const docRef = await addDoc(collection(db, "products"), {
      name,
      description,
      price: Number(price),
      // imageURL,  // ❌ Disabled for now
      category,
      sellerID,
      createdAt: serverTimestamp(),
    });

    return { id: docRef.id, success: true };
  } catch (error) {
    console.error("addProduct error", error);
    throw error;
  }
}
