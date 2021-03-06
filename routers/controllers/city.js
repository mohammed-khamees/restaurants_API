const cityModel = require('./../../db/models/city');

const getAllCities = (req, res) => {
	cityModel
		.find({})
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
};

const getCityByName = (req, res) => {
	const { name } = req.query;

	if (!name)
		return res
			.status(404)
			.json(`query name is not found, please provide name query in the url`);

	cityModel
		.findOne({ name })
		.then((result) => {
			if (!result) return res.status(404).json(`${name} is not found`);

			res.status(200).json(result);
		})
		.catch((err) => {
			res.status(400).json(err);
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
			res.status(400).json(err);
		});
};

const updateCity = (req, res) => {
	const { id } = req.params;

	cityModel
		.findByIdAndUpdate(id, req.body, { new: true })
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
};

const deleteCity = (req, res) => {
	const { id } = req.params;

	cityModel
		.findByIdAndDelete(id)
		.then((result) => {
			res.status(200).json({
				success: true,
				message: `The city has been deleted`,
				result,
			});
		})
		.catch((err) => {
			res.status(400).json(err);
		});
};

module.exports = {
	getAllCities,
	getCityByName,
	addNewCity,
	updateCity,
	deleteCity,
};
