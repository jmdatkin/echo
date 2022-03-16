import { $, $$ } from '../util';
import evt from '../events';

const COLORS = {
    "black": {
        r: 0,
        b: 0,
        g: 0,
    },
    "red": {
        r: 236,
        g: 35,
        b: 35
    },
    "orange": {
        r: 215,
        g: 140,
        b: 45
    },
    "green": {
        r: 47,
        g: 232,
        b: 21
    },
    "blue": {
        r: 0,
        g: 195,
        b: 255
    },
    "purple": {
        r: 131,
        g: 0,
        b: 221
    },
    toRGB: function (c) {
        let obj = this[c];
        return `rgb(${obj.r},${obj.g},${obj.b})`;
    },
    toRGBA: function (c, a) {
        let obj = this[c];
        return `rgba(${obj.r},${obj.g},${obj.b},${a})`;
    }
};

const swatches = Array.from($$(".color-swatch"));
const squareSize = 25;
let selected;

let selectedColor = 'black';

// evt.emit("color-pick", "black");

swatches.forEach(swatch => {
    let thisColor = swatch.dataset.color;
    swatch.style.backgroundColor = COLORS.toRGB(thisColor);
    swatch.style.width = `${squareSize}px`;
    swatch.style.height = `${squareSize}px`;
    swatch.addEventListener("click", (e) => {
        swatches.forEach(s => {
            s.classList.remove("color-swatch-selected");
        });
        e.target.classList.add("color-swatch-selected");
        selected = e.target;
        selectedColor = thisColor;
        evt.emit("color-pick", thisColor);
        // selectedcolor.color = thiscolor;
    });
});

export { COLORS, selectedColor };