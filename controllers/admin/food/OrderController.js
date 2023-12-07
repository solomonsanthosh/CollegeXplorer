const Order = require("../../../modals/order")

// Create a new order
const createOrder = async (req, res) => {
	try {
		const { user, items } = req.body
		const newOrder = new Order({
			user: user,
			items: items.map((order) => ({
				dish: order.dish,
				quantity: order.quantity,
			})),
		})

		const savedOrder = await newOrder.save()
		// console.log("Order created:", savedOrder)
		res.json(savedOrder)
	} catch (error) {
		console.error("Error creating order:", error)
		res.status(500).json({ error: "Internal Server Error" })
	}
}

// Read all orders
const getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find()
			.populate("user")
			.populate("items.dish")
		// console.log("All orders:", orders)
		res.json(orders)
	} catch (error) {
		console.error("Error retrieving orders:", error)
	}
}

// Update an order by ID
const updateOrder = async (req, res) => {
	try {
		const { user, items } = req.body
		const id = req.params.id
		const updatedOrder = await Order.findByIdAndUpdate(
			id,
			{
				user: user,
				items: items.map((order) => ({
					dish: order.dish,
					quantity: order.quantity,
				})),
			},
			{ new: true }
		)

		// console.log("Updated order:", updatedOrder)
		res.json(updatedOrder)
	} catch (error) {
		console.error("Error updating order:", error)
	}
}

// Delete an order by ID
const deleteOrder = async (req, res) => {
	try {
		const id = req.params.id
		const deletedOrder = await Order.findByIdAndDelete(id)
		// console.log("Deleted order:", deletedOrder)
		res.json(deletedOrder)
	} catch (error) {
		console.error("Error deleting order:", error)
	}
}

module.exports = {
	createOrder,
	getAllOrders,
	updateOrder,
	deleteOrder,
}
