const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");

router
  .route("/:id")
  .get(addressController.getAddress)
  .post(addressController.createAddress)
  .put(addressController.updateAddress)
  .delete(addressController.deleteAddress);

module.exports = router;
