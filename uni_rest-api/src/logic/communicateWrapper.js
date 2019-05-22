const req = require("request-promise");
const Promise = require("bluebird");
const communicator = require("../logic/communicator");
const dataStorage = require('../logic/dataStorage')


class CommunicateWrapper {
    getItems() {
        return communicator.getItems();
    }
    buyItem(itemId, userId) {
        return Promise.try(async function() {
            console.log('inside try')
            const user = dataStorage.get(userId);
            if (!user) throw new Error(`User ${userId} does not exist!`);
    
            const item = await communicator.getItem(itemId);
            if (!item) throw new Error("Invalid item");
    
            if (user.balance <= item.price) throw new Error("User does not have enough balance.");
            console.log('asdasd')
            const boughtItem = await communicator.buyItem(itemId);
            console.log('after bought item')
            dataStorage.update(userId, {
                balance: user.balance - item.price,
                items: [boughtItem]
            });
            console.log('returning')
            return null;
        })
    }    
}


module.exports = new CommunicateWrapper();