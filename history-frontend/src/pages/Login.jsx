import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../auth';
import '../styles/Auth.css'; // той самий CSS файл

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = () => {
    loginUser(email, password)
      .then(user => {
        console.log('User successfully logged in:', user);
        navigate('/web-lab3');
      })
      .catch(error => {
        setError('Неправильний email або пароль.');
        console.error('Login error:', error.message);
      });
  };

  return (
    <div className="auth-container">
      <h2>Вхід</h2>

      {error && <p className="auth-error">{error}</p>}

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
      <button onClick={handleLogin} className="auth-button">Увійти</button>

      <p className="auth-text">
        Не маєш акаунту? <Link to="/web-lab3/register" className="auth-link">Зареєструватися</Link>
      </p>
    </div>
  );
}

export default Login;
