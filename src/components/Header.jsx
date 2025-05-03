import React from 'react';
import { Link } from 'react-router-dom'; // Імпортуємо Link з react-router-dom
import '../styles/Header.css';

function Header() {
  return (
    <header>
      <div className="logoo">
        <Link to="/">
          <img src={`/web-lab3/images/loggo.png`} alt="Логотип" className="logo-img" />
        </Link>
        <div className="site-name">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1>History studying</h1>
          </Link>
        </div>
      </div>

      <nav>
        <ul>
          <li className="menu-item">
            <img src={`/web-lab3/images/hron.png`} alt="Іконка хронології" className="ikon" />
            <Link to="/chronology">Хронологія</Link>
          </li>
          <li className="menu-item">
            <img src={`${process.env.PUBLIC_URL}/images/pod.png`} alt="Іконка подій" className="ikon" />
            <Link to="/events">Події</Link>
          </li>
          <li className="menu-item">
            <img src={`${process.env.PUBLIC_URL}/images/test.png`} alt="Іконка тестування" className="ikon" />
            <Link to="/quiz">Тестування</Link>
          </li>
          <li className="menu-item">
            <img src={`${process.env.PUBLIC_URL}/images/home.png`} alt="Іконка головної" className="ikon" />
            <Link to="/">Головна</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
