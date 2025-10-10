// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddProductScreen from "./components/screens/AddProductScreen";
import AddUserScreen from "./components/screens/AddUserScreen";
import ProductListScreen from "./components/screens/ProductListScreen";
import UserFavoritesScreen from "./components/screens/UserFavoritesScreen";
import ProductDetailScreen from "./components/screens/ProductDetailScreen";
import ProfileScreen from "./components/screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
        <Stack.Screen name="AddUser" component={AddUserScreen} />
        <Stack.Screen name="ProductList" component={ProductListScreen} />
        <Stack.Screen name="UserFavorites" component={UserFavoritesScreen} />
        <Stack.Screen 
          name="ProductDetail" 
          component={ProductDetailScreen}
          options={({ route }) => ({
            title: route.params?.product?.name || 'Product Details'
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
