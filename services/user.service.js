const UserModel = require("../models/user.model");

async function userSignupService(userData) {
  const user = await UserModel.create(userData);
  if (user) {
    return {
      success: true,
      message: "✅User Registered",
      data: user,
    };
  } else {
    return {
      success: false,
      message: "⚠️User is not Registered",
    };
  }
}

async function findUserByMailService(email) {
  const user = await UserModel.findOne({ email });

  if (user) {
    return {
      success: true,
      message: "✅ Valid Email",
      data: user,
    };
  } else {
    return {
      success: false,
      message: "⚠️Invalid Email",
    };
  }
}

async function getAllUserService() {
  const users = await UserModel.find();
  if (users.length) {
    return {
      success: true,
      message: "✅All Users found",
      data: users,
    };
  } else {
    return {
      success: false,
      message: "⚠️No users found",
    };
  }
}

async function getUserService(id) {
  const user = await UserModel.findById(id);
  if (user) {
    return {
      success: true,
      message: "✅User found",
      data: user,
    };
  } else {
    return {
      success: false,
      message: "⚠️No user found",
    };
  }
}

async function updateUserService(id, updatedUserData) {
  const user = await UserModel.findByIdAndUpdate(id, updatedUserData, {
    new: true,
  });
  if (user) {
    return {
      success: true,
      message: "✅User is updated",
      data: user,
    };
  } else {
    return {
      success: false,
      message: "⚠️User is not updated",
    };
  }
}

async function deleteUserService(id) {
  const deletedUser = await UserModel.findByIdAndDelete(id);

  if (deletedUser) {
    return {
      success: true,
      message: "✅User is deleted",
      data: deletedUser,
    };
  } else {
    return {
      success: false,
      message: "⚠️User is not deleted",
    };
  }
}

module.exports = {
  userSignupService,
  findUserByMailService,
  getAllUserService,
  getUserService,
  updateUserService,
  deleteUserService,
};
