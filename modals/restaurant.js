const mongoose = require("mongoose")

const restaurantSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		maxlength: 200,
	},
	image: {
		type: String, // Assuming you store the image URL as a string
	},
	lat: {
		type: Number,
	},
	lng: {
		type: Number,
	},
	address: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
		min: 1,
		max: 5,
	},
	reviews: {
		type: String,
	},
	type: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category", // Assuming your category model is named 'Category'
		required: true,
	},
	dishes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Dish", // Assuming your dish model is named 'Dish'
		},
	],
})

const Restaurant = mongoose.model("Restaurant", restaurantSchema)

module.exports = Restaurant
