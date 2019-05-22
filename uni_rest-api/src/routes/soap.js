const express = require("express");
const communicator = require("../logic/communicator");
const Promise = require("bluebird");
const _ = require("lodash");
const dataStorage = require("../logic/dataStorage");
const commWrapper = require('../logic/communicateWrapper')
const fs = require('fs');
const path = require('path')
const soap = require('soap')

function soapRouter(app) {
    const xml = fs.readFileSync(path.resolve(__dirname, "../communicator.wsdl"), "utf8");

    function errHandler(err, cb) {
        if (err.message.includes("ECONNREFUSED") || err.message.includes("ENOTFOUND")) {
            cb(new Error('Shop service is down!'));
        } else {
            console.error(err);
            cb(new Error(err.message));
        }
    };

	const CommunicatorService = {
		CommunicatorService: {
			CommunicatorPort: {
				getItems: function(args, cb) {
					console.log("getting");
                    return commWrapper.getItems()
                    .catch(function(err) {
                        if (err.message.includes("ECONNREFUSED") || err.message.includes("ENOTFOUND")) {
                            throw new Error('Shop service is down!');
                        } else {
                            console.error(err);
                            throw new Error(err.message);
                        }
                    });
                },
                buyItems: function(args, cb) {
                    const { itemId, userId } = args;
                    return commWrapper.buyItem(itemId, userId)
                    .then(() => {
                        cb({result: `User ${userId} bought item ${itemId} successfully` })
                    })
                    .catch(function(err) {
                        console.dir(err);
                        if (err.message.includes("ECONNREFUSED") || err.message.includes("ENOTFOUND")) {
                            throw new Error('Shop service is down!');
                        } else {
                            console.error(err);
                            throw new Error(err.message);
                        }
                    });
                },
                getUsers: function(args, cb) {
                    console.log('getUsers()')
                    return commWrapper.getUsers()
                },
                getUser: function(args, cb) {
                    console.log('getUser()')
                    const {userId} = args
                    return commWrapper.getUser(userId);
                }
			}
		}
	};

	soap.listen(app, "/wsdl", CommunicatorService, xml, function() {
		console.log("soap started");
	});
}

module.exports = soapRouter;