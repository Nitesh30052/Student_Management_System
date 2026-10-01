import { useNavigate } from "react-router-dom";

function StudentTable({ students, onStudentDeleted }) {

    const navigate = useNavigate();

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const token = localStorage.getItem("token");

            if (!token) {
                alert("You are not logged in.");
                return;
            }

            const response = await fetch(
                `https://student-management-system-30i5.onrender.com/api/students/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to delete student"
                );
            }

            alert("Student deleted successfully!");

            if (onStudentDeleted) {
                onStudentDeleted();
            }

        } catch (error) {

            console.error(
                "Delete student error:",
                error
            );

            alert(error.message);
        }
    };


    return (

        <table className="students-table">

            <thead>

                <tr>

                    <th>ID</th>

                    <th>Name</th>

                    <th>Email</th>

                    <th>Department</th>

                    <th>Actions</th>

                </tr>

            </thead>


            <tbody>

                {students.length === 0 ? (

                    <tr>

                        <td
                            colSpan="5"
                            className="text-center"
                        >
                            No students found.
                        </td>

                    </tr>

                ) : (

                    students.map((student) => (

                        <tr key={student.id}>

                            <td>
                                {student.id}
                            </td>


                            <td>
                                {student.name}
                            </td>


                            <td>
                                {student.email}
                            </td>


                            <td>
                                {student.department}
                            </td>


                            <td>

                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={() =>
                                        navigate(
                                            `/dashboard/edit-student/${student.id}`
                                        )
                                    }
                                >
                                    Edit
                                </button>


                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() =>
                                        handleDelete(
                                            student.id
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))

                )}

            </tbody>

        </table>
    );
}

export default StudentTable;