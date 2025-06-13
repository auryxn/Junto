// src/api/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // ✅ добавляем

const firebaseConfig = {
    apiKey: "твой-ключ",
    authDomain: "твой-домен",
    projectId: "твой-проект-id",
    storageBucket: "твой-bucket",
    messagingSenderId: "твой-sender-id",
    appId: "твой-app-id"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app); // ✅ экспортируем auth
