const express = require("express");

const {
  getStudents,
  getStudent,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getStudents);

router.get("/:id", authMiddleware, getStudent);

router.post("/", authMiddleware, addStudent);

router.put("/:id", authMiddleware, updateStudent);

router.delete("/:id", authMiddleware, deleteStudent);

module.exports = router;