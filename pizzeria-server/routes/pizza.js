const express = require("express");
const router = express.Router();
const pizzaController = require("../controllers/pizzaController");

router
  .route("/")
  .get(pizzaController.getAllPizzas)
  .post(pizzaController.createNewPizza)
  .put(pizzaController.updatePizza);

router
  .route("/:id")
  .get(pizzaController.getPizza)
  .delete(pizzaController.deletePizza);

module.exports = router;
