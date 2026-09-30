import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";

import {
  FaUserPlus,
  FaUserEdit,
  FaUserMinus,
  FaTachometerAlt,
} from "react-icons/fa";

function Home() {
  return (
    <>
      <Navbar />

      <div className="container home-container">

        {/* Hero Section */}

        <div className="text-center">

          <h1 className="home-title">
            Student Management System
          </h1>

          <p className="home-subtitle">
            Student Management System

Manage student records quickly and efficiently with a modern Student Management System.
          </p>

         <div className="mt-5">

  <Link
    to="/login"
    className="btn btn-primary btn-lg px-5"
  >
    Get Started
  </Link>

</div>
        </div>

        {/* Feature Cards */}

        <div className="row mt-5">

          <div className="col-lg-4 col-md-6 mb-4">

            <div className="card feature-card shadow">

              <div className="card-body text-center">

                <FaUserPlus className="feature-icon text-primary" />

                <h3>Add Student</h3>

                <p>
                  Register new students quickly and maintain accurate records.
                </p>

                <Link
    to="/login"
    className="btn btn-outline-primary"
>
    Explore
</Link>

              </div>

            </div>

          </div>

          <div className="col-lg-4 col-md-6 mb-4">

            <div className="card feature-card shadow">

              <div className="card-body text-center">

                <FaUserEdit className="feature-icon text-success" />

                <h3>Edit Student</h3>

                <p>
                  Update student information whenever changes are required.
                </p>

               <Link
    to="/login"
    className="btn btn-outline-success"
>
    Explore
</Link>

              </div>

            </div>

          </div>

          <div className="col-lg-4 col-md-6 mb-4">

            <div className="card feature-card shadow">

              <div className="card-body text-center">

                <FaUserMinus className="feature-icon text-danger" />

                <h3>Delete Student</h3>

                <p>
                  Remove outdated student records securely and efficiently.
                </p>

                <Link
    to="/login"
    className="btn btn-outline-danger"
>
    Explore
</Link>

              </div>

            </div>

          </div>

        </div>

        {/* Why Choose StudentMS */}

        <section className="why-us mt-5">

          <h2 className="text-center mb-5">
            Why Choose StudentMS?
          </h2>

          <div className="row">

            <div className="col-lg-4 col-md-6 mb-4">

              <div className="card shadow why-card">

                <div className="card-body text-center">

                  <h1>⚡</h1>

                  <h4>Fast Performance</h4>

                  <p>
                    Optimized to manage student records efficiently.
                  </p>

                </div>

              </div>

            </div>

            <div className="col-lg-4 col-md-6 mb-4">

              <div className="card shadow why-card">

                <div className="card-body text-center">

                  <h1>🔒</h1>

                  <h4>Secure Authentication</h4>

                  <p>
                    Protected login system with secure access control.
                  </p>

                </div>

              </div>

            </div>

            <div className="col-lg-4 col-md-6 mb-4">

              <div className="card shadow why-card">

                <div className="card-body text-center">

                  <h1>📱</h1>

                  <h4>Responsive Design</h4>

                  <p>
                    Works seamlessly across desktop, tablet, and mobile devices.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

      </div>

      <Footer />
    </>
  );
}

export default Home;