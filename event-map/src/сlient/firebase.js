import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

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

// Функции аутентификации
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const registerUser = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Создаем документ пользователя в Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      username,
      email,
      createdAt: new Date(),
      eventsJoined: [],
      eventsCreated: []
    });
    
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const getUserData = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() };
    } else {
      return { success: false, error: "Пользователь не найден" };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};
