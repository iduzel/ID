const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/users", require("./controllers/userController"));

const connectDB = require("./config/db");
connectDB();

app.use("/", (req, res) => {
  res.send("HELLO FROM SERVER.JS");
});
app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.render("error");
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}`));
