import React from 'react';
import { Link } from 'react-router-dom'; // Імпортуємо Link з react-router-dom
import '../styles/Header.css'

function Header() {
  return (
    <header>
      <div className="logoo">
       <Link to="/"> <img src="/images/loggo.png" alt="Логотип" className="logo-img" /> </Link>
        <div className="site-name">
        <Link to="/" style={{ textDecoration: 'none' }}>
            <h1>History studying</h1>
          </Link>        
          </div>
      </div>

      <nav>
        <ul>
          <li className="menu-item">
            <img src="/images/hron.png" alt="Логотип" className="ikon" />
            <Link to="/chronology">Хронологія</Link> 
          </li>
          <li className="menu-item">
            <img src="/images/pod.png" alt="Логотип" className="ikon" />
            <Link to="/events">Події</Link>
          </li>
          <li className="menu-item">
            <img src="/images/test.png" alt="Логотип" className="ikon" />
            <Link to="/quiz">Тестування</Link>
          </li>
          <li className="menu-item">
            <img src="/images/home.png" alt="Логотип" className="ikon" />
            <Link to="/">Головна</Link> 
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
