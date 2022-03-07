const express = require('express');
require('./db');
require('dotenv').config();
const cors = require('cors');

//routers

const app = express();

//built-in middlewares
app.use(express.json());

//third-party middlewares
app.use(cors());

// router middleware

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server Running On ${PORT}`);
});
