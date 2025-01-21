import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC_xqSw9uiGDb6usPZNvHBAUga-_DPqeBQ',
  authDomain: 'project-pal-acb37.firebaseapp.com',
  projectId: 'project-pal-acb37',
  storageBucket: 'project-pal-acb37.firebasestorage.app',
  messagingSenderId: '501172424631',
  appId: '1:501172424631:web:46e69115616add29ec2232',
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
export const db = getFirestore(app);
