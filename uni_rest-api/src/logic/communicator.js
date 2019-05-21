const req = require("request-promise");
const Promise = require("bluebird");

class Communicator {
	getItems() {
		console.log("getItems()");
		return Promise.try(() => {
			return req({
				uri: "http://shop:3001/shop",
				json: true
			});
		})
			.then(body => {
				console.log("received resp");
				console.dir(body);
				if (body.error) throw new Error(body.message);
				return body;
			})
			.catch(function(resp) {
				throw resp.error;
			});
	}

	getItem(id) {
		console.log("getItem()");
		return Promise.try(() => {
			return req({
				uri: `http://shop:3001/shop/${id}`,
				json: true
			});
		})
			.then(body => {
				console.log("received resp");
				console.dir(body);
				if (body.error) throw new Error(body.message);
				return body;
			})
			.catch(function(resp) {
				throw resp.error;
			});
	}

	buyItem(id) {
		console.log("buyItem()");
		return Promise.try(() => {
			return req({
				uri: `http://shop:3001/shop/${id}`,
				json: true
			});
		})
			.then(async body => {
				console.log("received resp");
				console.dir(body);
				if (body.error) throw new Error(body.message);
				await req({
					method: "DELETE",
					uri: `http://shop:3001/shop/${id}`,
					json: true
				});
				return body;
			})
			.catch(function(resp) {
				throw resp.error;
			});
	}
}

module.exports = new Communicator();
