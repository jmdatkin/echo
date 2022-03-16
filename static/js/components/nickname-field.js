import { $, $$ } from '../util';
import evt from '../events';
const inputElement = $("#nickname-field");
const editButton = $("#nickname-toggle-edit");

let editable = false;
let UserNick = "";
inputElement.value = '';

const enableEdit = () => {
    inputElement.classList.add("editable");
    inputElement.removeAttribute("disabled");
    editable = true;
};

const disableEdit = () => {
    inputElement.classList.remove("editable");
    inputElement.setAttribute("disabled", "");
    editable = false;
}

const editClick = () => {
    enableEdit();
    inputElement.focus();
    inputElement.select();
};

const nicknameBlur = e => {
    disableEdit();
    // UserNick = nick;
    // SocketIO.nicknameUpdate();
    evt.emit('nick-update', UserNick);
};

const nicknameChange = e => {
    UserNick = e.target.value;
};

const nicknameSubmit = e => {
    if (e.code === 'Enter')
        e.target.blur();
}

editButton.addEventListener("click", editClick);
inputElement.addEventListener("change", nicknameChange);
inputElement.addEventListener("blur", nicknameBlur);
inputElement.addEventListener("keydown", nicknameSubmit);