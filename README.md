# Momentum Simulator

A browser-based simulator built with [p5.js](https://p5js.org/) that visualizes elastic collisions between two balls, demonstrating conservation of momentum.

## Features

- Set custom mass for the left and right balls
- Set a starting velocity for the collision
- Watch the balls collide elastically off each other and bounce off the left wall
- Live collision counter

## Getting Started

1. Clone or download this repository.
2. Open `index.html` in a web browser.
3. Enter values for **Mass Left**, **Mass Right**, and **Start Velocity**.
4. Click **Run** to start the simulation.
5. Click **Stop** to reset.

No build step or installation is required — the project relies on the p5.js library loaded via CDN.

## Project Structure

```
Momentum-Simulator-main/
├── index.html    # Page structure
└── sketch.js     # Simulation logic, Circle class, and collision physics
```

## How It Works

Each ball is a `Circle` with a mass and velocity. When two balls collide, their new velocities are calculated using the standard 1D elastic collision formula, which conserves both momentum and kinetic energy. Collisions with the left wall simply reverse the ball's velocity.
