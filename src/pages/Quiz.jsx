import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Не забувай імпортувати useNavigate
import "../styles/Quiz.css";

function Quiz() {
  const [loading, setLoading] = useState(true); // Переміщуємо useState на верх
  const [answers, setAnswers] = useState({ q1: "", q2: "" });
  const [result, setResult] = useState(null);

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/web-lab3/login'); // Редирект на логін, якщо користувач не авторизований
      } else {
        setLoading(false); // Все ок, дозволяємо показ сторінки
      }
    });

    return () => unsubscribe(); // Очищення слухача
  }, [auth, navigate]);

  if (loading) {
    return <p>Перевірка доступу...</p>;
  }

  const handleChange = (e) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let score = 0;
    if (answers.q1 === "Kyiv") score++;
    if (answers.q2 === "Kravchuk") score++;
    setResult(`Твій результат: ${score} з 2`);
  };

  return (
    <section id="test">
      <h2>Тестування</h2>
      <form id="quiz-form" onSubmit={handleSubmit}>
        <div className="question">
          <h3>1. Яка столиця України?</h3>
          <label>
            <input
              type="radio"
              name="q1"
              value="Kyiv"
              checked={answers.q1 === "Kyiv"}
              onChange={handleChange}
            />
            Київ
          </label>
          <label>
            <input
              type="radio"
              name="q1"
              value="Lviv"
              checked={answers.q1 === "Lviv"}
              onChange={handleChange}
            />
            Львів
          </label>
          <label>
            <input
              type="radio"
              name="q1"
              value="Odessa"
              checked={answers.q1 === "Odessa"}
              onChange={handleChange}
            />
            Одеса
          </label>
        </div>

        <div className="question">
          <h3>2. Хто був першим президентом України?</h3>
          <label>
            <input
              type="radio"
              name="q2"
              value="Kravchuk"
              checked={answers.q2 === "Kravchuk"}
              onChange={handleChange}
            />
            Леонід Кравчук
          </label>
          <label>
            <input
              type="radio"
              name="q2"
              value="Yushchenko"
              checked={answers.q2 === "Yushchenko"}
              onChange={handleChange}
            />
            Віктор Ющенко
          </label>
          <label>
            <input
              type="radio"
              name="q2"
              value="Poroshenko"
              checked={answers.q2 === "Poroshenko"}
              onChange={handleChange}
            />
            Петро Порошенко
          </label>
        </div>

        <button type="submit" className="submit-btn">
          Перевірити відповіді
        </button>
      </form>

      {result && (
        <div id="result">
          <h3>Результати тесту:</h3>
          <p id="result-text">{result}</p>
        </div>
      )}
    </section>
  );
}

export default Quiz;
