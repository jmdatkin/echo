import evt from "../events.js"
import { $ } from "../util.js";
import Canvas from "../canvas.js";
import Engine from "../engine.js";

const mapCanvas = $("#heatmap");
const ctx = mapCanvas.getContext('2d');

let points = [];

let scale = 0.055;
let pointSize = 3;

let m_width = mapCanvas.width;
let m_height = mapCanvas.height;

let m_hw = m_width/2;
let m_hh = m_height/2;

let { c_width, c_height } = Canvas;


const requestData = function() {
    evt.emit('map-data-request');
};

const clear = function() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0,m_width,m_height);
};

const drawPoint = function(point) {
    ctx.fillStyle = "#000";
    // let x = point.x - m_hw;
    // let y = point.y - m_hh;
    // let x = (point.x - Canvas.canvasCoords.x - m_hw)*scale;// - m_hw;
    // let y = (point.y - Canvas.canvasCoords.y - m_hh)*scale;// - m_hh;
    let x = (point.x - Engine.coords.x)*scale + m_hw;// * (m_width/c_width);
    let y = (point.y - Engine.coords.y)*scale + m_hh;// * (m_height/c_height);
    ctx.fillRect(x,y,pointSize,pointSize);
};

const drawPoints = function() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,pointSize,pointSize);
    points.forEach(point => {
        drawPoint(point);
    });
};

const update = function() {
    clear();
    drawPoints();
};

clear();

evt.on('map-data-response', (data) => {
    console.log('hey');
    points = data;
    update(); 
    // update(data);
});

export default { update };

