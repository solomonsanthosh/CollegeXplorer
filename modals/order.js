const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	items: [
		{
			dish: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Dish",
				required: true,
			},
			quantity: { type: Number, default: 1 },
		},
	],
})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order
