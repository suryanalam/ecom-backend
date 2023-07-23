const {
  userLoginController,
  userSignupController,
  forgotPasswordController,
  resetPasswordController,
  getAllUserController,
  getUserController,
  updateUserController,
  deleteUserController,
} = require("../controllers/user.controller");
const express = require("express");
const Authorize = require("../middlewares/Authorize.middleware");

const userRouter = express.Router();

userRouter.post("/login", userLoginController);
userRouter.post("/signup", userSignupController);
userRouter.post("/forgot-password", forgotPasswordController);
userRouter.post("/reset-password", resetPasswordController);
userRouter.get("/users", Authorize(["admin"]), getAllUserController);
userRouter.get(
  "/user/:id",
  Authorize(["admin", "customer"]),
  getUserController
);
userRouter.put(
  "/user/:id",
  Authorize(["admin", "customer"]),
  updateUserController
);
userRouter.delete(
  "/user/:id",
  Authorize(["admin", "customer"]),
  deleteUserController
);

module.exports = userRouter;
