// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, useAuth } from './context/AuthContext';
import AddProductScreen from "./AddProductScreen";
import AddUserScreen from "./components/screens/AddUserScreen";
import ProductListScreen from "./components/screens/ProductListScreen";
import UserFavoritesScreen from "./components/screens/UserFavoritesScreen";
import ProductDetailScreen from "./components/screens/ProductDetailScreen";
import SplashScreen from "./components/screens/SplashScreen";

const Stack = createNativeStackNavigator();

// Auth Navigator for non-authenticated users
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AddUser" component={AddUserScreen} />
  </Stack.Navigator>
);

// App Navigator for authenticated users
const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ProductList" component={ProductListScreen} />
    <Stack.Screen name="AddProduct" component={AddProductScreen} />
    <Stack.Screen name="UserFavorites" component={UserFavoritesScreen} />
    <Stack.Screen 
      name="ProductDetail" 
      component={ProductDetailScreen}
      options={({ route }) => ({
        title: route.params?.product?.name || 'Product Details'
      })}
    />
  </Stack.Navigator>
);

// Root Navigator that handles auth state
const RootNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

