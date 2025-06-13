import { signOut } from "firebase/auth";
import { auth } from "../api/firebase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    return (
        <div>
            <h2>Профиль</h2>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    );
};
//fefe
export default Profile;