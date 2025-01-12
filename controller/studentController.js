const db = require("../config/db");

//get all students list
const getStudents = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM students");
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No records found",
      });
    }
    res.status(200).send({
      success: true,
      message: "all students records",
      totalStudents: data[0].length,
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      massage: "Error in get all student api",
      error,
    });
  }
};

//get student by id
const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "Invalid or provide student id",
      });
    }
    const data = await db.query(`SELECT * FROM students WHERE id=?`, [
      studentId,
    ]);
    if (!data) {
      return res.status(400).send({
        success: false,
        message: "no records found",
      });
    }
    res.status(200).send({
      success: true,
      studentDetails: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      massage: "Error in getting student by id",
      error,
    });
  }
};

const createStudent = async (req, res) => {
  try {
    const { name, roll_no, medium, fees } = req.body;
    if (!name || !roll_no || !medium || !fees) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields",
      });
    } else {
      const data = await db.query(
        "INSERT INTO students (name, roll_no,  medium, fees) VALUES (?, ?, ?,  ?)",
        [name, roll_no, fees, medium]
      );
      res.status(201).send({
        success: true,
        message: "Student created successfully",
        studentId: data.insertId,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      massage: "Error in create student api",
      error,
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "invalid id or provide id",
      });
    }
    const [name, roll_no, fees, medium] = req.body;
    const data = await db.query(
      `UPDATE students SET name =?, roll_no=?, fees=?, medium=?, `,
      [name, roll_no, fees, medium, studentId]
    );
    if (!data) {
      return res.status(500).send({
        success: true,
        message: "error in update data",
      });
    }
    res.status(200).send({
      success: true,
      message: "student details update",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      massage: "Error in update student api",
      error,
    });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "please provide student if or valid student id",
      });
    }
    await db.query(`DELETE FROM students WHERE id = ?`, [studentId]);
    res.status(202).send({
      success: true,
      message: "student deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      massage: "Error in delete student api",
      error,
    });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
