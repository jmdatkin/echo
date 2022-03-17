import { $, $$ } from './util';
import Engine from './engine';
import evt from './events';
import { GRID_SIZE, FONT_SIZE, FONT_STRING } from './globals';
import { COLORS } from './components/color-picker';

const canvas = $("#main-canv");
const ctx = canvas.getContext("2d");

let c_width = 1600;
let c_height = 900;


const resize = function (w, h) {
    c_width = w;
    c_height = h;
    canvas.width = c_width;
    canvas.height = c_height;
};

const floorMod = function (n, m) {
    return ((n % m) + m) % m;
};


const draw = function (method) {
    method(ctx);
};

const clear = function () {
    ctx.clearRect(0, 0, c_width, c_height);
};

const drawGrid = function () {
    // const minorColor = "#f0f0f0";
    // const majorColor = "#e5e5e5";
    const minorColor = "rgba(1.0,1.0,1.0,0.10)";
    const majorColor = "rgba(1.0,1.0,1.0,0.15)";

    let majorGridSize = GRID_SIZE * 5;
    let i = GRID_SIZE - floorMod(Engine.coords.x, GRID_SIZE);
    let j = GRID_SIZE - floorMod(Engine.coords.y, GRID_SIZE);

    //Minor gridlines: gridlines within each group of 5
    let ii = i;
    ctx.beginPath();
    while (ii <= c_width) {
        ctx.moveTo(ii, 0);
        ctx.lineTo(ii, c_height);
        ii += GRID_SIZE;
    }

    let jj = j;
    while (jj <= c_height) {
        ctx.moveTo(0, jj);
        ctx.lineTo(c_width, jj);
        jj += GRID_SIZE;
    }

    ctx.lineWidth = 1;
    ctx.strokeStyle = minorColor;
    ctx.stroke();

    //Major gridlines: gridlines marking intervals of 5 minor gridlines
    i = majorGridSize - floorMod(Engine.coords.x, majorGridSize);
    j = majorGridSize - floorMod(Engine.coords.y, majorGridSize);

    ii = i;
    ctx.beginPath();
    while (ii <= c_width) {
        ctx.moveTo(ii, 0);
        ctx.lineTo(ii, c_height);
        ii += majorGridSize;
    }

    jj = j;
    while (jj <= c_height) {
        ctx.moveTo(0, jj);
        ctx.lineTo(c_width, jj);
        jj += majorGridSize;
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = majorColor;
    ctx.stroke();
};

const drawText = function (text) {
    let color = COLORS.toRGB(text.color);
    ctx.fillStyle = color;
    let dz = Engine.coords.z - text.z;
    let thisFontSize = FONT_SIZE;
    let fontString = `${thisFontSize}px ${FONT_STRING}`;
    ctx.font = fontString;
    // ctx.textBaseline = "alpha";

    //Adjust for offset between canvas text render and DOM style properties
    ctx.fillText(text.value,
        text.x - Engine.coords.x,
        text.y + FONT_SIZE - 2 - Engine.coords.y);
};

/*------------------ MOUSE EVENTS -------------------*/
const bindEvents = function () {
    let delta = 81;
    let initialX, initialY, wx, wy, drag;

    const mouseMoveHandler = (e) => {
        let m = e.touches ? e.touches[0] : e;

        let dragUpdated;

        let cursorX = m.pageX,
            cursorY = m.pageY;

        let dx = cursorX - initialX;
        let dy = cursorY - initialY;

        let dist = dx * dx + dy * dy;

        if (dist > delta) {
            dragUpdated = true;
            canvas.classList.add("dragged");
            // Engine.coords.x = wx - dx;
            // Engine.coords.y = wy - dy;

            evt.emit("coord-update", { x: wx - dx, y: wy - dy });

        }
        else
            dragUpdated = false;

        drag = dragUpdated;
    };

    const mouseDownHandler = (e) => {
        let m = e.touches ? e.touches[0] : e;
        initialX = m.pageX;
        initialY = m.pageY;
        wx = Engine.coords.x;
        wy = Engine.coords.y;
        drag = false;

        canvas.addEventListener('mousemove', mouseMoveHandler);
        canvas.addEventListener('touchmove', mouseMoveHandler);
    };

    canvas.addEventListener('mousedown', mouseDownHandler);
    canvas.addEventListener('touchdown', mouseDownHandler);

    const mouseUpHandler = (e) => {
        canvas.classList.remove("dragged");
        if (!drag) {
            let m = e.touches ? e.touches[0] : e;
            let x = m.pageX;
            let y = m.pageY;

            evt.emit("mouse-up", { x, y });
            // InputField.set(x, y);
            // InputField.unhide();
            // InputField.focus();
        }
        canvas.removeEventListener('mousemove', mouseMoveHandler);
        canvas.removeEventListener('touchmove', mouseMoveHandler);
    };
    canvas.addEventListener('mouseup', mouseUpHandler);
    canvas.addEventListener('touchend', mouseUpHandler);
};

bindEvents();

export default {
    draw,
    drawGrid,
    drawText,
    clear,
    resize
};