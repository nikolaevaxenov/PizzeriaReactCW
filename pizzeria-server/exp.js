const orderModel = require("./model/orderModel");
const orderPizzaModel = require("./model/orderPizzaModel");
const pizzaModel = require("./model/pizzaModel");

const getPizzaCost = async () => {
	let totalPrice = 0;
	
	const sizes = await orderPizzaModel.findAll({
		attributes: ['size', 'PizzaId'],
		where: {
			OrderId: 3
		}
	});
	
	for (const size of sizes) {
		const pizza = await orderPizzaModel.findAll({
			include: {
				model: pizzaModel,
				attributes: [[`price_${size.size}`, 'price']]
			},
			where: {
				OrderId: 3,
				PizzaId: size.PizzaId
			}
		});
		totalPrice += pizza[0].Pizza.dataValues.price * pizza[0].quantity;
	}
	
	return totalPrice;
};

getPizzaCost().then((res) => {
	console.log(res);
});
