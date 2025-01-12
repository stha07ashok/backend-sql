const express = require("express");
const { getStudents } = require("../controller/studentController");

//router object
const router = express.Router();

//routes
//get all students list
router.get("getall", getStudents);

module.exports = router;
