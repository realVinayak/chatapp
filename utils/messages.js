const moment = require('moment')

function messageObject(userName, messageText){
    return {
        userName,
        messageText,
        time: moment().format('h:mm a')
    };
}

module.exports = messageObject;