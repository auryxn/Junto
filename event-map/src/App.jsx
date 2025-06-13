// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import MapPage from "./pages/MapPage";
import Profile from "./pages/Profile"
import AuthPage from "./pages/AuthPage";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
};
//fefe

export default App;
