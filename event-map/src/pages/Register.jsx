import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../api/firebase";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", userCred.user.uid), {
                username,
                email,
                eventsJoined: [],
            });
            navigate("/");
        } catch (err) {
            alert("Ошибка регистрации: " + err.message);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Регистрация</h2>
            <input placeholder="Имя" onChange={(e) => setUsername(e.target.value)} />
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Пароль" type="password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Зарегистрироваться</button>
        </form>
    );
};

export default Register;
