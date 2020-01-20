// Getting <canvas> element from HTML document
// Could also getElementById . . .
var canvas = document.querySelector('canvas');

// Setting the <canvas> width & height properties
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

// I would like for everything to continue working whenever I resize the page, so:
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

/* I want the circles to have to slowly fill in the open space whenever user's
window goes from a minimized state to a maximized state, so I will not be added
any more code to correct this. */

// Getting context to draw on CANVAS
var c = canvas.getContext('2d');

// Declaring some global variables here for later use
var mouse = {
  x: undefined,
  y: undefined,
};

var maxRadius = 30;
var minRadius = 2;

var colorArray = [
  '#000000',
  '#ffffff',
  '#1d6582'
];

/* Setting up the Circle function to refer back to within later functions, giving
each circle its own (x, y) value */
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

// Drawing
  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.strokeStyle = 'black';
    c.fill();
    c.stroke();
  };

/* Updating location of circles and calling draw function*/
  this.update = function() {

    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

/* Interactivity (keeps circles from expanding beyond a certain point, then returns
them to their original size) */
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      this.radius += 1;
      if (this.radius > maxRadius) {
        this.radius -= 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

var circleArray = [];

// Setting up the number, size, etc of the circles in the circleArray
for (var i = 0; i < 700; i++) {
  var radius = Math.random() * 4 + 2;
  var x = Math.random() * (innerWidth - radius * 2) + radius;
  var y = Math.random() * (innerHeight - radius * 2) + radius;
  var dx = (Math.random() - 0.5);
  var dy = (Math.random() - 0.5);
  circleArray.push(new Circle(x, y, dx, dy, radius));
}

/* Setting up a function that will keep looping through itself, going through each
circle for the length of circleArray and calling the update function */
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight); // Clearing circle after each iteration, so they aren't drawn atop themselves,

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }

}

animate();
