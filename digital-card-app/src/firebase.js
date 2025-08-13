// firebase.js
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAH5YykomV6tf6oKvrs3Ga0eDwLFu6uTuY",
  authDomain: "business-card-9affa.firebaseapp.com",
  projectId: "business-card-9affa",
  storageBucket: "business-card-9affa.firebasestorage.app",
  messagingSenderId: "20438225600",
  appId: "1:20438225600:web:b109e78dba9aa2d2201325",
  measurementId: "G-49LQRW9XHW"
};

// Initialize Firebase
let app, db, analytics;
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  analytics = getAnalytics(app);
  console.log("✅ Firebase connected");
} catch (error) {
  console.error("❌ Firebase initialization failed:", error);
}

// =======================
// CRUD FUNCTIONS
// =======================

// Read card data
export const getCardData = async (cardId = 'user-card') => {
  try {
    const cardRef = doc(db, 'cards', cardId);
    const snap = await getDoc(cardRef);
    return snap.exists() ? snap.data() : null;
  } catch (error) {
    console.error("❌ Error fetching card data:", error);
    return null;
  }
};

// Create/overwrite card data
export const saveCardData = async (cardData, cardId = 'user-card') => {
  try {
    const cardRef = doc(db, 'cards', cardId);
    const dataToSave = {
      ...cardData,
      lastUpdated: new Date().toISOString(),
      createdAt: cardData.createdAt || new Date().toISOString()
    };
    await setDoc(cardRef, dataToSave);
    return true;
  } catch (error) {
    console.error("❌ Error saving card data:", error);
    return false;
  }
};

// Update card data
export const updateCardData = async (updates, cardId = 'user-card') => {
  try {
    const cardRef = doc(db, 'cards', cardId);
    await updateDoc(cardRef, {
      ...updates,
      lastUpdated: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error("❌ Error updating card data:", error);
    return false;
  }
};

// Delete card data
export const deleteCardData = async (cardId = 'user-card') => {
  try {
    const cardRef = doc(db, 'cards', cardId);
    await deleteDoc(cardRef);
    return true;
  } catch (error) {
    console.error("❌ Error deleting card data:", error);
    return false;
  }
};

// Test Firebase connection
export const testFirebaseConnection = async () => {
  try {
    const testRef = doc(db, 'test', 'connection-test');
    await setDoc(testRef, {
      timestamp: new Date().toISOString(),
      message: 'Connection test successful'
    });
    await deleteDoc(testRef);
    console.log("✅ Firebase connection working");
    return true;
  } catch (error) {
    console.error("❌ Firebase connection test failed:", error);
    return false;
  }
};

export { db, analytics };
