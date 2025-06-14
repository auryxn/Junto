import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmUjdKJuyfvl89mD7ERiMl-3AB1vURk1A",
  authDomain: "junto-42e0b.firebaseapp.com",
  projectId: "junto-42e0b",
  storageBucket: "junto-42e0b.firebasestorage.app",
  messagingSenderId: "651577715608",
  appId: "1:651577715608:web:c82af70767af6f878659ed"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
