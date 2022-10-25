const express = require("express");
const app = express();
const path = require("path");
const { rootRouter } = require("./routers");

app.use(express.json());

const publicPathDirectory = path.join(
	__dirname,
	"./public"
);
app.use("/public", express.static(publicPathDirectory));

app.use("/api/v1", rootRouter);

app.listen(3000, () => {
	console.log(
		"App listening on port http://localhost:3000"
	);
});
