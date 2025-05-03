import React, { useState } from "react";
import "../styles/Quiz.css"

function Quiz() {
  const [answers, setAnswers] = useState({ q1: "", q2: "" });
  const [result, setResult] = useState(null);


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
