const {
	getAllRestaurants,
	getAllDishes,
} = require("../../../controllers/client/food/ApiController")

const router = require("express").Router()

// Read all restaurants
router.get("/restaurant", getAllRestaurants)

// Read all dishes
router.get("/dish", getAllDishes)

module.exports = router
