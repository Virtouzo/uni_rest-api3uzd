const express = require("express");
const bodyParser = require("body-parser");

const apiRoutes = require("./routes/api.js");
const commRoutes = require("./routes/communicator.js");
const soapRoutes = require('./routes/soap.js')
const errorHandler = require("./error_handler.js");
const util         = require('./logic/util');
const fs           = require('fs');
const path = require('path')
const app = express();

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

app.get("/wsdlfile", function(req,res,next) {
	//util.getIPAddress(function(err, ip) {
		const xml = fs.readFileSync(path.resolve(__dirname, "./communicator.wsdl"), "utf8");
		var xmlnewip = xml.replace(new RegExp('localhost:3000', 'g'), req.headers.host)
		res.set('Content-Type', 'text/xml');
		res.end(xmlnewip);
	//});
})

app.use(errorHandler);

app.listen(3000, function() {
    soapRoutes(app)
});

// app.use("/*", function(req, res, next) {
// 	res.status(404).end();
// });