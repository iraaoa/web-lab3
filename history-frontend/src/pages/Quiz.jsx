import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import "../styles/Quiz.css";
import axios from 'axios';

function Quiz() {
  const [loading, setLoading] = useState(true);
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
const [averageScore, setAverageScore] = useState(null);

  const auth = getAuth();
  const navigate = useNavigate();

  // Перевірка авторизації
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/web-lab3/login');
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  // Завантаження списку тем
  useEffect(() => {
    const fetchThemes = async () => {
      const snapshot = await getDocs(collection(db, 'tests'));
      const themesSet = new Set();
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.theme) {
          themesSet.add(data.theme);
        }
      });
      setThemes(Array.from(themesSet));
    };
    fetchThemes();
  }, []);

  // Завантаження питань по вибраній темі
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!selectedTheme) {
        setQuestions([]);
        return;
      }
      const q = query(collection(db, 'tests'), where('theme', '==', selectedTheme));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docData = snapshot.docs[0].data();
        setQuestions(docData.questions || []);
        setAnswers({});
        setResult(null);
      } else {
        setQuestions([]);
      }
    };
    fetchQuestions();
  }, [selectedTheme]);

  const handleChange = (e) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        score++;
      }
    });

    setResult(`Твій результат: ${score} з ${questions.length}`);

    // Відправка результату на сервер
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Користувач не авторизований");

     await axios.post('http://localhost:5000/api/save-result', {
  userId: user.uid,
  topic: selectedTheme,
  score: score,
  date: new Date().toISOString(),
});


      console.log("Результат успішно надіслано на сервер");

       const res = await axios.get(`http://localhost:5000/api/user-average/${user.uid}`);
  setAverageScore(res.data.average);


    } catch (error) {
      console.error("Помилка при збереженні результату:", error);
    }
  };

  if (loading) return <p>Перевірка доступу...</p>;

  return (
    <section id="test">
      <h2>Тестування</h2>

      <select
        id="theme-select"
        value={selectedTheme}
        onChange={(e) => setSelectedTheme(e.target.value)}
      >
        <option value="">-- Оберіть тему --</option>
        {themes.map((theme) => (
          <option key={theme} value={theme}>{theme}</option>
        ))}
      </select>

      {questions.length > 0 && (
        <form id="quiz-form" onSubmit={handleSubmit}>
          {questions.map((q, index) => (
            <div className="question" key={index}>
              <h3>{index + 1}. {q.question}</h3>
              {q.options.map((opt, i) => (
                <label key={i}>
                  <input
                    type="radio"
                    name={index}
                    value={opt}
                    checked={answers[index] === opt}
                    onChange={handleChange}
                    required
                  />
                  {opt}
                </label>
              ))}
            </div>
          ))}

          <button type="submit" className="submit-btn">
            Перевірити відповіді
          </button>
        </form>
      )}

      {result && (
        <div id="result">
          <h3>Результати тесту:</h3>
          <p id="result-text">{result}</p>
        </div>
      )}


      {averageScore !== null && (
  <div id="average">
    <h4>Середній бал за всі тести:</h4>
    <p>{averageScore}</p>
  </div>
)}

    </section>
  );
}

export default Quiz;
