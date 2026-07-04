const Student = require("../models/Student");

const getStudents = async (req, res) => {
  try {
    const { search, department } = req.query;
    let query = {};

    if (department && department !== "") {
      query.department = new RegExp(`^${department}$`, "i");
    }

    if (search && search !== "") {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { rollNo: { $regex: search, $options: "i" } },
      ];
    }

    const students = await Student.find(query);
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch students." });
  }
};

const getStats = async (req, res) => {
  try {
    const total = await Student.countDocuments();
    const departments = await Student.distinct("department");
    res.status(200).json({
      success: true,
      data: { totalStudents: total, departments, totalDepartments: departments.length },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch stats." });
  }
};

const addStudent = async (req, res) => {
  try {
    const { name, rollNo, department, year, email, phone } = req.body;
    
    // The Mongoose schema handles validation, but we can catch duplicates early
    const existing = await Student.findOne({ rollNo: new RegExp(`^${rollNo}$`, "i") });
    if (existing) {
      return res.status(409).json({ success: false, message: "Roll number already exists." });
    }

    const student = await Student.create({ name, rollNo, department, year, email, phone });
    res.status(201).json({ success: true, message: "Student added successfully.", data: student });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: "Failed to add student." });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { name, rollNo, department, year, email, phone } = req.body;
    
    // Check if another student has the same rollNo
    if (rollNo) {
      const existing = await Student.findOne({ rollNo: new RegExp(`^${rollNo}$`, "i"), _id: { $ne: req.params.id } });
      if (existing) {
        return res.status(409).json({ success: false, message: "Roll number already exists for another student." });
      }
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, rollNo, department, year, email, phone },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    res.status(200).json({ success: true, message: "Student updated successfully.", data: student });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: "Failed to update student." });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    res.status(200).json({ success: true, message: "Student deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete student." });
  }
};

module.exports = { getStudents, getStats, addStudent, updateStudent, deleteStudent };