import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config bağlantıları 
const firebaseConfig = {
  apiKey: "AIzaSyCjEgFHCsRq_qt2zf9yZtc3GEDJZwjOaqM",
  authDomain: "reactproject-ef7ba.firebaseapp.com",
  projectId: "reactproject-ef7ba",
  storageBucket: "reactproject-ef7ba.appspot.com",
  messagingSenderId: "685508682839",
  appId: "1:685508682839:web:d5fc03219db82b8766af12",
  measurementId: "G-TDXG92F72T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
