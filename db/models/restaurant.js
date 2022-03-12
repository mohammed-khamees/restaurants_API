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
	name: { type: String, required: true, unique: true, trim: true },
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
	},
	location: {
		type: pointSchema,
		required: true,
	},
});

restaurant.index({ location: '2dsphere' });

module.exports = mongoose.model('Restaurant', restaurant);
