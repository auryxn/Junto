const { db } = require("./firebase_server");

async function createTestLocation() {
  const locationId = "location_1";

  try {
    await db.collection("locations").doc(locationId).set({
      name: "Цеfsafнтральная площадь",
      information: "Место встречи и проведения мероприятий",
      coordinates: {
        lat: 53.9006,
        lng: 27.5590,
      },
       meeting_time: new Date("2025-06-20T18:00:00"), // дата и время встречи
      created_at: new Date(),
    });

    console.log("Локация успешно создана");
  } catch (error) {
    console.error("Ошибка создания локации:", error);
  }
}

createTestLocation();
