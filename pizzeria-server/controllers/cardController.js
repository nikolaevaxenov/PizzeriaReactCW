const cardModel = require("../model/cardDetailsModel");

const getCard = async (req, res) => {
  try {
    const result = await cardModel.findAll({
      where: {
        UserId: req.params.id,
      },
    });
    if (result.length === 0) {
      return res.status(400).json({ message: `Cards not found` });
    }
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const createCard = async (req, res) => {
  const result = await cardModel.create({
    card_number: Number(req.body.card_number),
    expiry_date: req.body.expiry_date,
    cvc_code: Number(req.body.cvc_code),
    UserId: req.params.id,
  });
  return res.status(201).json({ message: `Card created` });
};

const updateCard = async (req, res) => {
  const result = await cardModel.update(
    {
      card_number: Number(req.body.card_number),
      expiry_date: req.body.expiry_date,
      cvc_code: Number(req.body.cvc_code),
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  if (result[0] === 0) {
    return res
      .status(400)
      .json({ message: `Card ID ${req.params.id} not found` });
  }
  return res
    .status(201)
    .json({ message: `Card with id=${req.params.id} updated` });
};

const deleteCard = async (req, res) => {
  const result = await cardModel.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (!result) {
    return res
      .status(400)
      .json({ message: `Card ID ${req.params.id} not found` });
  }
  return res
    .status(201)
    .json({ message: `Card ID ${req.params.id} successfully deleted` });
};

module.exports = {
  getCard,
  createCard,
  updateCard,
  deleteCard,
};
