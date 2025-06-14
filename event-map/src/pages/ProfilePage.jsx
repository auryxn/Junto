import React from "react";
import "../styles/ProfilePage.css"

const ProfilePage = () => {

    const user = {
        photo: "https://i.pravatar.cc/250?img=12",
        firstName: "Марина",
        lastName: "Смирнова",
        age: 27,
        email: "marina.smirnova@example.com",
        city: "Москва",
        hobbies: ["Путешествия", "Фотография", "Йога", "Кулинария"],
        description:
            "Люблю открывать новые места и заниматься творчеством. Всегда стремлюсь к развитию и новым впечатлениям.",
        socials: {
            instagram: "#",
            twitter: "#",
            linkedin: "#",
        },
    };

    return (
        <>
            <div className="profile-container" role="main" aria-label="Профиль пользователя">
                <div className="header">
                    <img
                        src={user.photo}
                        alt={`Фото профиля пользователя ${user.firstName} ${user.lastName}`}
                        className="photo"
                        loading="lazy"
                    />
                    <div className="main-info">
                        <h1 className="name-age">
                            {user.firstName} {user.lastName}, {user.age}
                        </h1>
                        <div className="location-email">
                            {user.city} • <a href={`mailto:${user.email}`} style={{color: "#f0c987", textDecoration: "underline"}}>{user.email}</a>
                        </div>
                        <p className="description">{user.description}</p>
                    </div>
                </div>

                <section className="hobbies-section" aria-label="Хобби пользователя">
                    <div className="hobbies-title">Хобби</div>
                    <div className="hobbies-list">
                        {user.hobbies.map((hobby, i) => (
                            <div className="hobby" key={i}>{hobby}</div>
                        ))}
                    </div>
                </section>

                <section className="socials" aria-label="Социальные сети пользователя">
                    <a href={user.socials.instagram} className="social-link" aria-label="Instagram" target="_blank" rel="noreferrer">
                        📸
                    </a>
                    <a href={user.socials.twitter} className="social-link" aria-label="Twitter" target="_blank" rel="noreferrer">
                        🐦
                    </a>
                    <a href={user.socials.linkedin} className="social-link" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                        💼
                    </a>
                </section>
            </div>
        </>
    );
};

export default ProfilePage;
