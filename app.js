require("dotenv").config()

const express = require("express")
const cors = require("cors")

const app = express()

const dbConnect = require("./dbConnect")

// routers
// ADMIN
const restaurantRouter = require("./routes/admin/food/RestaurantRoute")
const DishRouter = require("./routes/admin/food/DishRoute")
const OrderRouter = require("./routes/admin/food/OrderRoute")
const UserRouter = require("./routes/admin/food/UserRoute")
const CartRouter = require("./routes/admin/food/CartRoute")

// CLIENT
const ApiRoute = require("./routes/client/food/ApiRoute")

dbConnect()
app.use(express.json())
app.use(cors())

app.get("/api", (req, res) => {
	res.send("Hello World")
})

// ADMIN
// Restaurant
app.use("/api/admin", restaurantRouter)
// Dish
app.use("/api/admin", DishRouter)
// Order
app.use("/api/admin", OrderRouter)
// User
app.use("/api/admin", UserRouter)
// Cart
app.use("/api/admin", CartRouter)

// CLIENT
// My API
app.use("/api/client", ApiRoute)

app.listen(process.env.PORT, () => {
	console.log(`Server is running in ${process.env.PORT}`)
})
