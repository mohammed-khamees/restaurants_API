const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ['Point'],
		required: true,
	},
	coordinates: {
		type: [Number],
		required: true,
	},
});

const restaurant = new mongoose.Schema({
	city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
	image: { type: String, required: true },
	name: { type: String, required: true },
	email: { type: String, required: true },
	location: {
		type: pointSchema,
		required: true,
	},
});

module.exports = mongoose.model('Restaurant', restaurant);
