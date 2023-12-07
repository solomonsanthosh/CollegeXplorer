const router = require("express").Router()

const {
	createUser,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
} = require("../../../controllers/admin/food/UserController")

// Create a new user
router.post("/user/insert", createUser)

// Read all users
router.get("/user", getAllUsers)

// Read single users
router.get("/user/:id", getUserById)

// Update a user by ID
router.put("/user/update/:id", updateUser)

// Delete a user by ID
router.delete("/user/delete/:id", deleteUser)

module.exports = router
