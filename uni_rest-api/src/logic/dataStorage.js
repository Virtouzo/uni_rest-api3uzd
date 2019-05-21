const _ = require("lodash");
const extend = require("extend");

const data = {
	1: { first_name: "Rokas", balance: 123, items: [{ id: 1 }] },
	2: { first_name: "Tomas", balance: 555, items: [] },
	3: { first_name: "DigiDo", balance: 323, items: [] }
};

function userPropExistValidator(user) {
	if (!user.first_name) throw new Error("first_name argument is missing!");
	if (!user.balance) throw new Error("balance argument is missing!");
}
function userPropTypeValidator(user) {
	if (user.first_name && !_.isString(user.first_name)) throw new Error("Argument first_name is missing or not string!");
	if (user.balance && !_.isNumber(user.balance)) throw new Error("Balance is missing or not an integer!");
}

function set(key, val) {
	if (!key) {
		keys = _.orderBy(Object.keys(data), "asc");
		key = Number(keys[keys.length - 1]) + 1;
	}

	if (data[key]) throw new Error("User already exists!");
	data[key] = val;
	return key;
}
function get(key) {
	return data[key];
}
function getAll() {
	return data;
}
function update(key, newInfo) {
	if (!data[key]) throw new Error("User does not exist!");
	const user = data[key];
	console.log("update()");
	const objArrayElements = {};
	for (let iterKey in newInfo) {
		console.log("key: " + iterKey);
		const newInfoProp = newInfo[iterKey];
		const oldInfoProp = user[iterKey];
		console.log("oldinfoprop");
		console.dir(oldInfoProp);
		if (_.isArray(newInfoProp)) objArrayElements[iterKey] = [...newInfo[iterKey], ...oldInfoProp];
	}

	console.log("obj array elements");
	console.dir(objArrayElements);
	const newUser = { ...data[key], ...newInfo, ...objArrayElements };
	data[key] = newUser;
	return newUser;
}
function del(key) {
	if (!data[key]) throw new Error("User does not exist!");
	delete data[key];
}

module.exports = {
	get,
	set,
	getAll,
	update,
	del,
	userPropExistValidator,
	userPropTypeValidator
};
