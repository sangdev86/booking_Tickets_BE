const checkExits = (Model) => {
	return async (req, res, next) => {
		const { id } = req.params;
		const checker = await Model.findOne({
			where: {
				id,
			},
		});
		if (checker) {
			next();
		} else {
			res
				.status(404)
				.send(`Không tìm thấy với id là ${id}`);
		}
	};
};

module.exports = {
	checkExits,
};
