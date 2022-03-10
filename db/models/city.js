const mongoose = require('mongoose');

const city = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
});

city.pre('save', async function () {
	this.name = this.name.toLowerCase();
});

module.exports = mongoose.model('City', city);
