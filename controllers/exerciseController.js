const Exercise = require("../models/Exercise");
const User = require("../models/User");
const mongoose = require("mongoose");

const createExercise = async (req, res) => {
	const { _id } = req.params;
	const { description, duration, date } = req.body;

	const newExercise = new Exercise({
		userId: _id,
		description,
		duration,
	});

	if (date) {
		newExercise.date = date;
	}

	try {
		const savedExercise = await newExercise.save();

		// push new exercise _id to user logs
		const user = await User.findOneAndUpdate(
			{ _id },
			{ $push: { logs: savedExercise._id } }
		);

		return res.json({
			username: user.username,
			description: savedExercise.description,
			duration: savedExercise.duration,
			date: savedExercise.date.toDateString(),
			_id: user._id,
		});
	} catch (err) {
		return res.json({ message: `${err}` });
	}
};

module.exports = { createExercise };
