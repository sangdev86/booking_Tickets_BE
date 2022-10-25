const express = require("express");
const {
	createStation,
	getAllStation,
	getDetailStaton,
	updateStation,
	deleteStation,
} = require("../controllers/station.controllers");
const {
	authenticate,
} = require("../middlewares/auth/authenticate");
const {
	authorize,
} = require("../middlewares/auth/authorize");
const {
	checkExits,
} = require("../middlewares/validation/checkExits");
const stationRouter = express.Router();
const { Station } = require("../models");

stationRouter.post("/", createStation);
stationRouter.get("/", authenticate, getAllStation);
stationRouter.get("/:id", getDetailStaton);
stationRouter.put(
	"/:id",
	checkExits(Station),
	updateStation
);
stationRouter.delete(
	"/:id",
	checkExits(Station),
	authenticate,
	authorize(["ADMIN", "S_ADMIN"]),
	deleteStation
);
module.exports = {
	stationRouter,
};
