const express = require('express');
const {
	getAllRestaurants,
	getRestaurantsByName,
	addNewRestaurant,
	updateRestaurant,
	deleteRestaurant,
} = require('./../controllers/restaurant');

// middlewares
const authentication = require('./../middlewares/authentication');
const authorization = require('./../middlewares/authorization');

const restaurantRouter = express.Router();

restaurantRouter.get('/', authentication, getAllRestaurants);
restaurantRouter.get('/search', authentication, getRestaurantsByName);
restaurantRouter.post('/', authentication, authorization, addNewRestaurant);
restaurantRouter.put('/:id', authentication, authorization, updateRestaurant);
restaurantRouter.delete(
	'/:id',
	authentication,
	authorization,
	deleteRestaurant,
);

module.exports = restaurantRouter;
