const req = require("request-promise");
const Promise = require("bluebird");
const communicator = require("../logic/communicator");
const dataStorage = require('../logic/dataStorage')
const _ = require('lodash')
const usersLogic = require("../logic/users");

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
    getUsers() {
        const allUsers = dataStorage.getAll();
        const usersWithIds = _.map(allUsers, (user, userId) => {
            return {
                id: userId,
                ...user
            };
        });
    
        return Promise.try(function() {
            return Promise.map(usersWithIds, function(user) {
                return usersLogic.attachItemsToUser(user);
            });
        }).then(function(usersWithItems) {
            console.log("got all users with items");
            console.dir(usersWithItems);
            return usersWithItems
        })
    } 
    async getUser(userId) {
        const users = await this.getUsers();
        const kUsers = _.keyBy(users, 'id')
        return kUsers[userId];
    }
}


module.exports = new CommunicateWrapper();
