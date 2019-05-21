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

	const CommunicatorService = {
		CommunicatorService: {
			CommunicatorPort: {
				getItems: function(args) {
					console.log("getting");
					return commWrapper.getItems();
                },
                buyItems: function(args, cb) {
                    const { itemId, userId } = args;
                    commWrapper.buyItem(itemId, userId)
                    .then(() => {
                        cb({result: `User ${userId} bought item ${itemId} successfully` })
                    })
                    .catch((err) => { 
                        cb({ result: err.message })
                    })
                }
                
			}
		}
	};

	soap.listen(app, "/wsdl", CommunicatorService, xml, function() {
		console.log("soap started");
	});
}

module.exports = soapRouter;