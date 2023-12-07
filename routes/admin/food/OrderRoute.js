const router = require("express").Router()

const {
	createOrder,
	getAllOrders,
	updateOrder,
	deleteOrder,
} = require("../../../controllers/admin/food/OrderController")

// Create a new order
router.post("/order/insert", createOrder)

// Read all orders
router.get("/order", getAllOrders)

// Update a order by ID
router.put("/order/update/:id", updateOrder)

// Delete a order by ID
router.delete("/order/delete/:id", deleteOrder)

module.exports = router
