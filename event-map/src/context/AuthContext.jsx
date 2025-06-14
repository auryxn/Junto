import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        // Важно: ключ localStorage - "auth"
        const auth = localStorage.getItem("auth");
        setIsAuth(auth === "true");
    }, []);

    const login = () => {
        localStorage.setItem("auth", "true");
        setIsAuth(true);
    };


    const logout = () => {
        localStorage.removeItem("auth");
        setIsAuth(false);
    };

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
