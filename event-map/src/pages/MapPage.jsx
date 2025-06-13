import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Map from "../components/Map.jsx";

const MapPage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const snapshot = await getDocs(collection(db, "events"));
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setEvents(data);
        };
        fetchEvents();
    }, []);

    return <Map events={events} />;
};

export default MapPage;
