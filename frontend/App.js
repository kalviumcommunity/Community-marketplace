// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddProductScreen from "./AddProductScreen";
import AddUserScreen from "./components/screens/AddUserScreen";
import ProductListScreen from "./components/screens/ProductListScreen";
import UserFavoritesScreen from "./components/screens/UserFavoritesScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddProduct">
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
        <Stack.Screen name="AddUser" component={AddUserScreen} />
        <Stack.Screen name="ProductList" component={ProductListScreen} />
        <Stack.Screen name="UserFavorites" component={UserFavoritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
