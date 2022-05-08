const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.route("/cartquantity/:id").get(orderController.getCartOrderQuantity);
router.route("/cartprice/:id").get(orderController.getCartOrderPrice);
router.route("/cartpizza/:id").get(orderController.getCartPizzas);

router
  .route("/cart/:id")
  .get(orderController.getCartOrder)
  .post(orderController.addToCart)
  .put(orderController.removeFromCart);

router
  .route("/:id")
  .get(orderController.getOrders)
  .put(orderController.createOrder);

module.exports = router;
