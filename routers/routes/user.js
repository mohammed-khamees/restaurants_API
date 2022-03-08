const express = require('express');
const {
	signUp,
	login,
	allUser,
	getUser,
	updateUser,
	deleteUser,
} = require('./../controllers/user');

// middlewares
const authentication = require('./../middlewares/authentication');
const authorization = require('./../middlewares/authorization');

const userRouter = express.Router();

userRouter.post('/signUp', signUp);
userRouter.post('/login', login);

//For Admins
userRouter.get('/users', authentication, authorization, allUser);
userRouter.get('/user', authentication, authorization, getUser);
userRouter.put('/user/:id', authentication, authorization, updateUser);
userRouter.delete('/user/:id', authentication, authorization, deleteUser);

module.exports = userRouter;
