const { db } = require("./firebase_server");

async function createTestProfile() {
  const uid = "test_user_2";

  try {
    await db.collection("profiles").doc(uid).set({
      first_name: "Тест",
      last_name: "Пользователь",
      age: 25,
      interest: "тестирование",
      created_at: new Date(),
    });
    console.log("Тестовый профиль создан");
  } catch (error) {
    console.error("Ошибка создания профиля:", error);
  }
}

createTestProfile();

