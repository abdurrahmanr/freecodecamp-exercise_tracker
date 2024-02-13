const dayjs = require("dayjs");
const User = require("../models/User");

const getUsers = (req, res) => {
	User.find()
		.then((result) => {
			return res.status(200).json(result);
		})
		.catch((err) => {
			console.error(err);
		});
};

const createUser = (req, res) => {
	const { username } = req.body;

	const newUser = new User({
		username,
	});

	newUser
		.save()
		.then((result) => {
			return res.json({ username: result.username, _id: result._id });
		})
		.catch((err) => {
			console.error(err);
		});
};

const getLogs = async (req, res) => {
	const { id } = req.params;
	let { from, to, limit } = req.query;

	from = dayjs(from, "YYYY-MM-DD").isValid() ? from : 0;
	to = dayjs(to, "YYYY-MM-DD").isValid() ? to : 0;

	const populateOptions = {
		path: "logs",
		select: "-_id description duration date",
		perDocumentLimit: limit,
	};

	if (from) populateOptions.match = { date: { $gte: from } };

	if (to) populateOptions.match = { date: { $lte: to } };

	const result = await User.findOne({ _id: id })
		.lean()
		.populate(populateOptions)
		.exec();

	result.count = result.logs.length;
	result.logs = result.logs.map((log) => ({
		...log,
		date: log.date.toDateString(),
	}));

	const { username, count, _id, logs: log } = result;
	return res.json({ username, count, _id, log });
};

module.exports = { getUsers, createUser, getLogs };
