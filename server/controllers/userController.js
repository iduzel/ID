const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");

const sendEmail = require("../testmail.js");

const verifyNumber = "";

// REGISTER
let userBody = {};
let userEmail = "";
let userPassword = "";
let n = null;

router.post("/register", async (req, res) => {
  const sixDigit = () => Math.floor(Math.random() * 900000) + 100000;

  const { email, password } = req.body;
  userBody = req.body;
  userEmail = email;
  userPassword = password;

  try {
    n = sixDigit();

    const html = `<h1>${n}</h1>`;
    sendEmail(email, "Email Verification", "Email verify", html);
    setTimeout(() => (n = null), 90000);
  } catch (error) {
    res.status(500).json(error.message);
    console.log("EM: ", error.message);
  }
});

// VERIFY REGISTER
router.post("/verify", async (req, res) => {
  try {
    const { number } = req.body;

    if (number == n) {
      const user = new User(userBody);
      user.emailVerified = true;
      user.save();

      res.send({ success: true, user });
    } else {
      res.send({ success: false, message: "Enter the correct code" });
      console.log("Wrong code");
    }
  } catch (error) {
    console.log(error.message);
  }
});

// FORGOT PASSWORD

router.post("/forgotPassword", async (req, res) => {
  try {
    const email2 = req.body.name;
    console.log("email2 FP : ", email2);

    const getUser = await User.findOne({
      $or: [{ email: email2 }],
    });

    if (!getUser) return console.log("No such an email registered");
    
    res.send({success:true})
  } catch (error) {}
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    console.log("login req.body: ", req.body);

    // get user from client side
    const { email, password } = req.body;
    if (!email || !password) return res.send({ success: false, errorId: 1 });

    // find user in db
    let user = await User.findOne({
      $or: [{ email }],
    }).select("-__v");
    console.log("Login: user is", user);
    if (!user)
      return res.send({ success: false }, console.log("user not found"));

    // compare userClient pass and userServer pass
    const passMatch = await user.comparePassword(password, user.password);
    console.log(" passmatch is", passMatch);

    if (!passMatch) return res.send({ success: false, errorId: 3 });

    const token = await user.generateToken("1d");

    user = user.toObject();
    delete user.pass;
    delete user.token;

    res.cookie("cookieId", token).send({ success: true, user });
    
  } catch (error) {
    console.log("LOGIN ERROR:", error.message);
    res.send(error.message);
  }
});


module.exports = router;
