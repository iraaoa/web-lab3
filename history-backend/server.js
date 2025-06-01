const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();


const corsOptions = {
  origin: 'http://localhost:3000',  // Твій фронтенд
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(express.json());

app.post('/api/save-result', async (req, res) => {
  const { userId, topic, score, date } = req.body;

  if (!userId || !topic || score == null || !date) {
    return res.status(400).json({ error: 'Неповні дані' });
  }

  try {
    await db.collection('results').add({
      userId,
      topic,
      score,
      date: new Date(date),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.json({ success: true });
  } catch (error) {
    console.error('Помилка збереження результату:', error);
    res.status(500).json({ error: 'Помилка на сервері' });
  }
});



app.get('/api/user-average/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const snapshot = await db.collection('results').where('userId', '==', userId).get();
    
    if (snapshot.empty) {
      return res.json({ average: 0 });
    }

    let total = 0;
    let count = 0;

    snapshot.forEach(doc => {
      const data = doc.data();
      if (typeof data.score === 'number') {
        total += data.score;
        count++;
      }
    });

    const average = count > 0 ? total / count : 0;
    res.json({ average: average.toFixed(2) });
  } catch (error) {
    console.error('Помилка обчислення середнього балу:', error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});


app.listen(5000, () => {
  console.log('Сервер запущено на порту 5000');
});
