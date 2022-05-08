const orderModel = require("../model/orderModel");
const orderPizzaModel = require("../model/orderPizzaModel");
const pizzaModel = require("../model/pizzaModel");

const getCartOrder = async (req, res) => {
  try {
    const result = await orderModel.findOne({
      where: {
        UserId: req.params.id,
        status: "Cart",
      },
    });
    if (result === null) {
      const newCart = await orderModel.create({
        status: "Cart",
        UserId: req.params.id,
      });

      return res.status(201).json(newCart);
    }
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getCartOrderQuantity = async (req, res) => {
  try {
    const result = await orderPizzaModel.sum("quantity", {
      where: {
        OrderId: req.params.id,
      },
    });

    if (result === null) {
      return res.status(400).json(result);
    }
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getCartOrderPrice = async (req, res) => {
  try {
    let totalPrice = 0;

    const sizes = await orderPizzaModel.findAll({
      attributes: ["size", "PizzaId"],
      where: {
        OrderId: req.params.id,
      },
    });

    for (const size of sizes) {
      const pizza = await orderPizzaModel.findAll({
        include: {
          model: pizzaModel,
          attributes: [[`price_${size.size}`, "price"]],
        },
        where: {
          OrderId: req.params.id,
          PizzaId: size.PizzaId,
        },
      });
      totalPrice += pizza[0].Pizza.dataValues.price * pizza[0].quantity;
    }
    return res.status(201).json(totalPrice);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getCartPizzas = async (req, res) => {
  try {
    const result = await orderPizzaModel.findAll({
      include: {
        model: pizzaModel,
      },
      where: {
        OrderId: req.params.id,
      },
    });
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const result = await orderModel.findAll({
      where: {
        UserId: req.params.id,
      },
    });
    if (result.length === 0) {
      return res.status(400).json({ message: `Orders not found` });
    }
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const result = await orderPizzaModel.findOne({
      where: {
        OrderId: req.params.id,
        PizzaId: req.body.pizzaId,
        size: req.body.size,
      },
    });
    if (result === null) {
      const newPizzaCart = await orderPizzaModel.create({
        OrderId: req.params.id,
        size: req.body.size,
        quantity: req.body.quantity,
        PizzaId: req.body.pizzaId,
      });

      return res.status(201).json(newPizzaCart);
    } else {
      const newQuantity = req.body.quantity + result.quantity;

      const updatedPizzaCart = await orderPizzaModel.update(
        {
          quantity: newQuantity,
        },
        {
          where: {
            OrderId: req.params.id,
            PizzaId: req.body.pizzaId,
            size: req.body.size,
          },
        }
      );

      return res.status(201).json(updatedPizzaCart);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const result = await orderPizzaModel.findOne({
      where: {
        OrderId: req.params.id,
        PizzaId: req.body.pizzaId,
        size: req.body.size,
      },
    });
    if (result === null) {
      return res.status(400).json({ message: `Pizza in cart not found` });
    } else {
      if (req.body.quantity === 2 || result.quantity === 1) {
        const deleteResult = await orderPizzaModel.destroy({
          where: {
            OrderId: req.params.id,
            PizzaId: req.body.pizzaId,
            size: req.body.size,
          },
        });

        if (!deleteResult) {
          return res
            .status(400)
            .json({ message: `OrderPizza ID ${req.params.id} not found` });
        }
        return res.status(201).json({
          message: `OrderPizza ID ${req.params.id} successfully deleted`,
        });
      } else {
        const newQuantity = result.quantity - 1;

        const updatedPizzaCart = await orderPizzaModel.update(
          {
            quantity: newQuantity,
          },
          {
            where: {
              OrderId: req.params.id,
              PizzaId: req.body.pizzaId,
              size: req.body.size,
            },
          }
        );

        return res.status(201).json(updatedPizzaCart);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const result = await orderModel.update(
      {
        status: "In Progress",
        comment: req.body.comment,
        AddressId: req.body.addressId,
        CardDetailId: req.body.cardDetailId,
      },
      {
        where: {
          UserId: req.params.id,
          status: "Cart",
        },
      }
    );
    if (result.length === 0) {
      return res.status(400).json({ message: `Order ID not found` });
    } else {
      return res.status(201).json(result);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCartOrder,
  getCartOrderQuantity,
  getCartOrderPrice,
  getCartPizzas,
  getOrders,
  addToCart,
  removeFromCart,
  createOrder,
};
