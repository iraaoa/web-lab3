import React from 'react';
import { Link } from 'react-router-dom'; // Імпортуємо Link з react-router-dom
import '../styles/Header.css';

function Header() {
  return (
    <header>
      <div className="logoo">
        <Link to="/web-lab3/">
          <img src={`/web-lab3/images/loggo.png`} alt="Логотип" className="logo-img" />
        </Link>
        <div className="site-name">
          <Link to="/web-lab3/" style={{ textDecoration: 'none' }}>
            <h1>History studying</h1>
          </Link>
        </div>
      </div>

      <nav>
        <ul>
          <li className="menu-item">
            <img src={`/web-lab3/images/hron.png`} alt="Іконка хронології" className="ikon" />
            <Link to="/web-lab3/chronology">Хронологія</Link>
          </li>
          <li className="menu-item">
            <img src={`/web-lab3/images/pod.png`} alt="Іконка подій" className="ikon" />
            <Link to="/web-lab3/events">Події</Link>
          </li>
          <li className="menu-item">
            <img src={`/web-lab3/images/test.png`} alt="Іконка тестування" className="ikon" />
            <Link to="/web-lab3/quiz">Тестування</Link>
          </li>
          <li className="menu-item">
            <img src={`/web-lab3/images/account.png`} alt="Іконка головної" className="ikon" />
            <Link to="/web-lab3/profile">Кабінет</Link>
          </li>
          <li className="menu-item">
            <img src={`/web-lab3/images/home.png`} alt="Іконка кабінету" className="ikon" />
            <Link to="/web-lab3/">Головна</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
