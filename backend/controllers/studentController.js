const studentModel = require("../models/studentModel");

// Get all students
const getStudents = async (req, res) => {
    try {
        const students = await studentModel.getAllStudents();

        res.status(200).json(students);

    } catch (error) {
        console.error("Error fetching students:", error);

        res.status(500).json({
            message: "Failed to fetch students",
        });
    }
};

// Get one student
const getStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await studentModel.getStudentById(id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
            });
        }

        res.status(200).json(student);

    } catch (error) {
        console.error("Error fetching student:", error);

        res.status(500).json({
            message: "Failed to fetch student",
        });
    }
};

// Add student
const addStudent = async (req, res) => {
    try {
        const { name, email, department } = req.body;

        if (!name || !email || !department) {
            return res.status(400).json({
                message: "Name, email and department are required",
            });
        }

        const studentId = await studentModel.createStudent(
            name,
            email,
            department
        );

        res.status(201).json({
            message: "Student added successfully",
            studentId: studentId,
        });

    } catch (error) {
        console.error("Error adding student:", error);

        res.status(500).json({
            message: "Failed to add student",
        });
    }
};

// Update student
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, department } = req.body;

        if (!name || !email || !department) {
            return res.status(400).json({
                message: "Name, email and department are required",
            });
        }

        const result = await studentModel.updateStudent(
            id,
            name,
            email,
            department
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Student not found",
            });
        }

        res.status(200).json({
            message: "Student updated successfully",
        });

    } catch (error) {
        console.error("Error updating student:", error);

        res.status(500).json({
            message: "Failed to update student",
        });
    }
};

// Delete student
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await studentModel.deleteStudent(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Student not found",
            });
        }

        res.status(200).json({
            message: "Student deleted successfully",
        });

    } catch (error) {
        console.error("Error deleting student:", error);

        res.status(500).json({
            message: "Failed to delete student",
        });
    }
};

module.exports = {
    getStudents,
    getStudent,
    addStudent,
    updateStudent,
    deleteStudent,
};