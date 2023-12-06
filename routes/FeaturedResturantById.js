const express = require("express")
const router = express.Router()
const Featured = require("../modals/featured") // Import the Mongoose model for Featured

router.get("/featured-restaurants/:id", async (req, res) => {
	const { id } = req.params

	try {
		const featuredRestaurant = await getFeaturedRestaurantById(id)
		res.json(featuredRestaurant)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Internal Server Error" })
	}
})

const getFeaturedRestaurantById = async (id) => {
	try {
		const featuredData = await Featured.findOne({ _id: id })
			.populate({
				path: "restaurants",
				populate: {
					path: "type dishes",
					select: "name description image lat lng address rating reviews",
					populate: {
						path: "type",
						model: Category, // Assuming you have a Category model
						select: "name",
					},
				},
			})
			.exec()

		// Process and structure the data as needed
		const processedData = {
			name: featuredData.name,
			description: featuredData.description,
			restaurants: featuredData.restaurants.map((restaurant) => {
				return {
					name: restaurant.name,
					description: restaurant.description,
					image: restaurant.image,
					lat: restaurant.lat,
					lng: restaurant.lng,
					address: restaurant.address,
					rating: restaurant.rating,
					reviews: restaurant.reviews,
					type: restaurant.type.name,
					dishes: restaurant.dishes.map((dish) => {
						return {
							name: dish.name,
							description: dish.description,
							image: dish.image,
							price: dish.price,
						}
					}),
				}
			}),
		}

		return processedData
	} catch (error) {
		throw error
	}
}

module.exports = router
