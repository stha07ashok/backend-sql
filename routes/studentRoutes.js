const express = require("express");
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controller/studentController");

//router object
const router = express.Router();

//routes
//get all students list
router.get("/getall", getStudents);
//get student by id
router.get("/get/.id", getStudentById);
//create student || post
router.post("/create", createStudent);
//update students
router.post("/update/:id", updateStudent);
//delete students
router.delete("/delete/:id", deleteStudent);
module.exports = router;
