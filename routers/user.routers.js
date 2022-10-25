const express = require("express");
const {
	authenticate,
} = require("../middlewares/auth/authenticate");
const {
	register,
	login,
	uploadAvatarUser,
} = require("../controllers/user.controllers");

const {
	uploadAvatar,
} = require("../middlewares/fileUpload/multer");
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post(
	"/upload-avatar",
	authenticate,
	uploadAvatar("users"),
	uploadAvatarUser
);
module.exports = {
	userRouter,
};
