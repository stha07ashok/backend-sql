const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mySqlPool = require("./config/db");

//configure dotenv
dotenv.config();

//rest objext
const app = express();

//middlewares
app.use(express.json);
app.use(morgan("dev"));

//routes
app.use("/api/v1/student", require("./routes/studentRoutes"));

app.get("/test", (req, res) => {
  res.status(200).send("<h1>nodejs mysql app</h1>");
});

//port
const port = process.env.PORT || 8000;

//conditionally listen
mySqlPool
  .query("SELECT 1")
  .then(() => {
    //mysql
    console.log("MySQL DB Connected".bgCyan.white);
    //listen
    app.listen(port, () => {
      console.log(
        `Server is running on port ${process.env.PORT}`.bgMagenta.white
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
