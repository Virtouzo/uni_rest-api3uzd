const express = require("express");
const usersLogic = require("../logic/users");
const dataStorage = require("../logic/dataStorage");
var router = express.Router();
const Promise = require("bluebird");
const _ = require("lodash");
const commWrapper = require('../logic/communicateWrapper')

function dataValidator(req, res, next) {
	req.body.balance = Number(req.body.balance);

	try {
		dataStorage.userPropExistValidator(req.body);
		dataStorage.userPropTypeValidator(req.body);
	} catch (e) {
		res.status(400);
		next(e);
	}

	next();
}

function userExistChecker(req, res, next) {
	const user = dataStorage.get(req.params.id);
	if (!user) {
		res.status(404);
		throw new Error("User does not exist!");
	} else {
		next();
	}
}

router.get("/users", async function(req, res, next) {
    const usersWithItems = await commWrapper.getUsers()
    res.json(usersWithItems);
})

router.get("/users/:id", userExistChecker, async function(req, res, next) {
	const userId = req.params.id;
    const user = await commWrapper.getUser(userId);
	res.json(user);
});

router.post("/users", dataValidator, function(req, res, next) {
	let key = dataStorage.set(null, req.body);

	let json = {};
	json[key] = { balance: req.body.balance, first_name: req.body.first_name };
	res.status(201).json(json);
});

router.put("/users/:id", dataValidator, function(req, res, next) {
	const userId = req.params.id;
	const user = dataStorage.get(userId);

	if (user) {
		let updated = dataStorage.update(userId, req.body);
		let json = {};
		json[userId] = updated;
		res.json(json);
	} else {
		dataStorage.set(userId, req.body);
		res.status(201);
	}

	res.end();
});

router.patch("/users/:id", userExistChecker, dataValidator, function(req, res, next) {
	const userId = req.params.id;
	const user = dataStorage.get(userId);

	let updated = dataStorage.update(userId, req.body);

	let json = {};
	json[userId] = updated;
	res.json(json);
});

router.delete("/users/:id", userExistChecker, function(req, res, next) {
	const userId = req.params.id;

	dataStorage.del(userId);

	res.json({ deleted: true, id: userId });
});

module.exports = router;
