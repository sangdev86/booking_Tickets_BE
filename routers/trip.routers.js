const express = require("express");

const {
	createTrip,
	getAllTrip,
	deleteTrip,
	updateTrip,
} = require("../controllers/trip.controllers");
const {
	checkExits,
} = require("../middlewares/validation/checkExits");
const { Trip } = require("../models");
const tripRouters = express.Router();

tripRouters.post("/", createTrip);
tripRouters.get("/", getAllTrip);
tripRouters.put("/:id", checkExits(Trip), updateTrip);
tripRouters.delete("/:id", checkExits(Trip), deleteTrip);

module.exports = {
	tripRouters,
};
