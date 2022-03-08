const cityModel = require('./../../db/models/city');

const getAllCities = (req, res) => {
	cityModel
		.find({})
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.send(err);
		});
};

const getCityByName = (req, res) => {
	const city = req.query.name;

	if (!city) return res.status(404).json(`${city} is not found`);

	cityModel
		.findOne({ name: city })
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.send(err);
		});
};

const addNewCity = (req, res) => {
	const city = new cityModel(req.body);

	city
		.save()
		.then((result) => {
			res.status(201).json(result);
		})
		.catch((err) => {
			res.send(err);
		});
};

const updateCity = (req, res) => {
	const id = req.params.id;

	cityModel
		.findByIdAndUpdate(id, req.body, { new: true })
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.send(err);
		});
};

const deleteCity = (req, res) => {
	const id = req.params.id;

	cityModel
		.findByIdAndDelete(id)
		.then((result) => {
			res.status(200).json({
				success: true,
				message: `The restaurant has been deleted`,
				result,
			});
		})
		.catch((err) => {
			res.send(err);
		});
};

module.exports = {
	getAllCities,
	getCityByName,
	addNewCity,
	updateCity,
	deleteCity,
};
