import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import AddStudent from "../pages/AddStudent";
import EditStudent from "../pages/EditStudent";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Settings from "../pages/Settings";

function AppRoutes() {
  return (
    <Routes>

      {/* Home */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* Authentication */}
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

      {/* Settings */}
      <Route
        path="/dashboard/settings"
        element={<Settings />}
      />

      {/* 404 */}
      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default AppRoutes;