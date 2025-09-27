// components/screens/ProductListScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, "products"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const productList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading products...</Text>
      </View>
    );

  if (products.length === 0)
    return (
      <View style={styles.center}>
        <Text>No products found.</Text>
      </View>
    );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("ProductDetail", { product: item })
          }
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>₹{item.price}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.addToCartButton}>
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buyNowButton}>
              <Text style={styles.buyNowText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={{ padding: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    elevation: 2,
  },
  image: { width: 100, height: 100, borderRadius: 8 },
  buttonsContainer: { paddingHorizontal: 10, gap: 22, marginBottom: 5 },
  addToCartButton: { backgroundColor: '#8A2BE2', paddingVertical: 10, paddingHorizontal: 10, borderRadius: 25, alignItems: 'center' },
  addToCartText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  buyNowButton: { backgroundColor: '#8A2BE2', paddingVertical: 10, paddingHorizontal: 10, borderRadius: 25, alignItems: 'center' },
  buyNowText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  info: { flex: 1, marginLeft: 10, justifyContent: "center" },
  name: { fontSize: 16, fontWeight: "bold" },
  description: { fontSize: 14, color: "#555", marginVertical: 4 },
  price: { fontSize: 16, color: "green", fontWeight: "bold" },
});
