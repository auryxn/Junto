import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// чтобы маркеры отображались
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Map = ({ events }) => (
    <MapContainer center={[55.751244, 37.618423]} zoom={13} style={{ height: "100vh" }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {events.map(event => (
            <Marker key={event.id} position={event.location}>
                <Popup>
                    <strong>{event.title}</strong><br />
                    {new Date(event.time).toLocaleTimeString()}
                </Popup>
            </Marker>
        ))}
    </MapContainer>
);

export default Map;
