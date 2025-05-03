import React, { useState } from "react";
import "../styles/Events.css"
import { events } from "../components/EventsData";


function Events() {
    const [currentEventIndex, setCurrentEventIndex] = useState(4);
    const [showLoadMore, setShowLoadMore] = useState(true);

    const eventsPerPage = 4;



    const loadMoreEvents = () => {
        const nextIndex = currentEventIndex + eventsPerPage;
        if (nextIndex >= events.length) {
            setShowLoadMore(false);
        }
        setCurrentEventIndex(nextIndex);
    };



    const resetEvents = () => {
        setCurrentEventIndex(4);
        setShowLoadMore(true);
    };


    
    const currentEvents = events.slice(0, currentEventIndex);

    return (
        <section className="events" id="events">
            <h2 className="sect-name">Історичні події України</h2>
            <div className="event-container" id="events-container">
                {currentEvents.map((event, index) => (
                    <div className="event-card" key={index}>
                        <div className="image-container">
                            <img src={event.image} alt={event.description} />
                        </div>
                        <h3>{event.description}</h3>
                        <hr className="event-line" />
                        <p className="event-description">{event.details}</p>
                    </div>
                ))}
            </div>
            {showLoadMore ? (
    <div className="load-more-button">
        <button id="load-more-button" onClick={loadMoreEvents}>Ще</button>
        {currentEventIndex > 4  && 
        (          
            <button id="load-more-button" onClick={resetEvents}>Сховати</button>
        )}


    </div>
) : (
    <div className="load-more-button">
        <button id="load-more-button" onClick={resetEvents}>Сховати</button>
    </div>
)}

        </section>
    );
}

export default Events;
