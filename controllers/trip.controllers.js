const { resF } = require("../hook/respone");
const { Trip } = require("../models");
const { Station } = require("../models");

module.exports = {
	createTrip: async (req, res) => {
		try {
			const { startTime, fromStation, toStation, price } =
				req.body;
			const newTrip = await Trip.create({
				fromStation,
				toStation,
				startTime,
				price,
			});

			res.status(201).send(resF(200, "success", newTrip));
		} catch (error) {
			res.status(500, "Tạo mới không thành công");
		}
	},
	getAllTrip: async (req, res) => {
		const tripList = await Trip.findAll({
			include: [
				{
					model: Station,
					as: "from",
				},
				{
					model: Station,
					as: "to",
				},
			],
		});
		res.status(200).send(resF(200, "success", tripList));
	},
	updateTrip: async (req, res) => {
		const { id } = req.params;
		const { fromStation, toStation, startTime, price } =
			req.body;
		try {
			const tripUpdate = await Trip.findOne({
				where: { id },
			});

			tripUpdate.fromStation = fromStation;
			tripUpdate.toStation = toStation;
			tripUpdate.startTime = startTime;
			tripUpdate.price = price;

			await tripUpdate.save();
			const trip2 = await Trip.findOne({
				where: { id },
				include: [
					{
						model: Station,
						as: "from",
					},
					{
						model: Station,
						as: "to",
					},
				],
			});
			res.status(200).send(resF(200, "success", trip2));
		} catch (error) {
			res.status(500).send(resF(500, "error", error));
		}
	},
	deleteTrip: async (req, res) => {
		const { id } = req.params;
		try {
			await Trip.destroy({
				where: {
					id,
				},
			});
			res
				.status(200)
				.send(
					resF(200, "success", "Delete a trip successed !")
				);
		} catch (error) {
			res
				.status(500)
				.send(
					resF(500, "Faild", "Delete a trip Faileds !")
				);
		}
	},
};
