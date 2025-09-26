// /screens/AddUserScreen.js
import React, { useState } from "react";
import { 
  View, 
  TextInput, 
  Button, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator 
} from "react-native";
import { addUser } from "../../addUser";
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../../context/AuthContext';

const AddUserScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();

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

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required!');
      return;
    }

    setLoading(true);
    try {
      let userCredential;
      
      if (isLogin) {
        // Handle Login
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Handle Registration
        if (!username) {
          Alert.alert('Error', 'Username is required for registration!');
          return;
        }
        
        // First create the user in Firebase Auth
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Then create the user document in Firestore
        const userDocId = await addUser({
          username,
          email,
          bio: bio || null,  // Send null if empty
          location: location || null,  // Send null if empty
          uid: userCredential.user.uid,
          // Don't include profileImageURL if we're not using it
        });
      }

      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: username || userCredential.user.displayName,
      };
      
      setUser(userData);
      // Navigation will happen automatically when auth state changes
      
    } catch (error) {
      console.error('Authentication error:', error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Welcome Back!' : 'Create Account'}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {!isLogin && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Bio"
            value={bio}
            onChangeText={setBio}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />
        </>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#0066cc" style={styles.loading} />
      ) : (
        <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
          <Text style={styles.authButtonText}>
            {isLogin ? 'Login' : 'Register'}
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => setIsLogin(!isLogin)}
      >
        <Text style={styles.switchButtonText}>
          {isLogin 
            ? "Don't have an account? Register here" 
            : "Already have an account? Login here"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  authButton: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  authButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchButton: {
    marginTop: 20,
  },
  switchButtonText: {
    color: '#0066cc',
    textAlign: 'center',
  },
  loading: {
    marginTop: 20,
  }
});

export default AddUserScreen;
