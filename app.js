require("dotenv").config()

const express = require("express")
const cors = require("cors")

const app = express()

const dbConnect = require("./dbConnect")

const FeaturedRestaurants = require("./routes/FeaturedRestaurants")

dbConnect()
app.use(express.json())
app.use(cors())

app.get("/api", (req, res) => {
	res.send("Hello World")
})

app.use("/api/", FeaturedRestaurants)

app.listen(process.env.PORT, () => {
	console.log(`Server is running in ${process.env.PORT}`)
})
