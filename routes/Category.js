const express = require("express")
const router = express.Router()

// Import the Mongoose model
const Category = require("../modals/category")

// Define the route to get categories
router.get("/categories", async (req, res) => {
	try {
		const categories = await getCategories()
		res.json(categories)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Internal Server Error" })
	}
})

// Helper function to fetch categories
const getCategories = async () => {
	try {
		const categories = await Category.find({}, "name description").exec()
		return categories
	} catch (error) {
		throw error
	}
}

module.exports = router
