const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());

app.use("/users", require("./controllers/userController"));

const connectDB = require("./config/db");
connectDB();

app.use('/', (req, res) => {
    res.send('HELLO FROM SERVER.JS')
});
const port = process.env.PORT || 8080 
app.listen(port, () => console.log(`Server is running on port ${port}`));