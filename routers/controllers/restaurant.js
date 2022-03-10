const restaurantsModel = require('./../../db/models/restaurant');
const cityModel = require('./../../db/models/city');

const getAllRestaurants = (req, res) => {
	restaurantsModel
		.find({})
		.populate('city', 'name -_id')
		.exec()
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.status(400).json(err);
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
		.populate('city', 'name -_id')
		.then((result) => {
			if (!result) return res.status(404).json(`${name} is not found`);

			res.status(200).json(result);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
};

const groubRestaurantsByCity = (req, res) => {
	const city = req.params.city.toLowerCase();

	cityModel
		.findOne({ city })
		.then((result) => {
			if (!result) return res.status(404).json(`${city} is not found`);
			else {
				restaurantsModel
					.find({ city: result._id })
					.then((restaurants) => {
						if (!restaurants.length)
							return res
								.status(404)
								.json(`There are no restaurants in ${city}`);

						res
							.status(200)
							.json({ city, count: restaurants.length, restaurants });
					})
					.catch((err) => {
						res.send(err);
					});
			}
		})
		.catch((err) => {
			res.status(400).json(err);
		});
};

const nearestRestaurants = (req, res) => {
	const { lat, long } = req.query;
	restaurantsModel
		.find({
			location: {
				$near: {
					$geometry: {
						type: 'Point',
						coordinates: [lat, long],
					},
				},
			},
		})
		.populate('city', 'name -_id')
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.status(400).json(err);
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
			res.status(400).json(err);
		});
};

const updateRestaurant = (req, res) => {
	const { id } = req.params;

	restaurantsModel
		.findByIdAndUpdate(id, req.body, { new: true })
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
};

const deleteRestaurant = (req, res) => {
	const { id } = req.params;

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
			res.status(400).json(err);
		});
};

module.exports = {
	getAllRestaurants,
	getRestaurantsByName,
	groubRestaurantsByCity,
	nearestRestaurants,
	addNewRestaurant,
	updateRestaurant,
	deleteRestaurant,
};
