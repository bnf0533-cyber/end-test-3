import { Link, useNavigate } from "react-router";
import { useAuthState } from "../store/authStore";

export const NavBar = () => {
    const { user, logout } = useAuthState();
    const navigate = useNavigate();
    if (!user) return null;
    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    return (
        <nav>
            <Link to="/">Dashboard</Link>
            {user.role === "admin" && (
                <Link to="/admin/users"> | Manage Users</Link>
            )}
            <p>
                user: {user.username} ({user.role} - {user.assignedArena})
            </p>
            <button onClick={handleLogout}>Logout</button>
            <hr />
        </nav>
    );
};
