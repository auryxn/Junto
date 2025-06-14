// App.js — БЕЗ BrowserRouter
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import MapPage from "./pages/MapPage";
import PrivateRoute from "./components/ProtectedRoute";
import MenuButton from "./components/MenuButton";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <AuthProvider>
            <MenuButton />
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="/map" element={<MapPage />} />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <ProfilePage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </AuthProvider>
    );
}

export default App;
