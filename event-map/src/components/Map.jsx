// components/Map.jsx
import React, { useRef, useEffect } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/popups.css"

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Настройка иконок по умолчанию Leaflet
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const customMarkerIcon = new L.Icon({
    iconUrl: 'https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const getNowDateTimeLocal = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // месяц 0-11
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};


// Обработчик клика по карте
function MapClickHandler({ onMapClick }) {
    useMapEvents({
        click(e) {
            onMapClick(e.latlng);
        },
    });
    return null;
}

// Кнопка "Мое местоположение"
function LocateButton({ userPosition }) {
    const map = useMap();

    const handleClick = (e) => {
        e.stopPropagation();
        if (!userPosition || userPosition.length !== 2) {
            alert("Геолокация не получена");
            return;
        }

        map.flyTo(userPosition, 13, {
            animate: true,
            duration: 1.5,
        });
    };

    return (
        <button
            onClick={handleClick}
            style={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 1000,
                backgroundColor: "white",
                border: "1px solid #ccc",
                padding: "6px 10px",
                cursor: "pointer",
                borderRadius: 4,
                boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                userSelect: "none",
            }}
            title="Перейти к моему местоположению"
            type="button"
        >
            📍 Мое местоположение
        </button>
    );
}

const Map = ({
                 events,
                 userPosition,
                 onMapClick,
                 newMarker,
                 updateNewMarker,
                 onSaveNewMarker,
                 mapOptions,
                 tileLayerUrl,
                 tileLayerAttribution,
             }) => {
    const markerRef = useRef(null);

    useEffect(() => {
        if (markerRef.current) {
            markerRef.current.openPopup();
        }
    }, [newMarker]);

    return (
        <MapContainer
            center={userPosition}
            zoom={13}
            style={{ height: "100vh", width: "100%" }}
            {...mapOptions}
        >
            <TileLayer url={tileLayerUrl} attribution={tileLayerAttribution} />

            {/* Обработка клика по карте */}
            <MapClickHandler onMapClick={onMapClick} />

            {/* Кнопка "Мое местоположение" */}
            <LocateButton userPosition={userPosition} />

            {/* Маркер "Вы здесь" */}
            {userPosition && (
                <Marker
                    position={userPosition}
                    icon={L.icon({
                        iconUrl: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png', // иконка человека (можно заменить на любую другую)
                        iconSize: [32, 32],       // размер иконки, подберите под своё изображение
                        iconAnchor: [16, 37],     // точка крепления (обычно низ иконки)
                        popupAnchor: [0, -30],    // где появится попап относительно иконки
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',            // если нет тени, можно оставить пустым
                        shadowSize: [0, 0]
                    })}
                >
                    <Popup>Вы здесь</Popup>
                </Marker>
            )}

            {/* Существующие события */}
            {events.map((event) => (
                <Marker
                    key={event.id}
                    position={[
                        event.location.latitude ?? event.location.lat,
                        event.location.longitude ?? event.location.lng,
                    ]}
                >
                    <Popup>
                        <div>
                            <strong>{event.title}</strong>
                            <br />
                            {event.description && <div>{event.description}</div>}
                            <div>{new Date(event.time).toLocaleString()}</div>
                        </div>
                    </Popup>
                </Marker>
            ))}

            {/* Новая создаваемая метка */}
            {newMarker && (
                <Marker position={newMarker.position} ref={markerRef}>
                    <Popup>
                        <div style={{ minWidth: 200 }}>
                            <input
                                type="text"
                                placeholder="Название"
                                value={newMarker.title}
                                onChange={(e) =>
                                    updateNewMarker({ ...newMarker, title: e.target.value })
                                }
                                style={{ width: "100%", marginBottom: 5 }}
                            />
                            <textarea
                                placeholder="Описание"
                                value={newMarker.description || ""}
                                onChange={(e) =>
                                    updateNewMarker({
                                        ...newMarker,
                                        description: e.target.value,
                                    })
                                }
                                style={{ width: "100%", marginBottom: 5 }}
                            />
                            <input
                                type="datetime-local"
                                value={newMarker.time}
                                onChange={(e) =>
                                    updateNewMarker({ ...newMarker, time: e.target.value })
                                }
                                style={{ width: "100%", marginBottom: 5 }}
                            />
                            <button
                                onClick={() => onSaveNewMarker(newMarker)}
                                disabled={!newMarker.title || !newMarker.time}
                                style={{ width: "100%" }}
                            >
                                Сохранить событие
                            </button>
                        </div>
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default Map;
