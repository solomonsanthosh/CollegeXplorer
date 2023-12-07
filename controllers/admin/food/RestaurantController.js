const Restaurant = require("../../../modals/restaurant")

// Create a new restaurant
const createRestaurant = async (req, res) => {
	try {
		const { name, description, loc, dishes, isOpened } = req.body
		const newRestaurant = new Restaurant({
			name: name,
			description: description,
			loc: loc,
			dishes: dishes,
			isOpened: isOpened,
		})
		const savedRestaurant = await newRestaurant.save()
		// console.log("Restaurant created:", savedRestaurant)
		res.json(savedRestaurant)
	} catch (error) {
		console.error("Error creating restaurant:", error)
	}
}

// Read all restaurants
const getAllRestaurants = async (req, res) => {
	try {
		const restaurants = await Restaurant.find().populate("dishes")
		// console.log("All restaurants:", restaurants)
		res.json(restaurants)
	} catch (error) {
		console.error("Error retrieving restaurants:", error)
	}
}

// Update a restaurant by ID
const updateRestaurant = async (req, res) => {
	try {
		const { name, description, loc, dishes, isOpened } = req.body
		const id = req.params.id
		const updatedRestaurant = await Restaurant.findByIdAndUpdate(
			id,
			{
				name: name,
				description: description,
				loc: loc,
				dishes: dishes,
				isOpened: isOpened,
			},
			{ new: true }
		)
		// console.log("Updated restaurant:", updatedRestaurant)
		res.json(updatedRestaurant)
	} catch (error) {
		console.error("Error updating restaurant:", error)
	}
}

// Delete a restaurant by ID
const deleteRestaurant = async (req, res) => {
	try {
		const id = req.params.id
		const deletedRestaurant = await Restaurant.findByIdAndDelete(id)
		// console.log("Deleted restaurant:", deletedRestaurant)
		res.json(deletedRestaurant)
	} catch (error) {
		console.error("Error deleting restaurant:", error)
	}
}

module.exports = {
	createRestaurant,
	getAllRestaurants,
	updateRestaurant,
	deleteRestaurant,
}
