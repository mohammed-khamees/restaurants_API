const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	role: { type: String, default: 'User' },
});

// Hashed the password
user.pre('save', async function () {
	this.email = this.email.toLowerCase();
	this.password = await bcrypt.hash(this.password, 10);
});

// BASIC AUTH
user.statics.authenticateBasic = async function (email, password) {
	try {
		const user = await this.findOne({ email });
		if (!user) return ["The email doesn't exist", 404];

		const valid = await bcrypt.compare(password, user.password);
		if (valid) {
			const payload = {
				userId: user._id,
				role: user.role,
			};

			const options = {
				expiresIn: '60m',
			};

			return [jwt.sign(payload, process.env.SECRET, options), 200];
		}
		return ['Invalid Email or Password', 403];
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = mongoose.model('User', user);
