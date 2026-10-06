export type Priority = "Low" | "Medium" | "High" | "Critical";
export type Arena = "North" | "Center" | "South";
export type Status = "Active" | "Handled";

export interface Alert {
    id: string;
    _id?: string;
    displayName: string;
    description: string;
    priority: string;
    arena: string;
    status: string;
    lon: number;
    lat: number;
    createdAt?: string;
}

export interface AlertInput {
    displayName: string;
    description: string;
    priority: string;
    arena: string;
    status: string;
    lon: number;
    lat: number;
}

export type UserRole = "arena_user" | "general_user" | "admin";
export type UserArena = "North" | "South" | "Center" | "All";

export interface User {
    id?: string;
    _id?: string;
    username: string;
    email: string;
    role: UserRole;
    assignedArena: UserArena;
}
