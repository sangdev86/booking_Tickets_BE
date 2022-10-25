"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Station extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Trip }) {
			this.hasMany(Trip, {
				foreignKey: "toStation",
				as: "to",
			});
			this.hasMany(Trip, {
				foreignKey: "fromStation",
				as: "from",
			});
		}
	}
	Station.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [4, 40],
				},
			},
			address: {
				type: DataTypes.STRING,
				validate: {
					checkLen(value) {
						if (value.length >= 8 && value.length <= 30) {
							return true;
						} else {
							throw new Error(
								"Địa chỉ phải có từ 8 đến 30 kí tự"
							);
						}
					},
				},
			},
			province: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isIn: [["HCM", "HN", "DN"]],
				},
			},
		},
		{
			sequelize,
			modelName: "Station",
		}
	);
	return Station;
};
