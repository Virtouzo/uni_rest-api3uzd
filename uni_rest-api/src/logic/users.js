const req = require("request-promise");
const Promise = require("bluebird");
const _ = require("lodash");

function attachItemsToUser(user) {
	const itemIds = user.items.map(item => item.id);

	return Promise.try(() => {
		return req({
			uri: `http://shop:3001/shop/multiple`,
			body: {
				items: itemIds
			},
			json: true
		});
	})
		.then(body => {
			console.log("received resp");
			console.dir(body);
			if (body.error) {
				console.log("body error detected");
				throw new Error(body.message);
			}
			console.log("received items resp: ");
			console.dir(body);
			user.items = body;
			return user;
		})
		.catch(function(resp) {
			if (resp.message.includes("ECONNREFUSED") || resp.message.includes("ENOTFOUND")) {
				return user;
			} else {
				throw resp.error;
			}
		});
}

module.exports = {
	attachItemsToUser
};
