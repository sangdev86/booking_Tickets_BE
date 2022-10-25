const multer = require("multer");
const fs = require("fs");
// xem MIME types
const path = require("path");
const FILE_TYPE_MAP = {
	"image/png": "png",
	"image/jpeg": "jpeg",
	"image/jpg": "jpg",
};

const storage = (folder) =>
	multer.diskStorage({
		destination: function (req, file, cb) {
			const { id } = req.user;
			const dest = `./public/${folder}/${id}/avatar`;
			fs.exists(dest, (exists) => {
				if (!exists) {
					return fs.mkdir(
						dest,
						{ recursive: true },
						(error) => cb(error, dest)
					);
				} else {
					fs.readdir(dest, (error, files) => {
						if (error) throw error;
						for (const file of files) {
							fs.unlink(path.join(dest, file), (error) => {
								if (error) throw error;
							});
						}
					});
				}
				return cb(null, dest);
			});
		},
		filename: function (req, file, cb) {
			const extension = FILE_TYPE_MAP[file.mimetype];
			const fileName = file.originalname
				.split(" ")
				.join("-");
			const fileNameUpdate = fileName.slice(
				0,
				fileName.length - 1 - extension.length
			);
			cb(
				null,
				`${fileNameUpdate}-${Date.now()}-${
					Math.random() * 1e9
				}.${extension}`
			);
		},
	});

const uploadAvatar = (folder) => {
	return multer({
		storage: storage(folder),
		fileFilter: (res, file, cb) => {
			const extension = FILE_TYPE_MAP[file.mimetype];
			const allowedType = /jpeg|jpg|png/;
			const passed = allowedType.test(extension);
			if (passed) {
				return cb(null, true);
			}
			return cb(new Error("Fail extention"));
		},
	}).single("avatar");
};

module.exports = { uploadAvatar };
