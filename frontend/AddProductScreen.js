// AddProductScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, ScrollView, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// FIREBASE (make sure firebaseConfig.js exists and exports `storage` and `db`)
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebaseConfig';

export default function AddProductScreen({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sku, setSku] = useState('');

  // image URI from image picker
  const [image, setImage] = useState(null);

  // upload state
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // ask for media library permissions on mount
    (async () => {
      try {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission needed', 'Permission to access media library is required to pick product images.');
        }
      } catch (err) {
        console.warn('Permission error', err);
      }
    })();
  }, []);

  // pick an image from the device gallery
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });

      // expo-image-picker v49+ returns result.assets; older versions use result.uri
      if (!result.canceled) {
        const uri = result.assets ? result.assets[0].uri : result.uri;
        setImage(uri);
      }
    } catch (err) {
      console.error('ImagePicker error', err);
      Alert.alert('Error', 'Could not open image picker');
    }
  };

  // uploads a single image uri to Firebase Storage and returns the download URL
  const uploadImageAsync = async (uri) => {
    // convert local URI -> blob
    const response = await fetch(uri);
    const blob = await response.blob();

    // unique file name (simple)
    const filename = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.jpg`;
    const storageRef = ref(storage, `products/${filename}`);

    const uploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // progress
          if (snapshot.totalBytes) {
            const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(Math.round(pct));
          }
        },
        (error) => {
          reject(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        }
      );
    });
  };

  const handleSubmit = async () => {
    // simple validation
    if (!name.trim() || !price.trim()) {
      return Alert.alert('Validation', 'Please enter product name and price.');
    }

    setUploading(true);
    setProgress(0);

    try {
      let imageUrl = null;

      if (image) {
        imageUrl = await uploadImageAsync(image);
      }

      const product = {
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price),
        category: category.trim(),
        quantity: parseInt(quantity) || 0,
        sku: sku.trim(),
        image: imageUrl,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'products'), product);
      Alert.alert('Success', 'Product added successfully');

      // reset form
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setQuantity('');
      setSku('');
      setImage(null);
      setProgress(0);
    } catch (err) {
      console.error('Add product error', err);
      Alert.alert('Error', err.message || 'Could not add product');
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.heading}>Add Product</Text>

      <TextInput style={styles.input} placeholder="Product name" value={name} onChangeText={setName} />

      <TextInput style={[styles.input, styles.multiline]} placeholder="Description" value={description} onChangeText={setDescription} multiline />

      <TextInput style={styles.input} placeholder="Price (e.g. 199.99)" keyboardType="decimal-pad" value={price} onChangeText={setPrice} />

      <TextInput style={styles.input} placeholder="Category" value={category} onChangeText={setCategory} />

      <TextInput style={styles.input} placeholder="Quantity" keyboardType="number-pad" value={quantity} onChangeText={setQuantity} />

      <TextInput style={styles.input} placeholder="SKU" value={sku} onChangeText={setSku} />

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.imagePickerText}>Pick product image</Text>
        )}
      </TouchableOpacity>

      {uploading ? (
        <View style={styles.uploadContainer}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 8 }}>{`Uploading: ${progress}%`}</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  multiline: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  imagePicker: {
    height: 180,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePickerText: {
    color: '#555',
  },
  button: {
    backgroundColor: '#0a84ff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  uploadContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
});
