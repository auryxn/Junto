import Map from "../components/Map.jsx";
import { useEffect, useState, useRef } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../client/firebase";
import "../styles/MapPage.css";
import { useNavigate } from "react-router-dom";

const MapPage = () => {
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [newMarker, setNewMarker] = useState(null);
    const [userPosition, setUserPosition] = useState(null);
    const [geoError, setGeoError] = useState(null);

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const fetchEvents = async () => {
            const snapshot = await getDocs(collection(db, "events"));
            const eventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setEvents(eventsData);
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                pos => {
                    setUserPosition([pos.coords.latitude, pos.coords.longitude]);
                    setGeoError(null);
                },
                () => {
                    setGeoError("Не удалось получить ваше местоположение. Показываем Москву.");
                    setUserPosition([55.75, 37.61]);
                }
            );
        } else {
            setGeoError("Геолокация не поддерживается вашим браузером. Показываем Москву.");
            setUserPosition([55.75, 37.61]);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    const toggleMenu = () => setMenuOpen(prev => !prev);

    const navigateTo = (path) => {
        navigate(path);
        setMenuOpen(false);
    };

    const formatDateTimeLocal = (date) => {
        const pad = (num) => (num < 10 ? '0' + num : num);
        const yyyy = date.getFullYear();
        const mm = pad(date.getMonth() + 1);
        const dd = pad(date.getDate());
        const hh = pad(date.getHours());
        const min = pad(date.getMinutes());
        return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
    };

    const handleMapClick = (latlng) => {
        setNewMarker({
            position: latlng,
            title: "",
            description: "",
            time: formatDateTimeLocal(new Date()),
        });
    };

    const updateNewMarker = (updatedMarker) => {
        setNewMarker(updatedMarker);
    };

    const onSaveNewMarker = async (markerData) => {
        try {
            await addDoc(collection(db, "events"), {
                title: markerData.title,
                description: markerData.description || "",
                time: new Date(markerData.time).toISOString(),
                location: markerData.position,
            });
            setNewMarker(null);

            const snapshot = await getDocs(collection(db, "events"));
            const eventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setEvents(eventsData);
        } catch (error) {
            alert("Ошибка при создании события: " + error.message);
        }
    };

    if (!userPosition) return <div>Определяем ваше местоположение...</div>;

    return (
        <div className="map-container" style={{ position: "relative", height: "100vh" }}>
            <Map
                events={events}
                userPosition={userPosition}
                onMapClick={handleMapClick}
                newMarker={newMarker}
                updateNewMarker={updateNewMarker}
                onSaveNewMarker={onSaveNewMarker}
                mapOptions={{
                    dragging: true,
                    scrollWheelZoom: true,
                    touchZoom: true,
                    doubleClickZoom: true,
                    keyboard: true,
                    zoomControl: false,
                    minZoom: 5,
                    maxZoom: 18,
                }}
                tileLayerUrl="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                tileLayerAttribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />
        </div>
    );
};

export default MapPage;
