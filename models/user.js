"use strict";

const { Model } = require("sequelize");
const config = require("../config/app");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Ticket }) {
			this.hasMany(Ticket, {
				foreignKey: "userId",
				as: "user",
			});
		}
	}
	User.init(
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			numberPhone: DataTypes.STRING,
			avatar: {
				type: DataTypes.STRING,
				defaultValue:
					"https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg",
			},
			type: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
