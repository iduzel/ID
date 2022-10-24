const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");

router.post("/register", async (req, res) => {
  try {
    console.log("req.body: ", req.body);

    const { email, password } = req.body;

    if(!email || !password) {
        res.send({success: false, error: 'Email or Password is empty'})
    };

    const newUser = new User(req.body);
    const user = await newUser.save();
    res.send({success:true, user})
  } catch (error) {
    console.log("EM: ", error.message);
  }
});

module.exports = router;
