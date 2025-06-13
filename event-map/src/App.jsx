// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import MapPage from "./pages/MapPage";
import AuthPage from "./pages/AuthPage";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/map" element={<MapPage />} />
        </Routes>
    );
};


export default App;
