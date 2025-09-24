// /screens/AddUserScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { addUser } from "../../addUser";
// import * as ImagePicker from 'expo-image-picker';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { ActivityIndicator } from 'react-native';

const AddUserScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImageURL, setProfileImageURL] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  // const [image, setImage] = useState(null);
  // const [uploading, setUploading] = useState(false);

  // const pickImage = async () => {
  //   try {
  //     // Request permission
  //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (status !== 'granted') {
  //       Alert.alert('Sorry, we need camera roll permissions to make this work!');
  //       return;
  //     }

  //     // Pick the image
  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //     });

  //     if (!result.canceled && result.assets[0].uri) {
  //       setImage(result.assets[0].uri);
  //       uploadImage(result.assets[0].uri);
  //     }
  //   } catch (error) {
  //     console.error('Error picking image:', error);
  //     Alert.alert('Error picking image');
  //   }
  // };

  // const uploadImage = async (uri) => {
  //   try {
  //     setUploading(true);
  //     const response = await fetch(uri);
  //     const blob = await response.blob();
      
  //     const storage = getStorage();
  //     const filename = uri.substring(uri.lastIndexOf('/') + 1);
  //     const imageRef = ref(storage, `profile-images/${filename}`);
      
  //     await uploadBytes(imageRef, blob);
  //     const downloadURL = await getDownloadURL(imageRef);
      
  //     setProfileImageURL(downloadURL);
  //     setUploading(false);
  //     Alert.alert('Success', 'Image uploaded successfully!');
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //     setUploading(false);
  //     Alert.alert('Error', 'Failed to upload image');
  //   }
  // };

  const handleAddUser = () => {
    if (!username || !email) {
      Alert.alert('Error', 'Username and email are required!');
      return;
    }
    
    addUser({
      username,
      email,
      profileImageURL,
      bio,
      location
    });
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      
      {/* {image && <Image source={{ uri: image }} style={styles.image} />}
      {uploading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Select Image" onPress={pickImage} />
      )} */}
      
      <TextInput placeholder="Bio" value={bio} onChangeText={setBio} style={styles.input} />
      <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={styles.input} />
      <Button title="Add User" onPress={handleAddUser} />
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
    borderRadius: 4 
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
    alignSelf: 'center',
    borderRadius: 10,
  }
});

export default AddUserScreen;
