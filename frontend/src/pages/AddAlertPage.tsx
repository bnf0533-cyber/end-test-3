import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { createAlert } from "../services/api";

export const AddAlertPage = () => {
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Low");
    const [arena, setArena] = useState("North");
    const [status, setStatus] = useState("Active");
    const [lon, setLon] = useState("");
    const [lat, setLat] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!displayName || !description || !lon || !lat) {
            setError("all fields are required");
            return;
        }
        const numLon = Number(lon);
        const numLat = Number(lat);
        if (isNaN(numLon) || isNaN(numLat)) {
            setError("coordinates must be numbers");
            return;
        }
        setLoading(true);
        await createAlert({
            displayName,
            description,
            priority,
            arena,
            status,
            lon: numLon,
            lat: numLat,
        });
        setLoading(false);
        navigate("/");
    };
    return (
        <div>
            <h1>add alert</h1>
            {error && <p>{error}</p>}
            {loading && <p>loading...</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>name</label>
                    <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                </div>
                <div>
                    <label>description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>priority</label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="Low">low</option>
                        <option value="Medium">medium</option>
                        <option value="High">high</option>
                        <option value="Critical">critical</option>
                    </select>
                </div>
                <div>
                    <label>arena</label>
                    <select
                        value={arena}
                        onChange={(e) => setArena(e.target.value)}
                    >
                        <option value="North">north</option>
                        <option value="Center">center</option>
                        <option value="South">south</option>
                    </select>
                </div>
                <div>
                    <label>status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Active">active</option>
                        <option value="Handled">handled</option>
                    </select>
                </div>
                <div>
                    <label>lat</label>
                    <input
                        type="text"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                    />
                </div>
                <div>
                    <label>lon</label>
                    <input
                        type="text"
                        value={lon}
                        onChange={(e) => setLon(e.target.value)}
                    />
                </div>
                <button type="submit">save</button>
            </form>
        </div>
    );
};
