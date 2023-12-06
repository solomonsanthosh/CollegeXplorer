const mongoose = require("mongoose")

const featuredSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		maxlength: 200,
	},
	restaurants: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Restaurant", // Assuming your restaurant model is named 'Restaurant'
		},
	],
})

const Featured = mongoose.model("Featured", featuredSchema)

module.exports = Featured
