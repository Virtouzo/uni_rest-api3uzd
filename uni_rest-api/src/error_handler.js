module.exports = function errorHandler(err, req, res, next) {
	console.log("errorHandler()");
	if (res.statusCode < 400) res.status(400);
	res.json({
		success: false,
		type: "error",
		message: err.message
	});
};
