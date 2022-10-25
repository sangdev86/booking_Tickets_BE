const bcrypt = require("bcryptjs");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { resF } = require("../hook/respone");
const config = require("../config/app");
const register = async (req, res) => {
	const { name, email, numberPhone, password, avatar } =
		req.body;
	try {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		const newUser = await User.create({
			name,
			email,
			numberPhone,
			password: hash,
			avatar,
		});
		res.status(201).send(newUser);
	} catch (error) {
		res.status(500).send(error);
	}
};
const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({
			where: {
				email,
			},
		});
		const isAuth = bcrypt.compareSync(
			password,
			user.password
		);
		if (isAuth) {
			const token = jwt.sign(
				{
					id: user.id,
					email: user.email,
					type: user.type,
				},
				"secret_token",
				{ expiresIn: 60 * 60 }
			);
			res
				.status(200)
				.send(resF(200, "Đăng Nhập thành công", { token }));
		} else {
			res.status(500).send(resF(500, "Đăng nhập thất bại"));
		}
	} catch (error) {
		res.status(500).send(resF(500, "Đăng nhập thất bại"));
	}
};
const uploadAvatarUser = async (req, res) => {
	try {
		const { file, user } = req;
		const userFound = await User.findOne({
			where: {
				email: user.email,
			},
		});
		userFound.avatar = `${config.appUrl}/${file.path}`;
		userFound.save();
		res.status(200).send(resF(200, userFound));
	} catch (error) {
		res.status(500).send(resF(500, "Không thể cập nhật"));
	}
};

module.exports = { register, login, uploadAvatarUser };
