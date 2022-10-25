const e = require("express");
const jwt = require("jsonwebtoken");
const { resF } = require("../../hook/respone");

const authenticate = (req, res, next) => {
	const token = req.header("token");

	try {
		const decode = jwt.verify(token, "secret_token");
		if (decode) {
			req.user = decode;
			return next();
		} else {
			res.status(401).send(resF(401, "You don't Login"));
		}
	} catch (error) {
		res.status(401).send(resF(401, "You don't Login"));
	}
};

module.exports = {
	authenticate,
};
