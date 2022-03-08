const restaurantsModel = require('./../../db/models/restaurant');

const getAllRestaurants = (req, res) => {
	restaurantsModel
		.find({})
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.send(err);
		});
};

const getRestaurantsByName = (req, res) => {
	const { name } = req.query;

	if (!name)
		return res
			.status(404)
			.json(`query name is not found, please provide name query in the url`);

	restaurantsModel
		.findOne({ name })
		.then((result) => {
			if (!result) return res.status(404).json(`${name} is not found`);

			res.status(200).json(result);
		})
		.catch((err) => {
			res.send(err);
		});
};

const addNewRestaurant = (req, res) => {
	const restaurant = new restaurantsModel(req.body);

	restaurant
		.save()
		.then((result) => {
			res.status(201).json(result);
		})
		.catch((err) => {
			res.send(err);
		});
};

const updateRestaurant = (req, res) => {
	const id = req.params.id;

	restaurantsModel
		.findByIdAndUpdate(id, req.body, { new: true })
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.send(err);
		});
};

const deleteRestaurant = (req, res) => {
	const id = req.params.id;

	restaurantsModel
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
	getAllRestaurants,
	getRestaurantsByName,
	addNewRestaurant,
	updateRestaurant,
	deleteRestaurant,
};
