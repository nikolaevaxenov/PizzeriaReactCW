const express = require("express");
const router = express.Router();
const usersController = require("../controllers/userController");
const validateToken = require("../middleware/jwtValidateToken");

router
  .route("/")
  .get(usersController.getAllUsers)
  .put(usersController.updateUser);

router.route("/registration").post(usersController.registerUser);

router.route("/login").post(usersController.loginUser);

router.route("/password").put(usersController.updatePasswordUser);

router
  .route("/:id")
  .get(usersController.getUser)
  .delete(usersController.deleteUser);

module.exports = router;
