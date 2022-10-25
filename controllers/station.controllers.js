const { Op } = require("sequelize");
const { Station } = require("../models");
const createStation = async (req, res) => {
	const { name, address, province } = req.body;
	try {
		const newStation = await Station.create({
			name,
			address,
			province,
		});

		res.status(201).send(newStation);
	} catch (err) {
		res.status(500).send(err);
	}
};
const getAllStation = async (req, res) => {
	let obj = {};
	let where = {};

	for (const key in req.query) {
		if (Object.hasOwnProperty.call(req.query, key)) {
			let value = req.query[key];
			switch (key) {
				case "name":
					obj = {
						where: {
							...where,
							[key]: {
								[Op.like]: `%${value}%`,
							},
						},
					};
					break;
				default:
					obj = {
						where: {
							...where,
							[key]: value,
						},
					};
					break;
			}
		}
	}
	try {
		const allStation = await Station.findAll(obj);
		res.status(201).send(allStation);
	} catch (error) {
		res.status(500).send(error);
	}
};
const getDetailStaton = async (req, res) => {
	const { id } = req.params;
	try {
		const detailStation = await Station.findOne({
			where: {
				id,
			},
		});
		res.status(200).send(detailStation);
	} catch (error) {
		res.status(500).send(error);
	}
};
const updateStation = async (req, res) => {
	const { id } = req.params;
	const { name, address, province } = req.body;
	try {
		const stationUpdate = await Station.findOne({
			where: { id },
		});

		stationUpdate.name = name;
		stationUpdate.address = address;
		stationUpdate.province = province;
		await stationUpdate.save();
		res.status(200).send(stationUpdate);
	} catch (error) {
		res.status(500).send(error);
	}
};
const deleteStation = async (req, res) => {
	const { id } = req.params;
	try {
		await Station.destroy({
			where: {
				id,
			},
		});
		res.status(200).send("Dellete Successed");
	} catch (error) {
		res.status(500).send("delete thất bại");
	}
};

module.exports = {
	createStation,
	getAllStation,
	getDetailStaton,
	updateStation,
	deleteStation,
};
