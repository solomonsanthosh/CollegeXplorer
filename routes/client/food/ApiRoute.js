const {
	getAllRestaurants,
	getAllDishes,
} = require("../../../controllers/client/food/ApiController")

const router = require("express").Router()

// Read all restaurants
router.get("/restaurant/all", getAllRestaurants)

// Read all dishes
router.get("/dish/all", getAllDishes)

module.exports = router
