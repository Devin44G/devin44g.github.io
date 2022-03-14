/*
   FILE USES CIRCLE CLASS FOR CIRCLE.JS FILE
*/

// GETTING CANVAS ELEMENT
const CANVAS = document.querySelector('canvas');

// DECLARING VARS
const mousePos = { x: null, y: null };
const context = CANVAS.getContext('2d');
const maxRadius = 50;
const minRadius = 2;
const colorArray = ['#000000','#ffffff','#1d6582','#ff6c24'];
let circleArray = [];

// METHOD FOR SETTING CANVAS WIDTH & HEIGHT
const setCanvasSize = () => {
  let width = window.innerWidth;
  let height = window.innerHeight;

  CANVAS.width  = width;
  CANVAS.height = height;
};
setCanvasSize();

// METHOD FOR SETTING VARIED CIRCLE ATTRIBUTES (size, speed, number)
const setCircleAttrs = (density) => {
  for (let i = 0; i < density; i++) {
    let radius = Math.floor(Math.random() * 4 + 2);
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5);
    let dy = (Math.random() - 0.5);
    circleArray.push(new Circle(x, y, dx, dy, radius, maxRadius));
  }
}

setCircleAttrs(300);

// RESETTING CANVAS SIZE UPON WINDOW RESIZE
window.addEventListener('resize', () => {
  setCanvasSize();
});

// GETTING MOUSE POSITION UPON MOUSE MOVE
window.addEventListener('mousemove', (e) => {
  mousePos.x = e.x;
  mousePos.y = e.y;
});

// METHOD FOR ANIMATING CIRCLES
function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, CANVAS.width, CANVAS.height);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
