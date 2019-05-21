const express = require("express");
const bodyParser = require("body-parser");

const apiRoutes = require("./routes/api.js");
const commRoutes = require("./routes/communicator.js");
const errorHandler = require("./error_handler.js");

const app = express();
const server = require("http").createServer(app);

if (process.env.NODE_ENV === "dev") {
	console.log("DEVELOPMENT ENVIRONMENT");
	app.disable("view cache");
} else {
	console.log("PRODUCTION ENVIRONMENT");
}

app.use(express.json());
app.disable("x-powered-by");
app.set("trust proxy", "loopback");
app.use(
	"*",
	bodyParser.urlencoded({
		extended: true,
		limit: "2mb"
	})
);

app.get("/", function(req, res, next) {
	res.send('1 Atsiskaitymas. API stovi "localhost/api/users"');
});
app.use("/api", apiRoutes);
app.use("/communicate", commRoutes);
app.use("/*", function(req, res, next) {
	res.status(404).end();
});
app.use(errorHandler);

server.listen(3000);
