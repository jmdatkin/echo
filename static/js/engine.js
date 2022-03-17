import { $, $$ } from './util.js';
import Canvas from './canvas.js';
import evt from './events.js';

let UserId = '';
let connected = false;

var iid;
const persistTime = 7500;
const fadeDelta = 300;

Canvas.resize(window.innerWidth, window.innerHeight);
window.addEventListener('resize', () => {
    Canvas.resize(window.innerWidth, window.innerHeight);
});

let coords = { x: 0, y: 0, z: 0 };

let texts = [];

evt.on('hello-id', id => UserId = id);

evt.on('textUpdate', newTexts => {
    texts = newTexts;
    // texts.push(text);
});

evt.on('coord-update', newCoords => {
    Object.assign(coords, newCoords)
    // coords = coords;
    // $("#coord-indicator").textContent = `x: ${coords.x}, y: ${coords.y}`;
    $("#coord-indicator").textContent = `(${coords.x}, ${coords.y})`;
});

const step = function () {
    let now = Date.now();
    Canvas.clear();
    // Draw.clear();
    Canvas.drawGrid();  //First draw grid
    texts.forEach((text) => {   //Draw all current texts
        // console.log(texts);
        let textObj = text.data;
        // console.log(textObj);
        let dTime = now - textObj.time;
        let alpha = dTime < persistTime ? 1.0 : Math.max(0, fadeDelta - (dTime - persistTime)) / fadeDelta;
        Canvas.drawText(textObj);
        // let color = COLORS.toRGBA(textObj.color, alpha);//`rgba(0,0,0,${alpha}`;
        // Draw.drawText(textObj, color);
    });
    window.requestAnimationFrame(step);
};

const start = function () {
    iid = window.requestAnimationFrame(step);
}

const stop = function () {
    window.cancelAnimationFrame(iid);
}

export default { start, stop, coords: coords, get UserId() { return UserId; } };