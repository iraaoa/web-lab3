// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ додай це

const firebaseConfig = {
  apiKey: "AIzaSyCqQZLNL3nT-IEaVGm85xexcTqOM39DABY",
  authDomain: "history-studying.firebaseapp.com",
  projectId: "history-studying",
  storageBucket: "history-studying.firebasestorage.app",
  messagingSenderId: "606449613392",
  appId: "1:606449613392:web:0f8d08ce1aef593ab32f55",
  measurementId: "G-TJ4H30LL3F"
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ ініціалізуй базу

// ✅ Експортуємо auth і db
export { auth, db };
