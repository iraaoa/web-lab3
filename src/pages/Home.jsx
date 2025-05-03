import React from "react";
import '../styles/Home.css'
function Home() {
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
                </div>
            </article>
        </main>
    );
}

export default Home;
