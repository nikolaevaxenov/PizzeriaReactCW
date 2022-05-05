const express = require("express");
const router = express.Router();
const cardController = require("../controllers/cardController");

router
  .route("/:id")
  .get(cardController.getCard)
  .post(cardController.createCard)
  .put(cardController.updateCard)
  .delete(cardController.deleteCard);

module.exports = router;
