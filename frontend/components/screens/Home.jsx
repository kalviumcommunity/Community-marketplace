import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const categories = [
  { id: 1, name: "Clothes" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Essentials" },
  { id: 4, name: "Devices" },
  { id: 5, name: "Vehicle" },
  { id: 6, name: "Kitchen" },
];

const featuredProducts = [
  {
    id: 1,
    title: "Luxury Leather Smartwatch with GPS",
    price: 299.99,
    image: "https://via.placeholder.com/150",
    category: "Electronics",
  },
  {
    id: 2,
    title: "Handcrafted Ceramic Coffee Mug Set",
    price: 45.0,
    image: "https://via.placeholder.com/150",
    category: "Kitchen",
  },
];

const products = [
  {
    id: 3,
    title: "Organic Cotton T-Shirt",
    price: 24.99,
    image: "https://via.placeholder.com/150",
    category: "Clothes",
  },
  {
    id: 4,
    title: "High-Performance Wireless Earbuds",
    price: 89.0,
    image: "https://via.placeholder.com/150",
    category: "Electronics",
  },
  {
    id: 5,
    title: "Stainless Steel Water Bottle",
    price: 19.95,
    image: "https://via.placeholder.com/150",
    category: "Essentials",
  },
  {
    id: 6,
    title: "Compact Travel Backpack",
    price: 59.99,
    image: "https://via.placeholder.com/150",
    category: "Essentials",
  },
  {
    id: 7,
    title: "Smart Home LED Light Bulb",
    price: 14.5,
    image: "https://via.placeholder.com/150",
    category: "Devices",
  },
  {
    id: 8,
    title: "Classic Denim Jacket",
    price: 75.0,
    image: "https://via.placeholder.com/150",
    category: "Clothes",
  },
];

export default function Home({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // filter products by selected category
  const filteredProducts =
    selectedCategory && selectedCategory !== "All"
      ? products.filter((p) => p.category === selectedCategory)
      : products;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>VividMarket</Text>
        <Ionicons name="menu" size={24} color="black" />

        {/* Button to go to AddProduct */}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("AddProduct")}
        >
          <Text style={styles.btnText}>Add Product</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput placeholder="Search products..." style={styles.searchInput} />
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Quick Category Access</Text>
      <View style={styles.categories}>
        <TouchableOpacity
          style={[
            styles.categoryBtn,
            selectedCategory === null && styles.activeCategory,
          ]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text>All</Text>
        </TouchableOpacity>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryBtn,
              selectedCategory === cat.name && styles.activeCategory,
            ]}
            onPress={() => setSelectedCategory(cat.name)}
          >
            <Text>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Offers (Banners) */}
      <Text style={styles.sectionTitle}>Current Offers & Deals</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        <View style={[styles.banner, { backgroundColor: "#f6c90e" }]}>
          <Text style={styles.bannerText}>30% OFF Electronics</Text>
        </View>
        <View style={[styles.banner, { backgroundColor: "#9fd3c7" }]}>
          <Text style={styles.bannerText}>Spring Fashion Deals</Text>
        </View>
        <View style={[styles.banner, { backgroundColor: "#ff6b6b" }]}>
          <Text style={styles.bannerText}>Mega Sale: Up to 50% OFF!</Text>
        </View>
      </ScrollView>



      {/* Products for You */}
      <Text style={styles.sectionTitle}>Products for You</Text>
      <View style={styles.grid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.price}>${item.price}</Text>
              <Text style={styles.productTitle}>{item.title}</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Add to cart</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={{ margin: 10, color: "gray" }}>
            No products in this category.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 20, fontWeight: "bold" },
  btn: {
    backgroundColor: "#8a2be2",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 8,
    borderRadius: 10,
    marginVertical: 10,
  },
  searchInput: { marginLeft: 8, flex: 1 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginVertical: 10 },
  categories: { flexDirection: "row", flexWrap: "wrap" },
  categoryBtn: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 8,
    margin: 5,
  },
  activeCategory: {
    backgroundColor: "#8a2be2",
  },
  banner: {
    width: width - 30,
    height: 150,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  bannerText: { fontSize: 20, fontWeight: "bold", color: "#000" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    elevation: 2,
  },
  image: { width: "100%", height: 100, borderRadius: 8 },
  price: { fontWeight: "bold", marginTop: 5 },
  productTitle: { fontSize: 12, marginVertical: 5 },
  button: {
    backgroundColor: "#8a2be2",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
