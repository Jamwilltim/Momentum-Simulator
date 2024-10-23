let canvas, m1, m2, v, run, stop;
let running = false;

function setup() {
	canvas = createCanvas(600, 400);
	canvas.background(240);

	backSetup();
	wallFloor();
}

function backSetup() {
	fill(0);

	text("Mass Right", 355, 45);
	m2 = createInput();
	m2.position(430, 30);
	m2.size(50);

	text("Mass Left", 357, 75);
	m1 = createInput();
	m1.position(430, 60);
	m1.size(50);

	text("Start Velocity", 350, 105);
	v = createInput();
	v.position(430, 90);
	v.size(50);

	run = createButton("Run");
	run.position(500, 50);
	run.mousePressed(Run);
	run.size(60);

	stop = createButton("Stop");
	stop.position(500, 80);
	stop.mousePressed(Stop);
	stop.size(60);
}

let diameter = 80;

let y = 370 - diameter / 2;

let massLeft, massRight;
let vLeft, vRight;

let count = 0;

let colliding = false;

function draw() {
	if (running == true) {
		// Reset the styles
		canvas.background(240);
		wallFloor();

		// Draw the left ball;
		fill(156, 220, 255);
		cLeft.show();

		// Draw the right ball
		fill(219, 156, 255);
		cRight.show();

		// Check collisions of the balls
		colliding = cLeft.checkCollide(cRight);

		// Check collision with wall
		cLeft.checkWall();

		// Change velocities if collide
		if (colliding == true) {
			cLeft.changeVelocity(cRight);
		}

		// Move the balls
		cLeft.move();
		cRight.move();

		// Draw the count
		fill(0);
		text("Collisions = " + count, 30, 20);
	}
}

class Circle {
	constructor(x, diam, mass, v) {
		this.x = x;
		this.diam = diam;
		this.mass = mass;
		this.v = v;
	}

	checkCollide(o) {
		return !(this.x > o.x + o.diam || this.x + this.diam < o.x);
	}

	checkWall() {
		if (this.x <= 30 + this.diam / 2) {
			this.v = -this.v;
			count++;
		}
	}

	changeVelocity(o) {
		let sumOfMass = this.mass + o.mass;
		let newVelocityLeft = ((this.mass - o.mass) / sumOfMass) * this.v + ((2 * o.mass) / sumOfMass) * o.v;
		let newVelocityRight = ((o.mass - this.mass) / sumOfMass) * o.v + ((2 * this.mass) / sumOfMass) * this.v;
		this.v = newVelocityLeft;
		o.v = newVelocityRight;
		count++;
		console.log("Left Velocity: " + this.v + "    Right Velocity: " + o.v);
	}

	move() {
		this.x += this.v;
	}

	show() {
		ellipse(this.x, 370 - this.diam / 2, this.diam);
	}
}

function wallFloor() {
	line(30, 30, 30, 370);
	line(30, 370, width, 370);
}

function Run() {
	running = true;

	massLeft = float(m1.value());
	massRight = float(m2.value());

	vRight = (-1 * v.value()) / 2;
	vLeft = 0;

	cLeft = new Circle(200, diameter, massLeft, vLeft);
	cRight = new Circle(400, diameter, massRight, vRight);

	count = 0;
}

function Stop() {
	running = false;
	canvas.background(240);
	backSetup();
	wallFloor();
	count = 0;
}
