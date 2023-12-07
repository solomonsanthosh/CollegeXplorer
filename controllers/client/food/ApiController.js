const Restaurant = require("../../../modals/restaurant")
const Dish = require("../../../modals/dish") 

const getAllRestaurants = async (req, res) => {
	try {
		const restaurants = await Restaurant.find().populate("dishes")
		// console.log("All restaurants:", restaurants)
		res.json(restaurants)
	} catch (error) {
		console.error("Error retrieving restaurants:", error)
	}
}

const getAllDishes = async (req, res) => {
	try {
		const dishes = await Dish.find().populate("restaurant")
		// console.log("All dishes:", dishes)
		res.json(dishes)
	} catch (error) {
		console.error("Error retrieving dishes:", error)
	}
}
module.exports = {
	getAllRestaurants,
	getAllDishes
}
