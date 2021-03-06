import { $, $$ } from '../util';
import Engine from '../engine';
import evt from '../events';

const listElement = $("#connected-users-list");

let userList = {}

const updateUsers = function (newUsers) {
    if (newUsers)
        userList = newUsers;
    listElement.innerHTML = '';
    Object.keys(userList).forEach(userId => {
        let li = document.createElement('li');
        let nickString = userList[userId];

        if (userId === Engine.UserId) {
            nickString += " (YOU)";
        }

        li.textContent = nickString;
        listElement.appendChild(li);
    });
}

evt.on("userUpdate", users => {
    updateUsers(users);
});

evt.on("hello-id", id => {
    console.log(id);
    updateUsers();
});