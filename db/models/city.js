const mongoose = require('mongoose');

const city = new mongoose.Schema({
	name: { type: String, required: true },
});

module.exports = mongoose.model('City', city);
