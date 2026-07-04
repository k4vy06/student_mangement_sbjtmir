const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    rollNo: {
      type: String,
      required: [true, "Roll Number is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    phone: {
      type: String,
      // Optional, since the current frontend doesn't send it, but defined for future-proofing
    },
    department: {
      type: String,
      required: [true, "Department is required"],
    },
    year: {
      type: String,
      required: [true, "Year is required"],
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Map _id to id to maintain frontend compatibility
studentSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
