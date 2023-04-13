const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
var cors = require("cors")

const app = express()
dotenv.config()

//cors
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/images", express.static("backend/uploads/images"))

const dbURL = process.env.DBCONNECTION
mongoose.set("strictQuery", false)

mongoose
    .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(5000)
        console.log("Listening to port 5000 and database is connected!")
    })
    .catch((err) => console.log(err))

app.use("/api/users", require("./routes/usersRoutes"))
app.use("/api/products", require("./routes/productsRoutes"))
app.use("/api/admins", require("./routes/adminRoutes"))
app.use("/", (req, res) => {
    res.send("<h1>Lets marry soon.</h1>")
})
app.use("/api/designers", require("./routes/designerRoutes"))
