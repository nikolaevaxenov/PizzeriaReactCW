const express = require("express");
const router = express.Router();
const usersController = require("../controllers/userController");

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser)
  .put(usersController.updateUser);

router
  .route("/:id")
  .get(usersController.getUser)
  .delete(usersController.deleteUser);

module.exports = router;
