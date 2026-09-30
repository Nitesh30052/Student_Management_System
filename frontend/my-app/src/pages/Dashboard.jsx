import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import {
    FaUserGraduate,
    FaBuilding,
    FaUsers,
} from "react-icons/fa";

import "../styles/dashboard.css";

function Dashboard() {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const departments = ["CSE", "ECE", "IT", "MECH"];

    useEffect(() => {

        const fetchStudents = async () => {

            try {

                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");

                if (!token) {
                    setError("You are not logged in.");
                    return;
                }

                const response = await fetch(
                    "http://localhost:5000/api/students",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch students"
                    );
                }

                setStudents(data);

            } catch (error) {

                console.error(
                    "Error fetching students:",
                    error
                );

                setError(error.message);

            } finally {

                setLoading(false);

            }
        };

        fetchStudents();

    }, []);

    // Students added within the last 7 days
    const recentStudents = students
        .filter((student) => {

            if (!student.created_at) {
                return false;
            }

            const createdDate =
                new Date(student.created_at);

            const currentDate = new Date();

            const difference =
                currentDate.getTime() -
                createdDate.getTime();

            const sevenDays =
                7 * 24 * 60 * 60 * 1000;

            return (
                difference >= 0 &&
                difference <= sevenDays
            );

        })
        .slice(0, 5);

    return (

        <DashboardLayout>

            <div className="dashboard-container">

                <h2 className="dashboard-title mb-4">
                    Dashboard
                </h2>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                {/* Statistics Cards */}

                <div className="row g-4">

                    {/* Total Students */}

                    <div className="col-lg-4 col-md-6">

                        <div className="card dashboard-card h-100">

                            <div className="card-body">

                                <div className="icon-box blue">
                                    <FaUserGraduate />
                                </div>

                                <h5 className="mt-4">
                                    Total Students
                                </h5>

                                <div className="dashboard-number">

                                    {loading
                                        ? "..."
                                        : students.length}

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Departments */}

                    <div className="col-lg-4 col-md-6">

                        <div className="card dashboard-card h-100">

                            <div className="card-body">

                                <div className="icon-box yellow">
                                    <FaBuilding />
                                </div>

                                <h5 className="mt-4">
                                    Departments
                                </h5>

                                <div className="dashboard-number">
                                    {departments.length}
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Recent Students */}

                    <div className="col-lg-4 col-md-6">

                        <div className="card dashboard-card h-100">

                            <div className="card-body">

                                <div className="icon-box green">
                                    <FaUsers />
                                </div>

                                <h5 className="mt-4">
                                    Recent Students
                                </h5>

                                <div className="dashboard-number">

                                    {loading
                                        ? "..."
                                        : recentStudents.length}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Recent Students List */}

                <div className="card recent-students-card">

                    <div className="card-header">
                        Recent Students
                    </div>

                    {loading ? (

                        <div className="p-4 text-center">
                            Loading students...
                        </div>

                    ) : recentStudents.length === 0 ? (

                        <div className="p-4 text-center text-muted">
                            No students added in the last 7 days.
                        </div>

                    ) : (

                        recentStudents.map((student) => (

                            <div
                                className="recent-student"
                                key={student.id}
                            >

                                <div>

                                    <div className="recent-student-name">
                                        {student.name}
                                    </div>

                                    <div className="recent-student-email">
                                        {student.email}
                                    </div>

                                </div>

                                <div className="recent-student-department">
                                    {student.department}
                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </DashboardLayout>
    );
}

export default Dashboard;