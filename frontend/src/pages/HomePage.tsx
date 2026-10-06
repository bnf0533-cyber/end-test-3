import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useAlertsStore } from "../store/useAlertsStore";
import { getAlerts, deleteAlert } from "../services/api";
import AlertsMap from "../AlertsMap";
import { NavBar } from "../components/NavBar";
import { useAuthState } from "../store/authStore";
import "../css/homePage.css";

export const HomePage = () => {
    const { alerts, setAlerts } = useAlertsStore();
    const { user } = useAuthState();
    const [name, setName] = useState("");
    const [arena, setArena] = useState("all");
    const [priority, setPriority] = useState("all");

    useEffect(() => {
        getAlerts()
            .then((data) => {
                setAlerts(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [setAlerts]);

    const handleDelete = async (id: string) => {
        await deleteAlert(id);
        setAlerts(alerts.filter((a) => a.id !== id && a._id !== id));
    };
    const activeAlerts = alerts.filter((a) => a.status === "Active");
    const hasNorth = activeAlerts.some((a) => a.arena === "North");
    const hasSouth = activeAlerts.some((a) => a.arena === "South");
    const hasCenter = activeAlerts.some((a) => a.arena === "Center");
    const isMultiArenaAttack = hasNorth && hasSouth && hasCenter;

    let list = alerts;
    if (user && user.role === "arena_user" && user.assignedArena !== "All") {
        list = list.filter((a) => a.arena === user.assignedArena);
    }
    if (name) {
        list = list.filter((a) => a.displayName.includes(name));
    }
    if (arena !== "all") {
        list = list.filter((a) => a.arena === arena);
    }
    if (priority !== "all") {
        list = list.filter((a) => a.priority === priority);
    }
    return (
        <div>
            <NavBar />
            {isMultiArenaAttack && (
                <h2 className="attack-alert">multi arena attack detected</h2>
            )}
            <header className="header-up">
                <h1>tzofia eye</h1>
                <nav>
                    <Link to="/add" className="link-add-alert">
                        add alert
                    </Link>
                </nav>
            </header>
            <section>
                <div>
                    <label>search by name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="search..."
                    />
                </div>
                <div>
                    <label>filter by arena</label>
                    <select
                        value={arena}
                        onChange={(e) => setArena(e.target.value)}
                    >
                        <option value="all">all</option>
                        <option value="North">north</option>
                        <option value="Center">center</option>
                        <option value="South">south</option>
                    </select>
                </div>
                <div>
                    <label>filter by priority</label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="all">all</option>
                        <option value="Low">low</option>
                        <option value="Medium">medium</option>
                        <option value="High">high</option>
                        <option value="Critical">critical</option>
                    </select>
                </div>
            </section>
            <section>
                <AlertsMap alerts={list} />
            </section>
            <section>
                {list.map((item) => {
                    const id = item._id || item.id;
                    return (
                        <div key={id}>
                            <p>name: {item.displayName}</p>
                            <p>arena: {item.arena}</p>
                            <p>priority: {item.priority}</p>
                            <p>status: {item.status}</p>
                            <p>
                                location: {item.lat}, {item.lon}
                            </p>
                            <div>
                                <Link to={`/alerts/${id}`}>view</Link>
                                <Link to={`/edit/${id}`}>edit</Link>
                                <button onClick={() => handleDelete(id)}>
                                    delete
                                </button>
                            </div>
                            <hr />
                        </div>
                    );
                })}
            </section>
        </div>
    );
};
