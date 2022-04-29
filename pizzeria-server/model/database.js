const { Sequelize } = require("sequelize");
require("dotenv").config();

const addressModel = require("./addressModel");
const cardDetailModel = require("./cardDetailsModel");
const orderModel = require("./orderModel");
const orderPizzaModel = require("./orderPizzaModel");
const pizzaModel = require("./pizzaModel");
const userModel = require("./userModel.js");

const reCreateTables = async () => {
  await addressModel.sync({ force: true });
  await cardDetailModel.sync({ force: true });
  await orderModel.sync({ force: true });
  await orderPizzaModel.sync({ force: true });
  await pizzaModel.sync({ force: true });
  await userModel.sync({ force: true });
  console.log("All models were synchronized successfully.");
};

const getAllusers = async () => {
  const result = await userModel.findAll();
  console.log(JSON.stringify(result, null, 2));
};

const insertSampleValues = async () => {
  const user1 = await userModel.create({
    email: "testUser@tt.ru",
    password: "qwertyqw12",
    phone_number: 79998887777,
    first_name: "Иван",
    last_name: "Иванов",
    middle_name: "Иванович",
  });
  const user2 = await userModel.create({
    email: "testAdmin@tt.ru",
    password: "qwertyqw12",
    phone_number: 79998887777,
    first_name: "Админ",
    last_name: "Админов",
    middle_name: "Админович",
  });

  const pizza1 = await pizzaModel.create({
    title: "Пицца Пепперони",
    ingredients: 'Пицца соус, Сыр "Моцарелла", Колбаса "Пепперони"',
    photo: "1-pepperoni.jpg",
    price_26: 459,
    price_30: 619,
    price_40: 839,
  });
  const pizza2 = await pizzaModel.create({
    title: "Пицца Барбекю",
    ingredients:
      'Соус "Техасский барбекю", Сыр "Моцарелла", Колбаса "Пепперони", Ветчина, Бекон, Грудка куриная',
    photo: "2-bbq.jpg",
    price_26: 559,
    price_30: 739,
    price_40: 949,
  });
  const pizza3 = await pizzaModel.create({
    title: "Пицца 4 сыра",
    ingredients: 'Пицца соус, Сыр "Моцарелла", Смесь сыров',
    photo: "3-4cheese.jpg",
    price_26: 549,
    price_30: 719,
    price_40: 939,
  });
  const pizza4 = await pizzaModel.create({
    title: "Пицца Мясное Ассорти",
    ingredients:
      'Пицца соус, Сыр "Моцарелла", Помидоры, Говядина, Свинина, Грудка куриная, Бекон',
    photo: "4-meatassorti.jpg",
    price_26: 579,
    price_30: 809,
    price_40: 1089,
  });
  const pizza5 = await pizzaModel.create({
    title: "Пицца 4 вкуса",
    ingredients:
      'Пицца соус, Сыр "Моцарелла", Колбаса "Пепперони", Бекон, Перец "Халапеньо", Грудка куриная, Помидоры, Шампиньоны, Ветчина',
    photo: "5-4tastes.jpg",
    price_26: 499,
    price_30: 669,
    price_40: 879,
  });
  const pizza6 = await pizzaModel.create({
    title: "Пицца Гавайская",
    ingredients: 'Пицца соус, Сыр "Моцарелла", Ветчина, Ананасы',
    photo: "6-hawaiian.jpg",
    price_26: 429,
    price_30: 569,
    price_40: 779,
  });
  const pizza7 = await pizzaModel.create({
    title: "Пицца Классика",
    ingredients:
      'Пицца соус, Сыр "Моцарелла", Колбаса "Пепперони", Шампиньоны, Ветчина',
    photo: "7-classic.jpg",
    price_26: 449,
    price_30: 609,
    price_40: 839,
  });
  const pizza8 = await pizzaModel.create({
    title: "Пицца Домашняя",
    ingredients: 'Пицца соус, Сыр "Моцарелла", Шампиньоны, Ветчина, Помидоры',
    photo: "8-homy.jpg",
    price_26: 469,
    price_30: 639,
    price_40: 839,
  });

  const cardDetail1 = await cardDetailModel.create({
    UserId: 1,
    card_number: 5112235176558191,
    expiry_date: "12/24",
    cvc_code: 558,
  });

  const address1 = await addressModel.create({
    UserId: 1,
    city: "Москва",
    street: "Пушкина",
    house_number: "1",
    housing_number: "2",
    apartment_number: "333",
    intercom_code: "333*788",
  });

  const order1 = await orderModel.create({
    UserId: 1,
    AddressId: 1,
    CardDetailId: 1,
    status: "In Progress",
    comment: "As soon as possible",
  });
  const order2 = await orderModel.create({
    UserId: 1,
    AddressId: 1,
    CardDetailId: 1,
    status: "Done",
    comment: "As soon as possible",
  });

  const orderPizza1 = await orderPizzaModel.create({
    OrderId: 1,
    PizzaId: 1,
    size: 26,
    quantity: 1,
  });
  const orderPizza2 = await orderPizzaModel.create({
    OrderId: 1,
    PizzaId: 2,
    size: 30,
    quantity: 2,
  });
  const orderPizza3 = await orderPizzaModel.create({
    OrderId: 2,
    PizzaId: 3,
    size: 40,
    quantity: 3,
  });
};

//reCreateTables();
//getAllusers();
insertSampleValues();
