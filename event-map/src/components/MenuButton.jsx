import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MenuButton = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();




    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    const toggleMenu = () => setMenuOpen(prev => !prev);

    const navigateTo = (path) => {
        navigate(path);
        setMenuOpen(false);
    };

    return (
        <div
            style={{ position: "absolute", top: 10, left: 10, zIndex: 1000 }}
            ref={menuRef}
        >
            <button
                onClick={toggleMenu}
                style={{
                    padding: "8px 12px",
                    fontSize: "16px",
                    cursor: "pointer",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    backgroundColor: "white",
                    userSelect: "none",
                }}
            >
                Меню ▼
            </button>

            {menuOpen && (
                <div
                    style={{
                        marginTop: 5,
                        background: "white",
                        border: "1px solid #ccc",
                        borderRadius: 6,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        minWidth: 150,
                        textAlign: "left",
                        color: "black",
                    }}
                >
                    <div
                        onClick={() => navigateTo("/profile")}
                        style={{padding: "10px", cursor: "pointer", borderBottom: "1px solid #eee"}}
                        onMouseDown={e => e.preventDefault()}
                    >
                        Профиль
                    </div>
                    <div
                        onClick={() => navigateTo("/calendar")}
                        style={{padding: "10px", cursor: "pointer"}}
                        onMouseDown={e => e.preventDefault()}
                    >
                        Календарь
                    </div>
                    <div
                        onClick={() => navigateTo("/map")}
                        style={{padding: "10px", cursor: "pointer"}}
                        onMouseDown={e => e.preventDefault()}
                    >
                        Карта
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuButton;
