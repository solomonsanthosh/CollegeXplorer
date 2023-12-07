const router = require("express").Router()

const {
	createDish,
	getAllDishes,
	updateDish,
	deleteDish,
} = require("../../../controllers/admin/food/DishController")

// Create a new dish
router.post("/dish/insert", createDish)

// Read all dishs
router.get("/dish", getAllDishes)

// Update a dish by ID
router.put("/dish/update/:id", updateDish)

// Delete a dish by ID
router.delete("/dish/delete/:id", deleteDish)

module.exports = router
