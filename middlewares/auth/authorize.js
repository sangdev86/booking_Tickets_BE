const { resF } = require("../../hook/respone");

const authorize = (ROLE) => (req, res, next) => {
	const { user } = req;
	if (ROLE.findIndex((el) => el === user.type)) {
		next();
	} else {
		res
			.status(403)
			.send(
				resF(
					403,
					"You were Login, but dont't have Permision"
				)
			);
	}
};
module.exports = {
	authorize,
};
