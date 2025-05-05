// src/auth.js

import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Функція для реєстрації користувача
const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User Registered:', user);
      return user;  // повертаємо об'єкт користувача
    })
    .catch((error) => {
      console.error('Error registering user:', error.message);
      throw error; // обробка помилки
    });
};

// Функція для входу користувача
const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User Logged In:', user);
      return user;  // повертаємо об'єкт користувача
    })
    .catch((error) => {
      console.error('Error logging in user:', error.message);
      throw error; // обробка помилки
    });
};

export { registerUser, loginUser };
