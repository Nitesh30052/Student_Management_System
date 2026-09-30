const db = require("../config/db");

// Get all students
const getAllStudents = async () => {
    const result = await db.query(
        "SELECT * FROM students ORDER BY id ASC"
    );

    return result.rows;
};

// Get student by ID
const getStudentById = async (id) => {
    const result = await db.query(
        "SELECT * FROM students WHERE id = $1",
        [id]
    );

    return result.rows[0];
};

// Add student
const createStudent = async (name, email, department) => {
    const result = await db.query(
        `INSERT INTO students (name, email, department)
         VALUES ($1, $2, $3)
         RETURNING id`,
        [name, email, department]
    );

    return result.rows[0].id;
};

// Update student
const updateStudent = async (id, name, email, department) => {
    const result = await db.query(
        `UPDATE students
         SET name = $1, email = $2, department = $3
         WHERE id = $4`,
        [name, email, department, id]
    );

    return result;
};

// Delete student
const deleteStudent = async (id) => {
    const result = await db.query(
        "DELETE FROM students WHERE id = $1",
        [id]
    );

    return result;
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
};