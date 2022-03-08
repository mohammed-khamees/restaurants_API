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
			res.status(400).send(err);
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
			res.send(err);
		});
};

module.exports = {
	signUp,
	login,
};
