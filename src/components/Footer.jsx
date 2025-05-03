import React from "react";
import '../styles/Footer.css';

function Footer() {
  return (
    <footer>
      <div className="footer-cont">
        <div className="left-c">
          <div className="f-logo">
            <img src={`/web-lab3/images/f-img.png`} alt="Логотип" className="f-img" />
            <h2>History studying</h2>
          </div>
          <div>
            <h2>Куди приведе тебе історія?</h2>
            <p>
              Ми віримо, що знання історії допомагає зрозуміти сучасний світ і впевнено
              будувати майбутнє — і ми хочемо, щоб більше людей відчули цю силу! Щороку наш ресурс
              допомагає тисячам користувачів досліджувати захопливі події минулого, відкривати нові факти
              та глибше розуміти історичний контекст подій, що формують наше життя сьогодні.
            </p>
          </div>

          <div className="footer-links">
            <a href="#!">Про нас</a>
            <a href="#!">Реклама програм</a>
            <a href="#!">Зв'язок</a>
            <a href="#!">Політика конфіденційності</a>
            <a href="#!">Умови використання</a>
          </div>
        </div>

        <div className="right-c">
          <a href="https://www.tiktok.com/@lovemymasya2.0?_t=ZM-8uZtG4Jy0e5&_r=1" target="_blank" rel="noopener noreferrer">
            <img src={`/web-lab3/images/tt.png`} alt="TikTok" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={`/web-lab3/images/ds.png`} alt="Discord" />
          </a>
          <a href="https://www.instagram.com/irysabat?igsh=MTR2M3B2OTR4ZXlw" target="_blank" rel="noopener noreferrer">
            <img src={`/web-lab3/images/inst.png`} alt="Instagram" />
          </a>
          <a href="https://www.youtube.com/watch?v=Z-xPjVP7Gz4" target="_blank" rel="noopener noreferrer">
            <img src={`/web-lab3/images/yt.png`} alt="YouTube" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
