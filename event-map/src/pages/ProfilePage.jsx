import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../client/firebase";
import { doc, getDoc } from "firebase/firestore";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        localStorage.removeItem("isAuth");
        navigate("/");
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (!user) {
                navigate("/");
                return;
            }

            try {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    setUserData(userSnap.data());
                } else {
                    console.warn("Пользователь не найден в Firestore");
                }
            } catch (error) {
                console.error("Ошибка загрузки данных пользователя:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    if (loading)
        return <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>Загрузка...</div>;

    if (!userData)
        return <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>Нет данных</div>;

    const {
        photo,
        firstName,
        lastName,
        age,
        email,
        city,
        hobbies,
        description,
        socials,
    } = userData;

    return (
        <div className="profile-container" role="main" aria-label="Профиль пользователя">
            <div className="header">
                <img
                    src={photo}
                    alt={`Фото профиля пользователя ${firstName} ${lastName}`}
                    className="photo"
                    loading="lazy"
                />
                <div className="main-info">
                    <h1 className="name-age">
                        {firstName} {lastName}, {age}
                    </h1>
                    <div className="location-email">
                        {city} • <a href={`mailto:${email}`} style={{ color: "#f0c987", textDecoration: "underline" }}>{email}</a>
                    </div>
                    <p className="description">{description}</p>
                </div>
            </div>

            {hobbies?.length > 0 && (
                <section className="hobbies-section" aria-label="Хобби пользователя">
                    <div className="hobbies-title">Хобби</div>
                    <div className="hobbies-list">
                        {hobbies.map((hobby, i) => (
                            <div className="hobby" key={i}>{hobby}</div>
                        ))}
                    </div>
                </section>
            )}

            <section className="socials" aria-label="Социальные сети пользователя">
                {socials?.instagram && (
                    <a href={socials.instagram} className="social-link" aria-label="Instagram" target="_blank" rel="noreferrer">📸</a>
                )}
                {socials?.twitter && (
                    <a href={socials.twitter} className="social-link" aria-label="Twitter" target="_blank" rel="noreferrer">🐦</a>
                )}
                {socials?.linkedin && (
                    <a href={socials.linkedin} className="social-link" aria-label="LinkedIn" target="_blank" rel="noreferrer">💼</a>
                )}
            </section>

            <button className="logout-button" onClick={handleLogout} aria-label="Выйти из профиля">
                Выйти
            </button>
        </div>
    );
};

export default ProfilePage;
