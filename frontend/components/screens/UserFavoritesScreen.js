// /screens/UserFavoritesScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getUserFavorites } from "../getUserFavorites";

const UserFavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const userID = "userDocID123"; // Replace with dynamic value

  useEffect(() => {
    getUserFavorites(userID).then((ids) => setFavorites(ids));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Favorite Product ID: {item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  item: { padding: 10, borderBottomWidth: 1 }
});

export default UserFavoritesScreen;
