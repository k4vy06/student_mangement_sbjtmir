const express = require("express");
const router = express.Router();
const {
  getStudents,
  getStats,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

router.get("/", getStudents);
router.get("/stats", getStats);
router.post("/", addStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
