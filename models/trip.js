"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Trip extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */

		static associate({ Station, Ticket }) {
			this.belongsTo(Station, {
				foreignKey: "toStation",
				as: "to",
			});
			this.belongsTo(Station, {
				foreignKey: "fromStation",
				as: "from",
			});
			this.hasMany(Ticket, {
				foreignKey: "tripId",
				as: "trip",
			});
		}
	}
	Trip.init(
		{
			startTime: DataTypes.DATE,
			price: DataTypes.FLOAT,
		},
		{
			sequelize,
			modelName: "Trip",
		}
	);
	return Trip;
};
