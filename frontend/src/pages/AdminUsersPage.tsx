import { useEffect, useState } from "react";
import axios from "axios";
import { getAllUsers, registerUser, deleteUser } from "../services/api";
import { NavBar } from "../components/NavBar";
import type { User } from "../types/types";

function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("arena_user");
    const [assignedArena, setAssignedArena] = useState("North");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const loadUsers = () => {
        getAllUsers()
            .then((res) => {
                setUsers(res.data || []);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        getAllUsers()
            .then((res) => {
                setUsers(res.data || []);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        try {
            await registerUser({
                username,
                email,
                password,
                role,
                assignedArena,
            });
            setSuccessMsg("User created successfully");
            setUsername("");
            setEmail("");
            setPassword("");
            loadUsers();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const data = err.response?.data;
                setErrorMsg(typeof data === "string" ? data : data?.message || JSON.stringify(data));
            }
        }
    };

    const handleDeleteUser = async (id?: string) => {
        if (!id) return;
        try {
            await deleteUser(id);
            loadUsers();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const data = err.response?.data;
                setErrorMsg(typeof data === "string" ? data : data?.message || JSON.stringify(data));
            }
        }
    };

    return (
        <div>
            <NavBar />
            <h2>Admin Users Management</h2>
            <h3>Create User</h3>
            <form onSubmit={handleCreateUser}>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="arena_user">arena_user</option>
                        <option value="general_user">general_user</option>
                        <option value="admin">admin</option>
                    </select>
                </div>
                <div>
                    <select
                        value={assignedArena}
                        onChange={(e) => setAssignedArena(e.target.value)}
                    >
                        <option value="North">North</option>
                        <option value="Center">Center</option>
                        <option value="South">South</option>
                        <option value="All">All</option>
                    </select>
                </div>
                <button type="submit">Create User</button>
            </form>
            {errorMsg && <p>{errorMsg}</p>}
            {successMsg && <p>{successMsg}</p>}
            <h3>Users List</h3>
            {users.map((u) => {
                const id = u.id || u._id;
                return (
                    <div key={id}>
                        <p>
                            {u.username} ({u.email}) - {u.role} -{" "}
                            {u.assignedArena}
                        </p>
                        <button
                            type="button"
                            onClick={() => handleDeleteUser(id)}
                        >
                            Delete
                        </button>
                        <hr />
                    </div>
                );
            })}
        </div>
    );
}

export default AdminUsersPage;
