import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
// import * as ImagePicker from 'expo-image-picker';
import { addProduct } from "../../addProduct";
// import { uploadToCloudinary } from "../../utils/cloudinaryUpload";

const AddProductScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [sellerID, setSellerID] = useState("");
  // const [image, setImage] = useState(null);
  // const [imageURL, setImageURL] = useState("");
  // const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      // Pick the image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'image',
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets[0].uri) {
        setImage(result.assets[0].uri);
        uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error picking image');
    }
  };

  // const uploadImage = async (uri) => {
  //   try {
  //     setUploading(true);
      
  //     // Upload to Cloudinary
  //     const cloudinaryUrl = await uploadToCloudinary(uri);
  //     console.log('File uploaded successfully');
      
  //     setImageURL(cloudinaryUrl);
  //     setUploading(false);
  //     Alert.alert('Success', 'Image uploaded successfully!');
  //   } catch (error) {
  //     console.error('Error uploading:', error);
  //     setUploading(false);
  //     Alert.alert(
  //       'Upload Error', 
  //       'Failed to upload image. Please check your internet connection and try again.'
  //     );
  //   }
  // };

  const handleAddProduct = async () => {
    if (!name || !price) {
      Alert.alert('Error', 'Name and price are required!');
      return;
    }

    await addProduct({
      name,
      description,
      price: parseFloat(price),
      imageURL,
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
      
      {/* {image && <Image source={{ uri: image }} style={styles.image} />}
      {uploading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Select Image" onPress={pickImage} />
      )} */}

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

      <Button title="Add Product" onPress={handleAddProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20 
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
    alignSelf: 'center',
    borderRadius: 10,
  }
});

export default AddProductScreen;
