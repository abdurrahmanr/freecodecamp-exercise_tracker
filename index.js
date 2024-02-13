// basic config
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// load routes
const userRoutes = require("./routes/user");

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("json spaces", 2);
app.use(cors());
app.use(express.static("public"));

// connect to db
mongoose
	.connect(process.env.DB_URI)
	.then(() => console.log("successfully connected to db"))
	.catch((err) => console.error(err));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

app.use("/api/users", userRoutes);

app.all("*", (req, res) => {
	res.status(404).send("404 Not Found");
});

const listener = app.listen(process.env.PORT, () => {
	console.log("Your app is listening on port " + listener.address().port);
});
