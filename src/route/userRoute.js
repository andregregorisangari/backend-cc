const express = require("express");
const { userValidate } = require("../validation/userSchema.js");
const { passwordValidate } = require("../validation/passwordSchema.js");
const { validate } = require("../middleware/validate.js");
const auth = require("../middleware/authentication.js");
const limiter = require("../middleware/rateLimitter.js");
// Importing userController
const {
  getByTokenUser,
  updateUser,
  changePassword,
  deleteUser,
} = require("../controller/userController.js");

const router = express.Router();

// ENDPOINT API

// GET DATA BY ID
router.get("/users", auth, limiter, getByTokenUser);

// UPDATE DATA
router.put("/users", auth, limiter, validate(userValidate), updateUser);

// Change Password
router.put(
  "/users/changePassword",
  auth,
  limiter,
  validate(passwordValidate),
  changePassword
);

// DELETE USER
router.delete("/users/:user_id", auth, limiter, deleteUser);

module.exports = router;
