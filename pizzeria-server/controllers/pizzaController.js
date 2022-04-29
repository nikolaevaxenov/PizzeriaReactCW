const pizzaModel = require("../model/pizzaModel");

const getAllPizzas = async (req, res) => {
  return res.json(await pizzaModel.findAll());
};

const createNewPizza = async (req, res) => {
  try {
    const result = await pizzaModel.create({
      title: req.body.title,
      ingredients: req.body.ingredients,
      photo: req.body.photo,
      price_26: req.body.price_26,
      price_30: req.body.price_30,
      price_40: req.body.price_40,
    });
    return res.status(201).json({ message: `New pizza id=${result.id} added` });
  } catch (err) {
    return res.status(208).json({ message: `${err}` });
  }
};

const updatePizza = async (req, res) => {
  const result = await pizzaModel.update(
    {
      title: req.body.title,
      ingredients: req.body.ingredients,
      photo: req.body.photo,
      price_26: req.body.price_26,
      price_30: req.body.price_30,
      price_40: req.body.price_40,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  );
  if (result[0] === 0) {
    return res
      .status(400)
      .json({ message: `Pizza ID ${req.body.id} not found` });
  }
  return res
    .status(201)
    .json({ message: `Pizza with id=${req.body.id} updated` });
};

const deletePizza = async (req, res) => {
  const result = await pizzaModel.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (!result) {
    return res
      .status(400)
      .json({ message: `Pizza ID ${req.params.id} not found` });
  }
  return res
    .status(201)
    .json({ message: `Pizza ID ${req.params.id} successfully deleted` });
};

const getPizza = async (req, res) => {
  const result = await pizzaModel.findAll({
    where: {
      id: req.params.id,
    },
  });
  if (result.length === 0) {
    return res
      .status(400)
      .json({ message: `Pizza ID ${req.params.id} not found` });
  }
  return res.status(201).json(result);
};

module.exports = {
  getAllPizzas,
  createNewPizza,
  updatePizza,
  deletePizza,
  getPizza,
};
