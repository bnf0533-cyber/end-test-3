import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { loginUser } from "../services/api";
import { useAuthState } from "../store/authStore";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const { setAuth } = useAuthState();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMsg("");
        try {
            const res = await loginUser({ email, password });
            if (res.data?.token) {
                setAuth(res.data.user, res.data.token);
                navigate("/");
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const data = err.response?.data;
                setErrorMsg(typeof data === "string" ? data : data?.message || JSON.stringify(data));
            }
        }
    };
    return (
        <div>
            <h2>login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email"
                        required
                    />
                </div>
                <div>
                    <label>password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        required
                    />
                </div>
                <button type="submit">Login</button>
                {errorMsg && <p>{errorMsg}</p>}
            </form>
        </div>
    );
}

export default LoginPage;
