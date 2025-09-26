import React, { createContext, useState, useContext, useEffect } from 'react';
import { storeUserSession, getUserSession, clearUserSession } from '../utils/session';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

// Create the context
const AuthContext = createContext({
  user: null,
  loading: true,
  setUser: () => {},
  logout: () => {},
});

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize the auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Create a user object with needed data
          const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          };
          
          // Store user data in AsyncStorage and state
          await storeUserSession(userData);
          setUser(userData);
        } else {
          // Clear the session if no user
          await clearUserSession();
          setUser(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
      } finally {
        setLoading(false);
      }
    });

    // Check for existing session on mount
    const checkExistingSession = async () => {
      try {
        const savedUser = await getUserSession();
        if (savedUser) {
          setUser(savedUser);
        }
      } catch (error) {
        console.error('Error checking existing session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkExistingSession();

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await auth.signOut();
      await clearUserSession();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};