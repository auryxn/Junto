import { useState } from "react";
import { logoutUser } from "../сlient/firebase";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ className = "" }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setLoading(true);
        const result = await logoutUser();
        
        if (result.success) {
            navigate("/login");
        } else {
            console.error("Ошибка выхода:", result.error);
        }
        
        setLoading(false);
    };

    return (
        <button 
            onClick={handleLogout}
            className={`logout-button ${className}`}
            disabled={loading}
        >
            {loading ? "Выход..." : "Выйти"}
        </button>
    );
};

export default LogoutButton; 