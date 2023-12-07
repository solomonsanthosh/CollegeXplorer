const mongoose = require("mongoose")

const restaurantSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
	loc: { type: String }, // You might want to use a more appropriate type for location
	dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
	isOpened: { type: Boolean, default: true },
})

const Restaurant = mongoose.model("Restaurant", restaurantSchema)

module.exports = Restaurant
