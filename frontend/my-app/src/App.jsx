import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {
    return (
        <Routes>

            {/* =========================
                PUBLIC ROUTES
            ========================= */}

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/forgot-password"
                element={<ForgotPassword />}
            />

            <Route
                path="/reset-password"
                element={<ResetPassword />}
            />


            {/* =========================
                PROTECTED ROUTES
            ========================= */}

            <Route element={<ProtectedRoute />}>

                {/* Dashboard */}

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />


                {/* Students */}

                <Route
                    path="/dashboard/students"
                    element={<Students />}
                />


                {/* Add Student */}

                <Route
                    path="/dashboard/add-student"
                    element={<AddStudent />}
                />


                {/* Edit Student */}

                <Route
                    path="/dashboard/edit-student/:id"
                    element={<EditStudent />}
                />


                {/* Profile */}

                <Route
                    path="/profile"
                    element={<Profile />}
                />


                {/* Change Password */}

                <Route
                    path="/change-password"
                    element={<ChangePassword />}
                />

            </Route>


            {/* =========================
                UNKNOWN URL
            ========================= */}

            <Route
                path="*"
                element={<Login />}
            />

        </Routes>
    );
}

export default App;