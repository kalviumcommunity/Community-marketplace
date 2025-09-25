import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const ProductDetailScreen = ({ route, navigation }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Get productId from navigation params
        const { productId } = route.params;
        
        if (!productId) {
          throw new Error('Product ID is missing');
        }

        // Get reference to the product document
        const productRef = doc(db, 'products', productId);
        
        // Fetch the product data
        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
          throw new Error('Product not found');
        }

        // Set the product data
        setProduct({
          id: productSnap.id,
          ...productSnap.data()
        });
        
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
        Alert.alert('Error', 'Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [route.params]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: product.imageURL }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>₹{product.price}</Text>
        <Text style={styles.category}>Category: {product.category}</Text>
        <Text style={styles.description}>{product.description}</Text>
        
        <View style={styles.sellerInfo}>
          <Text style={styles.sellerTitle}>Seller Information</Text>
          <Text style={styles.sellerId}>Seller ID: {product.sellerID}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#2E8B57',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 15,
  },
  sellerInfo: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  sellerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sellerId: {
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  }
});

export default ProductDetailScreen;