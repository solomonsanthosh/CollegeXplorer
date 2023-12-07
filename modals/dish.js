const mongoose = require("mongoose")

const dishSchema = new mongoose.Schema({
	dishName: { type: String, required: true },
	restaurant: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Restaurant",
		required: true,
	},
	dishDescription: { type: String },
	dishImage: { type: String },
	dishPrice: { type: Number, required: true },
	isDishAvailable: { type: Boolean, default: true },
})
const Dish = mongoose.model("Dish", dishSchema)

module.exports = Dish
