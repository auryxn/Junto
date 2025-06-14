import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthPage.css";
import { AuthContext } from "../context/AuthContext";  // импортируй контекст

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
            setFormValid(email.trim() === "test@example.com" && password.trim() === "123456");
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
        if (email === "test@example.com" && password === "123456") {
            login();           // вызываем login из контекста
            navigate("/profile");
        } else {
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
        login();  // тоже вызов login из контекста
        navigate("/profile");
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
