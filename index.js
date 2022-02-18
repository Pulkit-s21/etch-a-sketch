// The canvas is the elements and the place where we do our drawing is called the context, where we will be drawing our circles and everything too.

const canvas = document.querySelector("#etch-a-sketch");
const ctx = canvas.getContext("2d");
const shakeBtn = document.querySelector(".shake");
const move_amount = 10;

// These 2 settings make sure we have a smooth drawing
ctx.lineJoin = "round";
ctx.lineCap = "round"; // we can use sqaure as well but we want round for this project
ctx.lineWidth = 15;

// beginPath does is you can think drawing with a marker. You have to start by placing the marker somewhere on the page, which is the equivalent of beginPath
//ctx.beginPath();

// will place the dot 200 pixels from the left and 200 pixels from the top. 
// ctx.moveTo(200, 200);
// ctx.lineTo(200, 200);
// ctx.stroke();

// const width = canvas.width;
// const height = canvas.height;

// short form of doing this if we are making variables from a property on an object is

// That is called destructuring.
// Meaning that yo take the width property and put it into a variable width, and take the height property and put it ito the variable height.

const { width, height } = canvas;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

function handleKey(e) {
    if (e.key.includes("Arrow")) {
        e.preventDefault();
        draw({ key: e.key });
    }
}

// function draw(options) {
//     console.log(options.key);
// }

let hue = 0; // it needs to be let cz we want to chng the value whn user presses any arrowKey
ctx.strokeStyle = `hsl(${hue},100%,50%)`;
// short form of this is
function draw({ key }) {
    hue += 10;
    ctx.strokeStyle = `hsl(${hue},100%,50%)`;
    ctx.beginPath();
        ctx.moveTo(x, y);
        // move the x,y values depending on what user entered
    switch (key) {
        case "ArrowUp":
            y -= move_amount;
            break;
        case "ArrowDown":
            y += move_amount;
            break;
        case "ArrowLeft":
            x -= move_amount;
            break;
        case "ArrowRight":
            x += move_amount;
            break;
        default:
            break;
        }
        ctx.lineTo(x, y);
        ctx.stroke();
}

function clearCanvas() {
    canvas.classList.add("shake");
    ctx.clearRect(0, 0, width, height);
    canvas.addEventListener("animationend", () => {
        canvas.classList.remove("shake");
    }, { once: true });
}

shakeBtn.addEventListener("click", clearCanvas);
window.addEventListener("keydown", handleKey);