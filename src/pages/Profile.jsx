import React, { useEffect, useState } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore'; // ⚠️ для доступу до Firestore
import { db } from '../firebase'; // ⚠️ обов'язково імпортуй db з firebase.js
import '../styles/Profile.css';

function Profile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid); // 🔍 беремо документ з Firestore по UID
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data()); // зберігаємо дані користувача
          } else {
            console.log('Документ користувача не знайдено.');
          }
        } catch (error) {
          console.error('Помилка при завантаженні даних користувача:', error);
        }
      } else {
        navigate('/web-lab3/login'); // редирект, якщо не авторизований
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/web-lab3');
      })
      .catch((error) => {
        console.error('Помилка виходу:', error.message);
      });
  };

  return (
    <div className="profile-container">
      <h2>Особистий кабінет</h2>

      {userData ? (
        <>
          <p><strong>Ім’я:</strong> {userData.name}</p>
          <p><strong>Прізвище:</strong> {userData.surname}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Вік:</strong> {userData.age}</p>
        </>
      ) : (
        <p>Завантаження даних...</p>
      )}

      <button onClick={handleLogout} className="logout-button">Вийти</button>
    </div>
  );
}

export default Profile;
