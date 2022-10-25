"use strict";

/** @type {import('sequelize-cli').Migration} */
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
			"Stations",
			[
				{
					name: "Bến xe miền tây",
					address:
						"395 kinh dương vương, Tân bình Hồ Chí Minh",
					province: "HCM",
					createdAt: "2022-10-23 09:09:04",
					updatedAt: "2022-10-23 09:09:04",
				},
				{
					name: "Bến xe miền tây 1",
					address:
						"395 kinh dương vương, Tân bình Hồ Chí Minh",
					province: "HCM",
					createdAt: "2022-10-23 09:09:04",
					updatedAt: "2022-10-23 09:09:04",
				},
				{
					name: "Bến xe miền tây 2",
					address:
						"395 kinh dương vương, Tân bình Hồ Chí Minh",
					province: "HCM",
					createdAt: "2022-10-23 09:09:04",
					updatedAt: "2022-10-23 09:09:04",
				},
				{
					name: "Bến xe miền tây 3",
					address:
						"395 kinh dương vương, Tân bình Hồ Chí Minh",
					province: "HCM",
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
		await queryInterface.bulkDelete("Stations", null, {});
	},
};
