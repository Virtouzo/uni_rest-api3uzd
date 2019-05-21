import * as express from "express";
import Shop from "./shop";
import HTTPError from "../util/HTTPError";
import { Paramsid, RequestItem, ItemidsValType } from "./types";

export default function shopAPI(shop: Shop) {
	let router: express.Router = express.Router();

	router.use(express.json());

	router.get("/", (req, res) => {
		res.json(shop.get());
	});

	router.get("/multiple", (req, res) => {
		console.dir(req.body);
		let validation = ItemidsValType.decode(req.body);
		if (!validation.isRight()) throw new HTTPError(400, "Invalid data");

		let itemReqBody = validation.value;
		let items = itemReqBody.items.map(function(id) {
			let item = shop.findId(id);
			if (!item) throw new HTTPError(400, "Item " + id + " does not exist");
			return item;
		});

		res.json(items);
	});

	router.get("/:id", (req, res) => {
		let validation = Paramsid.decode(req.params);

		if (!validation.isRight()) throw new HTTPError(400, "Invalid params");

		let params = validation.value;
		let item = shop.findId(params.id);
		if (item == undefined) throw new HTTPError(404, "Item not found");
		res.json(item);
	});

	router.post("/", (req, res) => {
		let validation = RequestItem.decode(req.body);
		if (!validation.isRight()) throw new HTTPError(400, "Invalid data");

		let item = validation.value;
		shop.add(item);
		res.status(201).end();
	});

	router.delete("/:id", (req, res) => {
		let validation = Paramsid.decode(req.params);

		if (!validation.isRight()) throw new HTTPError(400, "Invalid params");
		let params = validation.value;

		shop.remove(params.id);
		res.end();
	});

	router.put("/:id", (req, res) => {
		let validation = Paramsid.decode(req.params);
		if (!validation.isRight()) throw new HTTPError(400, "Invalid params");

		let bodyValidation = RequestItem.decode(req.body);
		if (!bodyValidation.isRight()) throw new HTTPError(400, "Invalid data");

		let params = validation.value;
		let item = bodyValidation.value;
		let itemWithId = { ...item, id: params.id, bought: false };

		if (shop.findId(params.id) == null) {
			shop.addWithId(itemWithId);
			res.status(201);
		} else {
			shop.update(itemWithId);
		}

		res.end();
	});

	router.patch("/:id", (req, res) => {
		let validation = Paramsid.decode(req.params);
		if (!validation.isRight()) throw new HTTPError(400, "Invalid params");

		let bodyValidation = RequestItem.decode(req.body);
		if (!bodyValidation.isRight()) throw new HTTPError(400, "Invalid data");

		let params = validation.value;
		let item = bodyValidation.value;
		let itemWithId = { ...item, id: params.id, bought: false };

		if (shop.findId(params.id) == null) throw new HTTPError(404, "Item not found");

		shop.update(itemWithId);

		res.end();
	});

	return router;
}
