import { useEffect, useState } from "react";
import { getCurrentUser, getUserData } from "../сlient/firebase";
import Navigation from "../components/Navigation";
import "./Profile.css";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = getCurrentUser();

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const result = await getUserData(user.uid);
                if (result.success) {
                    setUserData(result.data);
                }
            }
            setLoading(false);
        };

        fetchUserData();
    }, [user]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Загрузка профиля...</p>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <Navigation />
            <div className="profile-content">
                <div className="profile-card">
                    <h2>Профиль пользователя</h2>
                    
                    {user && (
                        <div className="profile-info">
                            <div className="info-group">
                                <label>Email:</label>
                                <span>{user.email}</span>
                            </div>
                            
                            {userData && (
                                <>
                                    <div className="info-group">
                                        <label>Имя пользователя:</label>
                                        <span>{userData.username}</span>
                                    </div>
                                    
                                    <div className="info-group">
                                        <label>Дата регистрации:</label>
                                        <span>
                                            {userData.createdAt?.toDate?.() 
                                                ? userData.createdAt.toDate().toLocaleDateString('ru-RU')
                                                : 'Не указано'
                                            }
                                        </span>
                                    </div>
                                    
                                    <div className="info-group">
                                        <label>Событий создано:</label>
                                        <span>{userData.eventsCreated?.length || 0}</span>
                                    </div>
                                    
                                    <div className="info-group">
                                        <label>Событий посещено:</label>
                                        <span>{userData.eventsJoined?.length || 0}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
//fefee
export default Profile;