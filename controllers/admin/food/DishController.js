const Dish = require("../../../modals/dish") // Replace with the actual path to your model file

// Create a new dish
const createDish = async (req, res) => {
	try {
		const {
			dishName,
			restaurant,
			dishDescription,
			dishImage,
			dishPrice,
			isDishAvailable,
		} = req.body
		const newDish = new Dish({
			dishName: dishName,
			restaurant: restaurant,
			dishDescription: dishDescription,
			dishImage: dishImage,
			dishPrice: dishPrice,
			isDishAvailable: isDishAvailable,
		})

		const savedDish = await newDish.save()
		console.log("Dish created:", savedDish)
		res.json(savedDish)
	} catch (error) {
		console.error("Error creating dish:", error)
	}
}

// Read all dishes
const getAllDishes = async (req, res) => {
	try {
		const dishes = await Dish.find().populate("restaurant")
		console.log("All dishes:", dishes)
		res.json(dishes)
	} catch (error) {
		console.error("Error retrieving dishes:", error)
	}
}

// Update a dish by ID
const updateDish = async (req, res) => {
	try {
		const id = req.params.id
		const {
			dishName,
			restaurant,
			dishDescription,
			dishImage,
			dishPrice,
			isDishAvailable,
		} = req.body
		const updatedDish = await Dish.findByIdAndUpdate(
			id,
			{
				dishName: dishName,
				restaurant: restaurant,
				dishDescription: dishDescription,
				dishImage: dishImage,
				dishPrice: dishPrice,
				isDishAvailable: isDishAvailable,
			},
			{ new: true }
		)

		console.log("Updated dish:", updatedDish)
		res.json(updatedDish)
	} catch (error) {
		console.error("Error updating dish:", error)
	}
}

// Delete a dish by ID
const deleteDish = async (req, res) => {
	try {
		const id = req.params.id
		const deletedDish = await Dish.findByIdAndDelete(id)
		console.log("Deleted dish:", deletedDish)
		res.json(deletedDish)
	} catch (error) {
		console.error("Error deleting dish:", error)
	}
}

module.exports = {
	createDish,
	getAllDishes,
	updateDish,
	deleteDish,
}
