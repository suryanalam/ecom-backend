const {
  userSignupService,
  getAllUserService,
  getUserService,
  updateUserService,
  findUserByMailService,
  deleteUserService,
} = require("../services/user.service");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const sendEmail = require("../utils/email");

//variables:
const JWT_SECRET_TEXT = config.JWT_SECRET_TEXT;

async function userSignupController(req, res) {
  let { name, email, password, role, mobile } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({
      success: false,
      message: "name, email, and password are required fields",
    });
  }

  let userExist = await findUserByMailService(email);

  if (userExist.success) {
    return res.status(409).send({
      success: false,
      message: "User already exist",
    });
  }

  //Password Encryption:
  password = await bcrypt.hash(password, 10);
  if (!password) {
    return res.status(400).send({
      success: false,
      message: "password not generated",
    });
  }

  //Username:
  let username = email.split("@")[0].toLowerCase();

  if (!username) {
    return res.status(400).send({
      success: false,
      message: "username not generated",
    });
  }

  const userData = { username, name, email, password, role, mobile };
  console.log("userData in controller ", userData);

  const serviceData = await userSignupService(userData);
  console.log("serviceData in controller ", serviceData);

  if (serviceData.success) {
    //Email Deatils:
    let userMail = serviceData.data.email;
    let subject = `Your are registered on GoKart website`;
    let emailBody = {
      name: serviceData.data.name,
      desc1:
        "Thank you for registering on our website! We're excited to have you as a member of our community.",
      desc2:
        "We hope you enjoy using our website and find everything you're looking for. If you have any questions or need help with anything, please don't hesitate to contact us.",
    };

    await sendEmail(userMail, subject, emailBody);
    return res.status(200).send({
      success: true,
      message: serviceData.message,
      data: serviceData.data,
    });
  } else {
    return res.status(500).send({
      success: false,
      message: serviceData.message,
    });
  }
}

async function userLoginController(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      success: false,
      message: "email, and password are required fields",
    });
  }

  const serviceData = await findUserByMailService(email);

  //if user not found
  if (!serviceData.success) {
    return res.status(500).send({
      success: false,
      message: serviceData.message,
    });
  }

  const userData = serviceData.data;

  const validPass = bcrypt.compare(password, userData.password); //true or false

  //if password not matched
  if (!validPass) {
    return res.status(500).send({
      success: false,
      message: "⚠️Invalid Password",
    });
  }

  const jwtToken = jwt.sign(
    //payload:
    {
      _id: userData._id,
      username: userData.username,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      mobile: userData.mobile,
    },
    //secret key:
    JWT_SECRET_TEXT,
    //options [expire time]:
    { expiresIn: "1h" }
  );

  if (!jwtToken) {
    return res.status(500).send({
      success: false,
      message: "⚠️Error while generating JWT Token",
    });
  }
  console.log("jwtToken: ", jwtToken);

  res.status(200).send({
    success: true,
    message: "✅ User Authenticated as " + userData.role + " successfully",
    token: jwtToken,
  });
}

async function forgotPasswordController(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({
      success: false,
      message: "email is required field",
    });
  }

  const validUser = await findUserByMailService(email);

  if (!validUser.success) {
    return res.status(500).send({
      success: false,
      message: validUser.message,
    });
  }

  const userData = validUser.data;

  const password = null;
  const otp = Math.floor(1000 + Math.random() * 9000); //4 digit otp
  const otpExpiry = new Date(new Date().getTime() + 15 * 60 * 1000); //15 minutes expiry time
  console.log("otp: ", otp);
  console.log("otpExpiry: ", otpExpiry);

  const updatedUserData = { otp, otpExpiry, password };
  const serviceData = await updateUserService(userData._id, updatedUserData);
  console.log("serviceData in controller ", serviceData);

  if (serviceData.success) {
    //Email Deatils:
    const userMail = serviceData.data.email;
    const subject = `OTP for Reset Password`;
    const emailBody = {
      name: serviceData.data.name,
      desc1: `Your OTP for reset password is <b>${otp}</b>. This OTP is valid for 15 minutes only.`,
      desc2: `If you have not requested for reset password, please inform us immediately.`,
    };
    await sendEmail(userMail, subject, emailBody);
    return res.status(200).send({
      success: true,
      message: serviceData.message,
      data: serviceData.data,
    });
  } else {
    return res.status(500).send({
      success: false,
      message: serviceData.message,
    });
  }
}

async function resetPasswordController(req, res) {
  const { email, otp } = req.body;
  let { password } = req.body;

  if (!email || !otp || !password) {
    return res.status(400).send({
      success: false,
      message: "email, otp and password are required fields",
    });
  }

  const validUser = await findUserByMailService(email);

  if (!validUser.success) {
    return res.status(500).send({
      success: false,
      message: validUser.message,
    });
  }

  const userData = validUser.data;

  if (otp != userData.otp) {
    return res.status(500).send({
      success: false,
      message: "⚠️Invalid OTP",
    });
  }

  const currentTime = new Date();
  if (currentTime > userData.otpExpiry) {
    return res.status(500).send({
      success: false,
      message: "⚠️OTP Expired",
    });
  }

  password = await bcrypt.hash(password, 10);
  if (!password) {
    return res.status(400).send({
      success: false,
      message: "password not generated",
    });
  }

  const updatedUserData = {
    password,
    otp: null,
    otpExpiry: null,
  };

  const serviceData = await updateUserService(userData._id, updatedUserData);
  console.log("serviceData in controller ", serviceData);

  if (serviceData.success) {
    //Email Deatils:
    const userMail = serviceData.data.email;
    const subject = `Password Reset Successfully`;
    const emailBody = {
      name: serviceData.data.name,
      desc1: `you have updated your password successfully`,
      desc2:
        "Kindly login with your new password. Contact us if you have any queries.",
    };

    await sendEmail(userMail, subject, emailBody);
    return res.status(200).send({
      success: true,
      message: serviceData.message,
      data: serviceData.data,
    });
  } else {
    return res.status(500).send({
      success: false,
      message: serviceData.message,
    });
  }
}

async function getAllUserController(req, res) {
  const serviceData = await getAllUserService();
  console.log("serviceData in controller ", serviceData);

  if (serviceData.success) {
    return res.status(200).send({
      success: true,
      message: serviceData.message,
      data: serviceData.data,
    });
  } else {
    return res.status(500).send({
      success: false,
      message: serviceData.message,
    });
  }
}

async function getUserController(req, res) {
  const id = req.params.id;

  //check if user is accessing his own data by using the login data in jwt token
  if (req.user.role == "customer" && id != req.user._id) {
    return res.status(401).send({
      success: false,
      message: "⚠️Unauthorized Access",
    });
  }

  const serviceData = await getUserService(id);
  console.log("serviceData in controller ", serviceData);

  if (serviceData.success) {
    res.status(200).send({
      success: true,
      message: serviceData.message,
      data: serviceData.data,
    });
  } else {
    res.status(500).send({
      success: false,
      message: serviceData.message,
    });
  }
}

async function updateUserController(req, res) {
  const id = req.params.id;
  const { name, email, password, mobile } = req.body;
  const updatedUserData = { name, email, mobile };

  //check if user is updating his own data by using the login data in jwt token
  if (id != req.user._id) {
    return res.status(401).send({
      success: false,
      message: "⚠️Unauthorized Access",
    });
  }

  // if email is updated then username has to be updated:
  if (email) {
    const username = email.split("@")[0].toLowerCase();
    updatedUserData.username = username;
  }

  // if password is updated then hash the password:
  if (password) {
    password = await bcrypt.hash(password, 10);
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "password not generated",
      });
    }
    updatedUserData.password = password;
  }

  const serviceData = await updateUserService(id, updatedUserData);
  console.log("serviceData in controller ", serviceData);

  if (serviceData.success) {
    return res.status(200).send({
      success: true,
      message: serviceData.message,
      data: serviceData.data,
    });
  } else {
    return res.status(500).send({
      success: false,
      message: serviceData.message,
    });
  }
}

async function deleteUserController(req, res) {
  const id = req.params.id;

  //check if user is deleting his own data by using the login data in jwt token
  if (id != req.user._id) {
    return res.status(401).send({
      success: false,
      message: "⚠️Unauthorized Access",
    });
  }

  const serviceData = await deleteUserService(id);

  if (serviceData.success) {
    return res.status(200).send({
      success: true,
      message: serviceData.message,
      data: serviceData.data,
    });
  } else {
    return res.status(500).send({
      success: false,
      message: serviceData.message,
    });
  }
}

module.exports = {
  userSignupController,
  userLoginController,
  forgotPasswordController,
  resetPasswordController,
  getAllUserController,
  getUserController,
  updateUserController,
  deleteUserController,
};
