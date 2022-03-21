import { $, $$ } from './util.js';
import { FONT_SIZE, FONT_STRING } from './globals.js';
import Engine from './engine.js';
import evt from './events.js';


import './components/color-picker.js';
import './components/input-field.js';
import './components/nickname-field.js';
import './components/user-list.js';
import './components/map.js';

/*
const InputField = (function () {

    const element = document.createElement('input');
    element.maxLength = 255;
    element.style.fontSize = `${FONT_SIZE}px`;
    element.style.fontFamily = FONT_STRING;
    element.classList.add("TextInput");

    var x = 0,
        y = 0;

    const set = (newX, newY) => {
        x = newX;
        y = newY;
        element.style.left = `${newX}px`;
        element.style.top = `${newY}px`;
    };

    const hide = () => element.classList.add("hidden");
    const unhide = () => element.classList.remove("hidden");

    const focus = () => element.focus();
    const unfocus = () => element.blur();

    const setColor = newColor => {
        element.style.color = COLORS.toRGB(newColor);
    };

    hide();
    $(".canvas-wrapper").appendChild(element)

    //Evt handler for textarea defocus
    const blurHandler = function (e) {
        element.value = '';     //Clear inputted text
        hide();                 //Hide form (user has submitted)
    };

    const submitHandler = function () {
        let {wx,wy,wz} = Engine.coords;
        let textObj = new Text(InputField.x + wx,
            InputField.y + wy,
            wz,
            InputField.value, selectedColor.color);
        // console.log(textObj);
        evt.emit('text', textObj);
        // SocketIO.sendText(textObj);     //Send data to server
        unfocus();           //Unfocus input area
    };

    //Check for enter
    const keypressHandler = function (e) {
        if (e.code === 'Enter')
            submitHandler();
    };

    element.addEventListener("blur", blurHandler);
    element.addEventListener("submit", submitHandler);
    element.addEventListener("keypress", keypressHandler);

    evt.on("mouse-up", data => {
        console.log('ay');
        set(data.x,data.y);
        unhide();
        focus();
    });

    return {
        element: element,
        set: set,
        hide: hide,
        unhide: unhide,
        focus: focus,
        unfocus: unfocus,
        setColor: setColor,
        get value() {
            return element.value;
        },
        get x() {
            return x;
        },
        get y() {
            return y;
        }
    };
})();

const NicknameField = (function() {
    const inputElement = $("#nickname-field");
    const editButton = $("#nickname-toggle-edit");

    let editable = false;
    let nick = "";
    inputElement.value = '';

    const enableEdit = () => {
        inputElement.classList.add("editable");
        inputElement.removeAttribute("disabled");
        editable = true;
    };

    const disableEdit = () => {
        inputElement.classList.remove("editable");
        inputElement.setAttribute("disabled","");
        editable = false;
    }

    const editClick = () => {
        enableEdit();
        inputElement.focus();
        inputElement.select();
    };

    const nicknameBlur = e => {
        disableEdit();
        UserNick = nick;
        SocketIO.nicknameUpdate();
        evt.emit('nick-update', nick);
    };

    const nicknameChange = e => {
        nick = e.target.value;
    };

    const nicknameSubmit = e => {
        if (e.code === 'Enter')
            e.target.blur();
    }

    editButton.addEventListener("click", editClick);
    inputElement.addEventListener("change", nicknameChange);
    inputElement.addEventListener("blur", nicknameBlur);
    inputElement.addEventListener("keydown", nicknameSubmit);
})();

const UsersList = (function() {
    const listElement = $("#connected-users-list");

    let userList = {}

    const updateUsers = function(newUsers) {
        if (newUsers)
            userList = newUsers;
        listElement.innerHTML = '';
        Object.keys(userList).forEach(userId => {
            let li = document.createElement('li');
            let nickString = userList[userId];

            if (userId === UserId) {
                nickString += " (YOU)";
                // li.style.color = 'blue';   
            }
            
            li.textContent = nickString;
            listElement.appendChild(li);
        });
        // newUsers.forEach(user => {
        //     let tr = document.createElement('tr');
        //     let td = document.createElement('td');
        //     td.textContent = user;
        //     tr.appendChild(td);
        //     listElement.appendChild(tr);
        // });
    }

    return {
        updateUsers: updateUsers
    };
})();

evt.on("userUpdate", users => {
    UsersList.updateUsers(users);
});

export { UsersList };*/