const router = require("express").Router()

const {
	createRestaurant,
	getAllRestaurants,
	updateRestaurant,
	deleteRestaurant,
} = require("../../../controllers/admin/food/RestaurantController")

// Create a new restaurant
router.post("/restaurant/insert", createRestaurant)

// Read all restaurants
router.get("/restaurant/all", getAllRestaurants)

// Update a restaurant by ID
router.put("/restaurant/update/:id", updateRestaurant)

// Delete a restaurant by ID
router.delete("/restaurant/delete/:id", deleteRestaurant)

module.exports = router
