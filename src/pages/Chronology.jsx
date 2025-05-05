import "../styles/Chronology.css";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function Chronology() {
  const [showTimeline, setShowTimeline] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalEvent, setModalEvent] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("Усі");
  const [events, setEvents] = useState([]);

  const eventsPerPage = 5;

  // ✅ Завантаження подій з Firestore + сортування по року
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, "events"), orderBy("year", "asc")); // Сортування по зростанню
        const querySnapshot = await getDocs(q);
        const eventsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsArray);
      } catch (error) {
        console.error("Помилка при завантаженні подій:", error);
      }
    };

    fetchEvents();
  }, []);

  const toggleTimeline = () => {
    setShowTimeline((prev) => !prev);
    setCurrentIndex(0);
  };

  const nextPage = () => {
    if (currentIndex + eventsPerPage < filteredEvents.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const openModal = (event) => {
    setModalEvent(event);
  };

  const closeModal = () => {
    setModalEvent(null);
  };

  const filteredEvents =
    selectedPeriod === "Усі"
      ? events
      : events.filter((event) => event.period === selectedPeriod);

  const currentEvents = filteredEvents.slice(
    currentIndex,
    currentIndex + eventsPerPage
  );

  return (
    <section id="timeline">
       <div className="text">
         <h2 class="sect-name">Хронологія</h2>
                <p>Хронологія — це своєрідна "карта часу", яка допомагає нам розібратися в тому, як події розвивалися в
                    минулому, і як вони взаємопов'язані між собою. Вона показує, як історія, культура, наука та інші
                    важливі
                    моменти змінювали світ, перетинаючись у часі.
                </p>

                <p>Кожна подія — це не просто дата в книзі чи на карті. Це важлива частина великої картини, що
                    відображає,
                    як один момент у часі може вплинути на інші. Хронологія допомагає нам бачити ці зв'язки, відновлюючи
                    події в їх реальному порядку. Від падіння імперій до важливих відкриттів і революцій — ми слідкуємо
                    за
                    тим, як одна подія породжує іншу, створюючи хвилю змін.


                </p>
      </div>

      <div className="buttoon">
        <button id="toggle-timeline" onClick={toggleTimeline}>
          {showTimeline ? "Сховати Хронологію" : "Показати Хронологію"}
        </button>
      </div>

      {showTimeline && (
        <>
          <div className="filter-buttons">
            {["Усі", "Стародавній світ", "Середньовіччя", "Новий час", "Новітній час"].map((period) => (
              <button
                key={period}
                onClick={() => {
                  setSelectedPeriod(period);
                  setCurrentIndex(0);
                }}
                className={selectedPeriod === period ? "active" : ""}
              >
                {period}
              </button>
            ))}
          </div>

          <div id="hron-container">
            <div className="hronologia">
              {currentEvents.map((event, index) => (
                <div className="event" key={event.id || index}>
                  <span className="year">{event.year}</span>
                  <p>{event.description}</p>
                  <span className="more-info" onClick={() => openModal(event)}>
                    Дізнатися більше
                  </span>
                </div>
              ))}
            </div>

            <div className="timeline-navigation">
              <button id="prev" onClick={prevPage}>←</button>
              <button id="next" onClick={nextPage}>→</button>
            </div>
          </div>
        </>
      )}

      {modalEvent && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{modalEvent.description}</h2>
            <p>{modalEvent.details}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Chronology;
