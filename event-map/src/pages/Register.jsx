import { useState } from "react";
import { registerUser } from "../сlient/firebase";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Валидация
        if (!email || !password || !confirmPassword || !username) {
            setError("Пожалуйста, заполните все поля");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("Пароль должен содержать минимум 6 символов");
            setLoading(false);
            return;
        }

        const result = await registerUser(email, password, username);
        
        if (result.success) {
            navigate("/");
        } else {
            setError(result.error);
        }
        
        setLoading(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Регистрация</h2>
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleRegister} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="username">Имя пользователя</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Введите ваше имя"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Введите ваш email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Введите пароль (минимум 6 символов)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Подтвердите пароль</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Повторите пароль"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? "Регистрация..." : "Зарегистрироваться"}
                    </button>
                </form>
                
                <div className="auth-links">
                    <p>
                        Уже есть аккаунт? <Link to="/login">Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
