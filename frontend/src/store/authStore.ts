import { create } from "zustand";
import type { User } from "../types/types";

interface AuthState {
    user: User | null;
    token: string | null;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
}

const getInitialAuth = () => {
    try {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");
        if (savedToken && savedUser && savedUser !== "undefined") {
            const user = JSON.parse(savedUser);
            if (user && user.role) {
                return { token: savedToken, user };
            }
        }
    } catch {
        return { token: null, user: null };
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return { token: null, user: null };
};

const initialAuth = getInitialAuth();

export const useAuthState = create<AuthState>((set) => ({
    user: initialAuth.user,
    token: initialAuth.token,
    setAuth: (user: User, token: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        set({ user, token });
    },
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({ user: null, token: null });
    },
}));
