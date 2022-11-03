const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
  },
  token: { type: String },
  resetToken: String,
  emailVerified: Boolean,
});

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = async (providedPass, dbPass) => {
  console.log("compare pass method: passwords are", providedPass, dbPass);

  return await bcrypt.compare(providedPass, dbPass);
};

userSchema.methods.generateToken = async function (expiration, dbField) {
  const user = this;

  const token = jwt.sign({ id: user._id.toHexString() }, process.env.SECRET, {
    expiresIn: expiration,
  });

  if (dbField) {
    user[dbField] = token;
    await user.save();
    return user;
  } else {
    return token;
  }
};

userSchema.statics.getPayload = async (token) => {
  try {
    return jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return error.message;
  }
};

module.exports = mongoose.model("User", userSchema);
