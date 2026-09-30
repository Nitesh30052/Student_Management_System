import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

import "../styles/navbar.css";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="admin-navbar">

      <Link to="/dashboard" className="navbar-logo">
        StudentMS
      </Link>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>

    </nav>
  );
}

export default AdminNavbar;