import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

const tests = [
  {
    theme: "Стародавній світ",
    questions: [
      {
        question: "Яка культура виникла близько 5500 року до н.е. на території України?",
        options: ["Скіфська", "Трипільська", "Сарматська", "Курганна"],
        correctAnswer: "Трипільська",
      },
      {
        question: "Яке місто НЕ було грецькою колонією?",
        options: ["Ольвія", "Херсонес", "Тіра", "Київ"],
        correctAnswer: "Київ",
      }
    ],
  },
  {
    theme: "Середньовіччя",
    questions: [
      {
        question: "Хто об'єднав Київ і Новгород у 882 році?",
        options: ["Ігор", "Олег", "Ярослав", "Святослав"],
        correctAnswer: "Олег",
      },
      {
        question: "У якому році відбулося Хрещення Русі?",
        options: ["988", "1054", "860", "1240"],
        correctAnswer: "988",
      }
    ],
  },
  {
    theme: "Новий час",
    questions: [
      {
        question: "Хто очолив Національно-визвольну війну 1648 року?",
        options: ["Іван Мазепа", "Богдан Хмельницький", "Петро Дорошенко", "Семен Палій"],
        correctAnswer: "Богдан Хмельницький",
      },
      {
        question: "Що сталося у 1775 році?",
        options: ["Створення УНР", "Битва під Жовтими Водами", "Знищення Запорізької Січі", "Підписання Переяславської угоди"],
        correctAnswer: "Знищення Запорізької Січі",
      }
    ]
  }
];

export const seedTests = async () => {
  try {
    for (const test of tests) {
      await addDoc(collection(db, "tests"), test);
    }
    console.log("Тести успішно додано до Firestore!");
  } catch (error) {
    console.error("Помилка при додаванні тестів:", error);
  }
};
