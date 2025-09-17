// /screens/AddUserScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { addUser } from "../../addUser";

const AddUserScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImageURL, setProfileImageURL] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");

  const handleAddUser = () => {
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
      <TextInput placeholder="Profile Image URL" value={profileImageURL} onChangeText={setProfileImageURL} style={styles.input} />
      <TextInput placeholder="Bio" value={bio} onChangeText={setBio} style={styles.input} />
      <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={styles.input} />
      <Button title="Add User" onPress={handleAddUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { marginBottom: 10, borderWidth: 1, padding: 8, borderRadius: 4 }
});

export default AddUserScreen;
