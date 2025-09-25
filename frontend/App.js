// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddProductScreen from "./components/screens/AddProductScreen";
import AddUserScreen from "./components/screens/AddUserScreen";
import ProductListScreen from "./components/screens/ProductListScreen";
import UserFavoritesScreen from "./components/screens/UserFavoritesScreen";
import Home from "./components/screens/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ProductList" component={ProductListScreen} />
        <Stack.Screen name="UserFavorites" component={UserFavoritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
