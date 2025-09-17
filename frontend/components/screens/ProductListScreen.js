// /screens/ProductListScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getProductsBySeller } from "../../getProductsBySeller";

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const sellerID = "user123"; // Replace this with dynamic value

  useEffect(() => {
    getProductsBySeller(sellerID).then((list) => setProducts(list));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  item: { padding: 10, borderBottomWidth: 1 },
  name: { fontWeight: "bold" }
});

export default ProductListScreen;
