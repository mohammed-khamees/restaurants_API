const authorization = () => {
	try {
		if (req.token.role === 'User') throw new Error();
		next();
	} catch (error) {
		res.status(403).json({ message: 'forbidden' });
	}
};

module.exports = authorization;
