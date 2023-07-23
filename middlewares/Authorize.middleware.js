const jwt = require("jsonwebtoken");
require("dotenv").config();

const Authorize = (roles) => async (req, res, next) => {
  console.log("roles", roles);

  let token = await req.headers.authorization;
  console.log("token: ", token);

  if (!token) {
    return res.status(404).send({
      success: false,
      message: "Token not found",
    });
  }

  console.log("token: ", token);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_TEXT);

    if (!payload) {
      return res.status(500).send({
        success: false,
        message: "⚠️Invalid Token",
      });
    }
    console.log("payload: ", payload);

    let authorizeStatus = false;
    for (let i = 0; i < roles.length; i++) {
      if (payload.role === roles[i]) {
        authorizeStatus = true;
        break;
      }
    }

    if (!authorizeStatus) {
      return res.status(401).send({
        success: false,
        message: "⚠️Unauthorized Access",
      });
    }

    req.user = payload;
    next();
  } catch (err) {
    console.log("Error while verifying the token", err);
    return res.status(401).send("Invalid Token");
  }
};

module.exports = Authorize;
