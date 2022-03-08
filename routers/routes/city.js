const express = require('express');
const {
	getAllCities,
	getCityByName,
	addNewCity,
	updateCity,
	deleteCity,
} = require('./../controllers/city');

// middlewares
const authentication = require('./../middlewares/authentication');
const authorization = require('./../middlewares/authorization');

const cityRouter = express.Router();

cityRouter.get('/', authentication, getAllCities);
cityRouter.get('/search', authentication, getCityByName);
cityRouter.post('/', authentication, authorization, addNewCity);
cityRouter.put('/:id', authentication, authorization, updateCity);
cityRouter.delete('/:id', authentication, authorization, deleteCity);

module.exports = cityRouter;
