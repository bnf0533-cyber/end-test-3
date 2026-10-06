import axios from "axios";
import type { AlertInput } from "../types/types";

const api = axios.create({
    baseURL: "http://localhost:3001/api",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export async function getAlerts() {
    const res = await api.get("/alerts");
    return res.data.data;
}

export async function getAlertById(id: string) {
    const res = await api.get(`/alerts/${id}`);
    return res.data.data;
}

export async function createAlert(data: AlertInput) {
    const res = await api.post("/alerts", data);
    return res.data.data;
}

export async function updateAlert(id: string, data: Partial<AlertInput>) {
    const res = await api.put(`/alerts/${id}`, data);
    return res.data.data;
}

export async function deleteAlert(id: string) {
    const res = await api.delete(`/alerts/${id}`);
    return res.data.data;
}

export async function loginUser(data: { email: string; password: string }) {
    const res = await api.post("/auth/login", data);
    return res.data;
}

export async function getAllUsers() {
    const res = await api.get("/auth/users");
    return res.data;
}

export async function registerUser(userData: object) {
    const res = await api.post("/auth/register", userData);
    return res.data;
}

export async function deleteUser(id: string) {
    const res = await api.delete(`/auth/users/${id}`);
    return res.data;
}
