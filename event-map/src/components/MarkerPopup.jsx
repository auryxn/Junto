const MarkerPopup = ({ event }) => {
    const date = new Date(event.time);

    return (
        <div>
            <h3>{event.title}</h3>
            <p><strong>Описание:</strong> {event.description || "Без описания"}</p>
            <p><strong>Время:</strong> {date.toLocaleDateString()} {date.toLocaleTimeString()}</p>
            <p><strong>Локация:</strong> {event.locationName || "Без названия"}</p>
        </div>
    );
};

export default MarkerPopup;
