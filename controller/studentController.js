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

module.exports = { getStudents };
