import { Link, useLocation } from "react-router-dom";
import { getCurrentUser } from "../сlient/firebase";
import LogoutButton from "./LogoutButton";
import "./Components.css";

const Navigation = () => {
    const location = useLocation();
    const user = getCurrentUser();

    return (
        <nav className="nav-container">
            <Link to="/" className="nav-logo">
                Junto
            </Link>
            
            <div className="nav-links">
                <Link 
                    to="/" 
                    className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                >
                    Карта
                </Link>
                
                <Link 
                    to="/profile" 
                    className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`}
                >
                    Профиль
                </Link>
                
                {user && (
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ color: "#666", fontSize: "14px" }}>
                            {user.email}
                        </span>
                        <LogoutButton />
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation; 