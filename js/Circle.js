class Circle {
  constructor(x, y, dx, dy, radius, maxRadius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.maxRadius = maxRadius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  }

  // METHOD FOR DRAWING A CIRCLE
  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.strokeStyle = 'black';
    context.fill();
    context.stroke();
  }

  // METHOD FOR UPDATING A CIRCLE'S ATTRIBUTES
  update() {
    let positionRight = this.x + this.radius;
    let positionLeft = (this.x - this.radius);
    let positionTop = (this.y - this.radius);
    let positionBottom = (this.y + this.radius);
    let mouseDistanceX = (mousePos.x - this.x);
    let mouseDistanceY (mousePos.y - this.y);

    // Setting Boundaries
    if (positionRight > window.innerWidth || positionLeft < 0) {
      this.dx *= -1;
    }

    if (positionTop > window.innerHeight || positionBottom < 0) {
      this.dy *= -1;
    }

    // Setting Movement Speed
    this.x += this.dx;
    this.y += this.dy;

    if (mouseDistanceX < 100 && mouseDistanceX > -100 && mouseDistanceY < 100 && mouseDistanceY > -100) {
      this.radius += 1;
      if (this.radius > this.maxRadius) {
        this.radius -= 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
}
