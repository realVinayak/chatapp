const users = []

function joinUser(id, userName, roomName){
    let userObj = {id, userName, roomName};
    users.push(userObj);
}

function findUser(id){
    return users.find(user => user.id === id);
}

function removeUser(id){
    user_to_remove_index = users.indexOf(findUser(id));
    users.slice(user_to_remove_index);
}

function getUsersByRoom(room){
    return (users.filter(user_ => user_.roomName === room).map(user_here => user_here.userName));
}
module.exports = {
    joinUser,
    findUser,
    removeUser,
    getUsersByRoom
}
