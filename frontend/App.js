// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from './context/AuthContext';
import AddProductScreen from "./AddProductScreen";
import AddUserScreen from "./components/screens/AddUserScreen";
import ProductListScreen from "./components/screens/ProductListScreen";
import UserFavoritesScreen from "./components/screens/UserFavoritesScreen";
import ProductDetailScreen from "./components/screens/ProductDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AddUser">
          <Stack.Screen 
            name="AddUser" 
            component={AddUserScreen}
            options={{ 
              headerShown: false
            }}
          />
          <Stack.Screen name="AddProduct" component={AddProductScreen} />
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
    </AuthProvider>
  );
}
