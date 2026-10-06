import { create } from "zustand";
import type { Alert } from "../types/types";

interface AlertsState {
    alerts: Alert[];
    setAlerts: (alerts: Alert[]) => void;
}

export const useAlertsStore = create<AlertsState>((set) => ({
    alerts: [],
    setAlerts: (alerts) => set({ alerts }),
}));
