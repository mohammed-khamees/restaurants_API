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
	const restaurant = req.query.name;

	if (!restaurant) return res.status(404).json(`${restaurant} is not found`);

	restaurantsModel
		.find({ name: restaurant })
		.then((result) => {
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
