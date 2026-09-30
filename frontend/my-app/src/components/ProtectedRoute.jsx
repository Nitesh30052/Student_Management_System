import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const token = localStorage.getItem("token");

    // If user is not logged in
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // If user is logged in
    return <Outlet />;
}

export default ProtectedRoute;