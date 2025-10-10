import AsyncStorage from '@react-native-async-storage/async-storage';

// Key for storing user data in AsyncStorage
const USER_KEY = '@user_data';

/**
 * Store user session data in AsyncStorage
 * @param {Object} userData - The user data to store
 */
export const storeUserSession = async (userData) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
    console.log('User session stored successfully');
  } catch (error) {
    console.error('Error storing user session:', error);
    throw error;
  }
};

/**
 * Retrieve user session data from AsyncStorage
 * @returns {Object|null} The stored user data or null if not found
 */
export const getUserSession = async () => {
  try {
    const userData = await AsyncStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error retrieving user session:', error);
    throw error;
  }
};

/**
 * Clear user session data from AsyncStorage
 */
export const clearUserSession = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
    console.log('User session cleared successfully');
  } catch (error) {
    console.error('Error clearing user session:', error);
    throw error;
  }
};