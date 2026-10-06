import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { AddAlertPage } from "./pages/AddAlertPage";
import { AlertDetailsPage } from "./pages/AlertDetailsPage";
import { EditAlertPage } from "./pages/EditAlertPage";
import LoginPage from "./pages/LoginPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/add"
                    element={
                        <ProtectedRoute>
                            <AddAlertPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/alerts/:id"
                    element={
                        <ProtectedRoute>
                            <AlertDetailsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/edit/:id"
                    element={
                        <ProtectedRoute>
                            <EditAlertPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminUsersPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
