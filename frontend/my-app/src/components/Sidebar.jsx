import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUserGraduate,
  FaPlusCircle,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import "../styles/sidebar.css";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  return (
    <div className="sidebar">

      <h3 className="sidebar-title">
        StudentMS
      </h3>

      <ul className="sidebar-menu">

        {/* Dashboard */}
        <li>
          <Link
            to="/dashboard"
            className={
              location.pathname === "/dashboard"
                ? "active"
                : ""
            }
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </Link>
        </li>


        {/* Students */}
        <li>
          <Link
            to="/dashboard/students"
            className={
              location.pathname === "/dashboard/students"
                ? "active"
                : ""
            }
          >
            <FaUserGraduate />
            <span>Students</span>
          </Link>
        </li>


        {/* Add Student */}
        <li>
          <Link
            to="/dashboard/add-student"
            className={
              location.pathname === "/dashboard/add-student"
                ? "active"
                : ""
            }
          >
            <FaPlusCircle />
            <span>Add Student</span>
          </Link>
        </li>


        {/* Profile */}
        <li>
          <Link
            to="/profile"
            className={
              location.pathname === "/profile"
                ? "active"
                : ""
            }
          >
            <FaUserCircle />
            <span>Profile</span>
          </Link>
        </li>


        {/* Logout */}
        <li>
          <button
            type="button"
            className="sidebar-logout"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;