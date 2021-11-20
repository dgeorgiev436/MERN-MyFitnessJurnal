const express = require("express")
const app = express();
const connectDB = require("./config/db")

connectDB();

app.use(express.json({extended: false}))

app.get("/", (req,res) => {
	res.send("HOME PAGE")
})

// Defining routes
app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/users", require("./routes/api/users"))
app.use("/api/profile", require("./routes/api/profile"),require("./routes/api/workoutJurnal"))


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})