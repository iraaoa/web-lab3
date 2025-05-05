import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"; // Імпортуємо Link
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Додаємо імпорти

import '../styles/Home.css';

function Home() {


    const [isLoggedIn, setIsLoggedIn] = useState(false);  // Стан для перевірки авторизації
  const auth = getAuth();  // Ініціалізація auth з Firebase

  useEffect(() => {
    // Перевірка, чи є авторизований користувач
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);  // Якщо користувач є, то він авторизований
      } else {
        setIsLoggedIn(false);  // Якщо немає, то користувач не авторизований
      }
    });
  }, [auth]);


    return (
        <main>
            <article className="article">
                <div className="cont">
                    <div className="photo-container">
                        <img src={`/web-lab3/images/history.jpg`} alt="Логотип" />
                    </div>

                    <div>
                        <h2 className="h22">Чому потрібно вивчати історію?</h2>
                        <p>Історія допомагає нам зрозуміти наше минуле, відкрити важливі уроки, які можуть вплинути на наше
                            майбутнє. Знання історії дозволяє не тільки вчити правильні уроки, але й уникати повторення
                            помилок,
                            що
                            були зроблені в минулому.</p>
                        <p>Крім того, історія формує наше розуміння культури, політики та соціальних структур, даючи глибоке
                            розуміння світу навколо нас.</p>
                        <p>Вивчення історії важливе для розвитку критичного мислення, оскільки дозволяє аналізувати різні
                            точки
                            зору
                            і порівнювати події з різних періодів.</p>
                        <p>Читати більше на сайті: <a href="https://abal.com.ua/navishcho-vchyty-istoriiu.html"
                                className="hist-link" target="_blank" rel="noopener noreferrer">Історія</a></p>
                    </div>

                    {/* Якщо користувач не авторизований, показуємо кнопку для реєстрації */}
          {!isLoggedIn && (
            <Link to="/web-lab3/register">
              <button className="register-button">Хочу вчити історію</button>
            </Link>
          )}

          {/* Якщо користувач авторизований, переходимо на іншу сторінку */}
          {isLoggedIn && (
            <p>Вітаємо! Ви вже авторизовані.</p>
          )}

                </div>
            </article>
        </main>
    );
}

export default Home;
