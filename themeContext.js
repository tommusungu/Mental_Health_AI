import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme(); // get system theme (light/dark)
  const [theme, setTheme] = useState('dark'); // set default to light
  useEffect(() => {
    const loadStoredTheme = async () => {
      const storedTheme = await loadTheme();
      if (storedTheme) {
        setTheme(storedTheme);
      }
    };

    loadStoredTheme();
  }, []);

  // Save the theme to AsyncStorage whenever it changes
  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme
export const useTheme = () => useContext(ThemeContext);

// Function to save the theme preference to AsyncStorage
const saveTheme = async (selectedTheme) => {
  try {
    await AsyncStorage.setItem('user-theme', selectedTheme);
  } catch (e) {
    console.error('Failed to save theme preference', e);
  }
};

// Function to load the theme preference from AsyncStorage
const loadTheme = async () => {
  try {
    const storedTheme = await AsyncStorage.getItem('user-theme');
    return storedTheme || 'light'; // default to light if no preference is saved
  } catch (e) {
    console.error('Failed to load theme preference', e);
    return 'light';
  }
};
