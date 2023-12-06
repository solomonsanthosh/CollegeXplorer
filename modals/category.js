const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
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
})

const Category = mongoose.model("Category", categorySchema)

module.exports = Category
