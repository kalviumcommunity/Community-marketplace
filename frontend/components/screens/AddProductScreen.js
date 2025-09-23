import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
// import * as ImagePicker from 'expo-image-picker';   // ❌ Disabled
// import { uploadImage } from "../screens/uploadImage"; // ❌ Disabled
import { addProduct } from "../../addProduct";

const AddProductScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [sellerID, setSellerID] = useState("");
  // const [imageURI, setImageURI] = useState(null);   // ❌ Disabled
  // const [imageURL, setImageURL] = useState("");     // ❌ Disabled

  // const pickImage = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setImageURI(result.assets[0].uri);
  //   }
  // };

  const handleAddProduct = async () => {
    await addProduct({
      name,
      description,
      price: parseFloat(price),
      // imageURL: uploadedURL,   // ❌ Disabled
      category,
      sellerID,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <TextInput
        placeholder="Seller ID"
        value={sellerID}
        onChangeText={setSellerID}
        style={styles.input}
      />

      {/* <Button title="Pick Image" onPress={pickImage} /> */}
      {/* {imageURI && (
        <Image
          source={{ uri: imageURI }}
          style={{ width: 200, height: 200, marginVertical: 10 }}
        />
      )} */}

      <Button title="Add Product" onPress={handleAddProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
  },
});

export default AddProductScreen;
