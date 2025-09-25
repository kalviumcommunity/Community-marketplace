import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const { width } = Dimensions.get('window');

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample product for empty state or testing
  const sampleProducts = [{
    id: 'sample1',
    name: 'Sample Product',
    price: '999',
    imageURL: 'https://via.placeholder.com/150',
    category: 'Sample Category',
    description: 'Sample product description'
  }];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData.length > 0 ? productsData : sampleProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts(sampleProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductPress = (productId) => {
    navigation.navigate('ProductDetail', { productId });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.productCard}
            onPress={() => handleProductPress(item.id)}
          >
            <Image 
              source={{ uri: item.imageURL }} 
              style={styles.productImage}
              resizeMode="cover"
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>₹{item.price}</Text>
              {item.category && (
                <Text style={styles.productCategory}>{item.category}</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productList: {
    padding: 10,
  },
  productCard: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxWidth: (width - 30) / 2,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  productInfo: {
    padding: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    color: '#666',
  },
});

export default ProductListScreen;