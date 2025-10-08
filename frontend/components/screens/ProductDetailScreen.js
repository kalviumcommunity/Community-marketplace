import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProductDetailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📦 Product Details (Coming Soon)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, fontWeight: "600" },
});
