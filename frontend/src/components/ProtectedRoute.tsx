import React from "react";
import { useAuthState } from "../store/authStore";
import { Navigate } from "react-router";

function ProtectedRoute({
    children,
    requiredRole,
}: {
    children: React.ReactNode;
    requiredRole?: string;
}) {
    const token = useAuthState((state) => state.token);
    const user = useAuthState((state) => state.user);
    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }
    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
}

export default ProtectedRoute;
