const express = require("express")
const router = express.Router()

// Import the Mongoose models
const Featured = require("../modals/featured")
const Restaurant = require("../modals/restaurant")
const Category = require("../modals/category")
const Dish = require("../modals/dish")

// Define the route to get featured restaurants
router.get("/featured-restaurants", async (req, res) => {
	try {
		const featuredRestaurants = await getFeaturedRestaurants()
		res.json(featuredRestaurants)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Internal Server Error" })
	}
})

// Helper function to fetch featured restaurants
const getFeaturedRestaurants = async () => {
	try {
		const featuredData = await Featured.find()
			.populate({
				path: "restaurants",
				populate: {
					path: "type dishes",
					select: "name description image lat lng address rating reviews",
					populate: {
						path: "type",
						model: Category,
						select: "name",
					},
				},
			})
			.exec()

		// Process and structure the data as needed
		const processedData = featuredData.map((featured) => {
			return {
				name: featured.name,
				description: featured.description,
				restaurants: featured.restaurants.map((restaurant) => {
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
		})

		return processedData
	} catch (error) {
		throw error
	}
}

module.exports = router
