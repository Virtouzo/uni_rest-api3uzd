const express = require("express");
const communicator = require("../logic/communicator");
const Promise = require("bluebird");
const _ = require("lodash");
const dataStorage = require("../logic/dataStorage");
const commWrapper = require('../logic/communicateWrapper');

var router = express.Router();

router.get("/items", function(req, res, next) {
	Promise.try(function() {
		return commWrapper.getItems()
	})
    .then(function(items) {
        console.log("sending succ resp");
        res.json(items);
    })
    .catch(function(e) {
        next(e);
    });
});

function bodyValidator(req, res, next) {
	req.body.itemId = Number(req.body.itemId);
	req.body.userId = Number(req.body.userId);

	try {
		if (!_.isInteger(req.body.itemId)) throw new Error("Invalid item id parameter");
		if (!_.isInteger(req.body.userId)) throw new Error("Invalid user id parameter");
	} catch (e) {
		res.status(400);
		next(e);
	}

	next();
}

router.post("/item", bodyValidator, function(req, res, next) {
	const itemId = req.body.itemId;
	const userId = req.body.userId;

	Promise.try(async function() {
        await commWrapper.getItems(itemId, userId)
		res.json({
			message: `User ${userId} bought item ${itemId} successfully`
		});
	}).catch(function(e) {
		next(e);
	});
});

module.exports = router;
