const userModel = require('./../../db/models/user');

const signUp = (req, res) => {
	const { name, email, password, role } = req.body;

	const user = new userModel({
		name,
		email,
		password,
		role,
	});

	user
		.save()
		.then((result) => {
			res.status(201).json(result);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
};

const login = (req, res) => {
	const { email, password } = req.body;

	userModel
		.authenticateBasic(email, password)
		.then((result) => {
			if (result[1] === 200)
				return res.status(result[1]).json({ token: result[0] });

			res.status(result[1]).json(result[0]);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
};

const allUser = (req, res) => {
	userModel
		.find()
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
};

const getUser = (req, res) => {
	const { id } = req.query;

	if (!id)
		return res
			.status(404)
			.json(`query id is not found, please provide id query in the url`);

	userModel
		.findById(id)
		.then((result) => {
			if (!result) return res.status(404).json(`user is not found`);

			res.status(200).json(result);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
};

const updateUser = (req, res) => {
	const { id } = req.params;

	userModel
		.findByIdAndUpdate(id, req.body, { new: true })
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
};

const deleteUser = (req, res) => {
	const { id } = req.params;

	userModel
		.findByIdAndDelete(id)
		.then((result) => {
			res.status(200).json({
				success: true,
				message: `The user has been deleted`,
				result,
			});
		})
		.catch((err) => {
			res.status(400).json(err);
		});
};

module.exports = {
	signUp,
	login,
	allUser,
	getUser,
	updateUser,
	deleteUser,
};
