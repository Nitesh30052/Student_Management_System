import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

function AddStudent() {
    const navigate = useNavigate();

    const [student, setStudent] = useState({
        name: "",
        email: "",
        department: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("You are not logged in.");
                return;
            }

            const response = await fetch(
                "http://localhost:5000/api/students",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(student),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to add student"
                );
            }

            alert("Student Added Successfully!");

            navigate("/dashboard/students");

        } catch (error) {
            console.error(
                "Error adding student:",
                error
            );

            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>

            <div className="add-student-page">

                {/* PAGE HEADER */}

                <div className="add-student-header">

                    <h2>Add Student</h2>

                    <div className="add-student-line"></div>

                    <p>
                        Add a new student to the system.
                    </p>

                </div>


                {/* FORM CARD */}

                <div className="add-student-card">

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        {/* NAME */}

                        <div className="add-student-field">

                            <label htmlFor="student-name">
                                Student Name
                            </label>

                            <input
                                id="student-name"
                                type="text"
                                name="name"
                                value={student.name}
                                onChange={handleChange}
                                placeholder="Enter Student Name"
                                required
                            />

                        </div>


                        {/* EMAIL */}

                        <div className="add-student-field">

                            <label htmlFor="student-email">
                                Email
                            </label>

                            <input
                                id="student-email"
                                type="email"
                                name="email"
                                value={student.email}
                                onChange={handleChange}
                                placeholder="Enter Email"
                                required
                            />

                        </div>


                        {/* DEPARTMENT */}

                        <div className="add-student-field">

                            <label htmlFor="student-department">
                                Department
                            </label>

                            <select
                                id="student-department"
                                name="department"
                                value={student.department}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select Department
                                </option>

                                <option value="CSE">
                                    CSE
                                </option>

                                <option value="ECE">
                                    ECE
                                </option>

                                <option value="IT">
                                    IT
                                </option>

                                <option value="MECH">
                                    MECH
                                </option>

                            </select>

                        </div>


                        {/* BUTTONS */}

                        <div className="add-student-actions">

                            <button
                                type="submit"
                                className="save-student-btn"
                                disabled={loading}
                            >
                                {loading
                                    ? "Saving..."
                                    : "Save Student"}
                            </button>

                            <button
                                type="button"
                                className="cancel-student-btn"
                                onClick={() =>
                                    navigate(
                                        "/dashboard/students"
                                    )
                                }
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default AddStudent;