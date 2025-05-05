// src/firestore.js

import { db } from './firebase'; // імпортуємо db з firebase.js
import { doc, setDoc } from 'firebase/firestore'; // потрібні функції Firestore

/**
 * Додає користувача в базу даних Firestore.
 * @param {string} uid - Унікальний ID користувача (від Firebase Auth)
 * @param {object} userData - Об'єкт з даними (наприклад: name, email, age)
 */
export const addUserToFirestore = async (uid, userData) => {
  try {
    await setDoc(doc(db, 'users', uid), userData);
    console.log('Користувача додано до Firestore');
  } catch (error) {
    console.error('Помилка додавання користувача в Firestore:', error);
  }
};
