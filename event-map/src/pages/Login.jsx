import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            alert("Ошибка входа: " + err.message);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Вход</h2>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Пароль" type="password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Войти</button>
        </form>
    );
};

export default Login;
