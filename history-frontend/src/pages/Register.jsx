import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import '../styles/Auth.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // ⚠️ нове
  const navigate = useNavigate();

  const handleRegister = async () => {
    setErrorMessage(''); // очищення попередньої помилки

    if (!name || !surname || !email || !password || !age) {
      setErrorMessage('Будь ласка, заповніть всі поля!');
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Будь ласка, введіть правильну електронну адресу!');
      return;
    }

    const parsedAge = parseInt(age);
    if (isNaN(parsedAge) || parsedAge <= 0) {
      setErrorMessage('Введіть правильний вік!');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        surname: surname,
        email: email,
        age: parsedAge,
        createdAt: serverTimestamp(),
      });

      navigate('/web-lab3');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('Цей email вже використовується. Спробуйте увійти.');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMessage('Некоректний email.');
      } else if (error.code === 'auth/weak-password') {
        setErrorMessage('Пароль має бути щонайменше 6 символів.');
      } else {
        setErrorMessage('Помилка реєстрації: ' + error.message);
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Реєстрація</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ім'я"
        className="auth-input"
      />
      <input
        type="text"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        placeholder="Прізвище"
        className="auth-input"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="auth-input"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
        className="auth-input"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Вік"
        className="auth-input"
      />

      {/* ⚠️ Повідомлення про помилку */}
      {errorMessage && (
        <div className="auth-error">
          {errorMessage}
        </div>
      )}

      <button onClick={handleRegister} className="auth-button">Зареєструватися</button>

      <p className="auth-text">
        Вже маєш акаунт? <Link to="/web-lab3/login" className="auth-link">Увійти</Link>
      </p>
    </div>
  );
}

export default Register;
