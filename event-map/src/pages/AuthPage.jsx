import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthPage.css";
import { AuthContext } from "../context/AuthContext";  // импортируй контекст
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../client/firebase"; // импорт из твоего Firebase файла

const AuthPage = () => {
    const { login } = useContext(AuthContext);  // достань login из контекста
    const [tab, setTab] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [formValid, setFormValid] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (tab === "login") {
            const emailValid = /\S+@\S+\.\S+/.test(email);
            const passwordValid = password.length >= 6;
            setFormValid(emailValid && passwordValid);
        } else {
            const namesValid = firstName.trim() !== "" && lastName.trim() !== "";
            const passwordsValid = password.length >= 6 && password === confirmPassword;
            const emailValid = /\S+@\S+\.\S+/.test(email);
            setFormValid(namesValid && passwordsValid && emailValid);
        }
    }, [tab, email, password, confirmPassword, firstName, lastName]);



    const resetForm = () => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFirstName("");
        setLastName("");
        setError("");
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            login(); // установит isAuth в true
            navigate("/profile");
        } catch (err) {
            setError("Неверный email или пароль");
        }
    };



    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            login();
            navigate("/profile");
        } catch (err) {
            setError("Ошибка при регистрации: " + err.message);
        }
    };


    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <div className="tabs">
                    <button
                        className={tab === "login" ? "active" : ""}
                        onClick={() => {
                            setTab("login");
                            resetForm();
                        }}
                    >
                        Вход
                    </button>
                    <button
                        className={tab === "register" ? "active" : ""}
                        onClick={() => {
                            setTab("register");
                            resetForm();
                        }}
                    >
                        Регистрация
                    </button>
                </div>

                <form
                    onSubmit={tab === "login" ? handleLogin : handleRegister}
                    className="auth-form"
                    noValidate
                >
                    {tab === "register" && (
                        <>
                            <input
                                placeholder="Имя"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                minLength={2}
                                maxLength={30}
                            />
                            <input
                                placeholder="Фамилия"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                minLength={2}
                                maxLength={30}
                            />
                        </>
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={6}
                        required
                    />
                    {tab === "register" && (
                        <input
                            type="password"
                            placeholder="Повторите пароль"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            minLength={6}
                            required
                        />
                    )}
                    {error && <div className="error">{error}</div>}
                    <button type="submit" disabled={!formValid}>
                        {tab === "login" ? "Войти" : "Зарегистрироваться"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthPage;
