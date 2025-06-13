const express = require("express");
const { db, auth } = require("./firebase/firebase");

const app = express();
const PORT = 3001;

app.use(express.json());

// 📥 POST /register — регистрация пользователя
app.post("/register", async (req, res) => {
  const { first_name, last_name, email, password, age, interest } = req.body;

  if (!first_name || !last_name || !email || !password || !age || !interest) {
    return res.status(400).json({ message: "Заполните все поля." });
  }

  try {
    // 🔐 Создание пользователя в Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
    });

    const uid = userRecord.uid;

    // 📄 Сохранение профиля в Firestore
    await db.collection("profiles").doc(uid).set({
      first_name,
      last_name,
      age,
      interest,
      created_at: new Date(),
    });

    res.status(201).json({ message: "Пользователь зарегистрирован." });

  } catch (error) {
    if (error.code === "auth/email-already-exists") {
      return res.status(409).json({ message: "Логин уже занят." });
    }

    console.error(error);
    res.status(500).json({ message: "Ошибка регистрации." });
  }
});

// 📤 GET /users — список всех пользователей
app.get("/users", async (req, res) => {
  const snapshot = await db.collection("profiles").get();
  const users = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost:${PORT}`);
});
