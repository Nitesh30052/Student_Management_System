import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import StudentTable from "../components/StudentTable";
import { Link } from "react-router-dom";
import { FaSearch, FaFilter } from "react-icons/fa";

import "../styles/students.css";

function Students() {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [department, setDepartment] = useState("All");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =========================================
    // FETCH STUDENTS
    // =========================================

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
                "https://student-management-system-30i5.onrender.com/api/students",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to fetch students"
                );
            }

            setStudents(data);
            setFilteredStudents(data);

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


    // =========================================
    // INITIAL LOAD
    // =========================================

    useEffect(() => {
        fetchStudents();
    }, []);


    // =========================================
    // SEARCH + DEPARTMENT FILTER
    // =========================================

    useEffect(() => {
        let result = [...students];

        const search = searchTerm
            .trim()
            .toLowerCase();

        // Search
        if (search !== "") {

            result = result.filter((student) => {

                const studentId = String(
                    student.id ??
                    student.student_id ??
                    ""
                ).toLowerCase();

                const studentName = String(
                    student.name ?? ""
                ).toLowerCase();

                const studentEmail = String(
                    student.email ?? ""
                ).toLowerCase();

                const studentDepartment = String(
                    student.department ?? ""
                ).toLowerCase();

                return (
                    studentId.includes(search) ||
                    studentName.includes(search) ||
                    studentEmail.includes(search) ||
                    studentDepartment.includes(search)
                );
            });
        }


        // Department filter
        if (department !== "All") {

            result = result.filter(
                (student) =>
                    String(student.department) ===
                    String(department)
            );
        }


        setFilteredStudents(result);

    }, [
        searchTerm,
        department,
        students,
    ]);


    // =========================================
    // DEPARTMENTS
    // =========================================

    const departments = [
        ...new Set(
            students
                .map(
                    (student) =>
                        student.department
                )
                .filter(Boolean)
        ),
    ];


    // =========================================
    // CLEAR FILTERS
    // =========================================

    const clearFilters = () => {
        setSearchTerm("");
        setDepartment("All");
    };


    return (
        <DashboardLayout>

            {/* IMPORTANT:
                This container was missing before.
            */}

            <div className="students-container">


                {/* =================================
                    HEADER
                ================================= */}

                <div className="students-header">

                    <div className="students-header-content">

                        <h2>
                            Student Management
                        </h2>

                        <div className="students-title-line"></div>

                        <p>
                            Manage student records efficiently.
                        </p>

                    </div>


                    <Link
                        to="/dashboard/add-student"
                        className="add-student-page-btn"
                    >
                        + Add Student
                    </Link>

                </div>


                {/* =================================
                    SEARCH + FILTER
                ================================= */}

                <div className="students-search-area">


                    {/* SEARCH */}

                    <div className="student-search-box">

                        <FaSearch className="student-search-icon" />

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(
                                    e.target.value
                                )
                            }
                            placeholder="Search by ID, name, email or department"
                        />

                    </div>


                    {/* DEPARTMENT */}

                    <div className="student-filter-box">

                        <FaFilter className="student-filter-icon" />

                        <select
                            value={department}
                            onChange={(e) =>
                                setDepartment(
                                    e.target.value
                                )
                            }
                        >

                            <option value="All">
                                All Departments
                            </option>

                            {departments.map(
                                (dept) => (
                                    <option
                                        key={dept}
                                        value={dept}
                                    >
                                        {dept}
                                    </option>
                                )
                            )}

                        </select>

                    </div>

                </div>


                {/* =================================
                    RESULT INFORMATION
                ================================= */}

                {!loading && !error && (

                    <div className="students-result-bar">

                        <p>
                            Showing{" "}
                            <strong>
                                {filteredStudents.length}
                            </strong>{" "}
                            of{" "}
                            <strong>
                                {students.length}
                            </strong>{" "}
                            students
                        </p>


                        {(searchTerm ||
                            department !== "All") && (

                            <button
                                type="button"
                                onClick={clearFilters}
                                className="clear-filters-btn"
                            >
                                Clear Filters
                            </button>

                        )}

                    </div>

                )}


                {/* =================================
                    LOADING
                ================================= */}

                {loading && (

                    <div className="students-message">
                        Loading students...
                    </div>

                )}


                {/* =================================
                    ERROR
                ================================= */}

                {error && (

                    <div className="students-error">
                        {error}
                    </div>

                )}


                {/* =================================
                    TABLE
                ================================= */}

                {!loading && !error && (

                    <div className="students-table-wrapper">

                        <StudentTable
                            students={filteredStudents}
                            onStudentDeleted={
                                fetchStudents
                            }
                        />

                    </div>

                )}

            </div>

        </DashboardLayout>
    );
}

export default Students;