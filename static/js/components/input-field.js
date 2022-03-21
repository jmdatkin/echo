import { $, $$ } from '../util.js';
import { FONT_SIZE, FONT_STRING } from '../globals.js';
import { COLORS, selectedColor } from './color-picker.js';
import Canvas from '../canvas.js';
import Engine from '../engine.js';
import Text from '../text.js';
import evt from '../events.js';

//User input DOM element
const element = document.createElement('input');
element.maxLength = 255;
element.style.fontSize = `${FONT_SIZE}px`;
element.style.fontFamily = FONT_STRING;
element.classList.add("TextInput");

//Current position of field
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

evt.on("color-pick", newColor => {
    element.style.color = COLORS.toRGB(newColor);
})

hide();
$(".canvas-wrapper").appendChild(element)

//Evt handler for textarea defocus
const blurHandler = function (e) {
    element.value = '';     //Clear inputted text
    hide();                 //Hide form (user has submitted)
};

const submitHandler = function () {
    // let wx = Engine.coords.x;
    // let wy = Engine.coords.y;
    // let wz = Engine.coords.z;
    let wx = Canvas.canvasCoords.x;
    let wy = Canvas.canvasCoords.y;
    let wz = Canvas.canvasCoords.z;

    let textObj = new Text(x + wx,
        y + wy,
        wz,
        element.value, selectedColor);
    evt.emit('text', textObj);
    // SocketIO.sendText(textObj);     //Send data to server
    unfocus();           //Unfocus input area
};

//Check for enter
const keypressHandler = function (e) {
    if (e.code === 'Enter' || e.code === 'NumpadEnter')
        submitHandler();
};

element.addEventListener("blur", blurHandler);
element.addEventListener("submit", submitHandler);
element.addEventListener("keypress", keypressHandler);

evt.on("mouse-up", data => {
    set(data.x, data.y);
    unhide();
    focus();
});

export default {
    element: element,
    set: set,
    hide: hide,
    unhide: unhide,
    focus: focus,
    unfocus: unfocus,
    // setColor: setColor,
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