import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../client/firebase";

const CalendarPage = () => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const snapshot = await getDocs(collection(db, "events"));
            const eventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setEvents(eventsData);
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        const selectedDateStr = date.toISOString().split('T')[0];
        const filtered = events.filter(event => {
            if (!event.time) return false;
            const eventDateStr = event.time.split('T')[0];
            return eventDateStr === selectedDateStr;
        });
        setFilteredEvents(filtered);
    }, [date, events]);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            padding: 10,
            boxSizing: "border-box",
        }}>
            <h2 style={{ margin: "0 0 10px 0" }}>Календарь событий</h2>

            <div style={{ flexGrow: 1, overflow: "auto" }}>
                <Calendar
                    onChange={setDate}
                    value={date}
                />
            </div>

            <div style={{
                marginTop: 10,
                maxHeight: "100vh",
                overflowY: "auto",
                borderTop: "1px solid #ccc",
                paddingTop: 10,
            }}>
                <h3>События на {date.toLocaleDateString()}</h3>
                {filteredEvents.length === 0 ? (
                    <p>Событий нет</p>
                ) : (
                    <ul style={{ paddingLeft: 20 }}>
                        {filteredEvents.map(event => (
                            <li key={event.id} style={{ marginBottom: 10 }}>
                                <strong>{event.title || "Без названия"}</strong><br/>
                                {event.description && <span>{event.description}<br/></span>}
                                Время: {new Date(event.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CalendarPage;
