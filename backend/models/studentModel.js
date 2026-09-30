const db = require("../config/db");

// Get all students
const getAllStudents = async () => {
    const [rows] = await db.query(
        "SELECT * FROM students ORDER BY id ASC"
    );

    return rows;
};

// Get student by ID
const getStudentById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM students WHERE id = ?",
        [id]
    );

    return rows[0];
};

// Add student
const createStudent = async (name, email, department) => {
    const [result] = await db.query(
        "INSERT INTO students (name, email, department) VALUES (?, ?, ?)",
        [name, email, department]
    );

    return result.insertId;
};

// Update student
const updateStudent = async (id, name, email, department) => {
    const [result] = await db.query(
        `UPDATE students
         SET name = ?, email = ?, department = ?
         WHERE id = ?`,
        [name, email, department, id]
    );

    return result;
};

// Delete student
const deleteStudent = async (id) => {
    const [result] = await db.query(
        "DELETE FROM students WHERE id = ?",
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