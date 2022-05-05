const addressModel = require("../model/addressModel");

const getAddress = async (req, res) => {
  try {
    const result = await addressModel.findAll({
      where: {
        UserId: req.params.id,
      },
    });
    if (result.length === 0) {
      return res.status(400).json({ message: `Addresses not found` });
    }
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const createAddress = async (req, res) => {
  const result = await addressModel.create({
    city: req.body.city,
    street: req.body.street,
    house_number: req.body.house_number,
    housing_number: req.body.housing_number,
    apartment_number: req.body.apartment_number,
    intercom_code: req.body.intercom_code,
    UserId: req.params.id,
  });
  return res.status(201).json({ message: `Address created` });
};

const updateAddress = async (req, res) => {
  const result = await addressModel.update(
    {
      city: req.body.city,
      street: req.body.street,
      house_number: req.body.house_number,
      housing_number: req.body.housing_number,
      apartment_number: req.body.apartment_number,
      intercom_code: req.body.intercom_code,
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
      .json({ message: `Address ID ${req.params.id} not found` });
  }
  return res
    .status(201)
    .json({ message: `Address with id=${req.params.id} updated` });
};

const deleteAddress = async (req, res) => {
  const result = await addressModel.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (!result) {
    return res
      .status(400)
      .json({ message: `Address ID ${req.params.id} not found` });
  }
  return res
    .status(201)
    .json({ message: `Address ID ${req.params.id} successfully deleted` });
};

module.exports = {
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress,
};
