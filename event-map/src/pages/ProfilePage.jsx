import React from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const navigate = useNavigate();

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

    const handleLogout = () => {
        localStorage.removeItem("isAuth");
        navigate("/");
    };

    return (
        <>
            <style>{`
        * {
          box-sizing: border-box;
        }
        body,html,#root {
          margin: 0; padding: 0; height: 100%;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          overflow: hidden;
        }
        .profile-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          max-width: 900px;
          margin: auto;
          padding: 40px 30px;
          background: rgba(0,0,0,0.5);
          border-radius: 20px;
          box-shadow: 0 0 30px rgba(0,0,0,0.7);
          overflow-y: auto;
          user-select: none;
        }
        .header {
          display: flex;
          align-items: center;
          gap: 30px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }
        .photo {
          flex-shrink: 0;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          border: 4px solid #fff;
          object-fit: cover;
          box-shadow: 0 5px 15px rgba(0,0,0,0.5);
          background: #eee;
        }
        .main-info {
          flex-grow: 1;
          min-width: 220px;
        }
        .name-age {
          font-size: 2.4rem;
          font-weight: 700;
          margin: 0 0 10px 0;
          line-height: 1.2;
        }
        .location-email {
          font-size: 1.1rem;
          color: #ddd;
          margin-bottom: 10px;
        }
        .description {
          font-size: 1.15rem;
          line-height: 1.4;
          color: #ccc;
          max-width: 600px;
        }
        .hobbies-section {
          margin-top: 25px;
        }
        .hobbies-title {
          font-weight: 700;
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: #f0c987;
        }
        .hobbies-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .hobby {
          background: #f0c987;
          color: #333;
          padding: 6px 15px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.95rem;
          user-select: text;
        }
        .socials {
          margin-top: 30px;
          display: flex;
          gap: 25px;
        }
        .social-link {
          color: #f0c987;
          font-size: 1.8rem;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .social-link:hover {
          color: #fff;
        }
        .logout-button {
          margin-top: auto;
          padding: 14px;
          background: #e74c3c;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          color: white;
          transition: background-color 0.25s ease;
          user-select: none;
        }
        .logout-button:hover {
          background: #c0392b;
        }

        /* Scrollbar styling for container if overflow */
        .profile-container::-webkit-scrollbar {
          width: 8px;
        }
        .profile-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .profile-container::-webkit-scrollbar-thumb {
          background-color: #f0c987;
          border-radius: 4px;
        }

        @media (max-width: 600px) {
          .header {
            flex-direction: column;
            align-items: center;
          }
          .main-info {
            text-align: center;
            min-width: auto;
          }
          .name-age {
            font-size: 2rem;
          }
          .description {
            max-width: 100%;
          }
          .hobbies-list {
            justify-content: center;
          }
          .socials {
            justify-content: center;
          }
        }
      `}</style>

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

                <button className="logout-button" onClick={handleLogout} aria-label="Выйти из профиля">
                    Выйти
                </button>
            </div>
        </>
    );
};

export default ProfilePage;
