import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getAlertById } from "../services/api";
import type { Alert } from "../types/types";
import AlertsMap from "../AlertsMap";

export const AlertDetailsPage = () => {
    const { id } = useParams();
    const [alert, setAlert] = useState<Alert | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const load = async () => {
            if (id) {
                const data = await getAlertById(id);
                setAlert(data);
                setLoading(false);
            }
        };
        load();
    }, [id]);
    if (loading) {
        return <p>loading...</p>;
    }
    if (!alert) {
        return <p>alert not found</p>;
    }
    return (
        <div>
            <h1>alert details</h1>
            <section>
                <p>name: {alert.displayName}</p>
                <p>description: {alert.description}</p>
                <p>arena: {alert.arena}</p>
                <p>priority: {alert.priority}</p>
                <p>status: {alert.status}</p>
                <p>lat: {alert.lat}</p>
                <p>lon: {alert.lon}</p>
            </section>
            <section>
                <AlertsMap alerts={[alert]} />
            </section>
        </div>
    );
};
