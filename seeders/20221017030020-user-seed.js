"use strict";

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			"Users",
			[
				{
					name: "sang1",
					email: "sang1@gmail.com",
					password: bcrypt.hashSync("secret", 10),
					numberPhone: "089884401",
					avatar: "",
					type: "CLIENT",
					createdAt: "2022-10-23 09:09:04",
					updatedAt: "2022-10-23 09:09:04",
				},
				{
					name: "sang2",
					email: "sang2@gmail.com",
					password: bcrypt.hashSync("secret", 10),
					numberPhone: "089884401",
					avatar: "",
					type: "CLIENT",
					createdAt: "2022-10-23 09:09:04",
					updatedAt: "2022-10-23 09:09:04",
				},
				{
					name: "sang3",
					email: "sang3@gmail.com",
					password: bcrypt.hashSync("secret", 10),
					numberPhone: "089884401",
					avatar: "gnas93YH",
					type: "CLIENT",
					createdAt: "2022-10-23 09:09:04",
					updatedAt: "2022-10-23 09:09:04",
				},
				{
					name: "sang4",
					email: "sang4@gmail.com",
					password: bcrypt.hashSync("secret", 10),
					numberPhone: "089884401",
					avatar: "",
					type: "CLIENT",
					createdAt: "2022-10-23 09:09:04",
					updatedAt: "2022-10-23 09:09:04",
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("Users", null, {});
	},
};
