const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "customer", "seller"],
      message: "{VALUE} is not supported",
    },
    default: "customer",
  },
  mobile: {
    type: Number,
    min: [10, "Enter a valid mobile number"],
  },
  otp: {
    type: Number,
  },
  otpExpiry: {
    type: Date,
  },
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;