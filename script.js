// Destructure Matter.js modules
const { Engine, Render, World, Bodies, Body, Mouse, MouseConstraint } = Matter;

// Create the engine and renderer
const engine = Engine.create();
const canvas = document.getElementById('wordCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const render = Render.create({
  canvas: canvas,
  engine: engine,
  options: {
    wireframes: false,
    background: '#f0f0f0'
  }
});

// Define the words for your cloud
const words = ['CMS', 'Ghost', 'WordPress', 'Automation', 'ChatGPT', 'Analytics', 'SEO', 'API'];
// Create physics bodies for each word (using rectangles as placeholders)
const bodies = words.map(word => {
  // Random position for each word; adjust width/height as needed
  return Bodies.rectangle(
    Math.random() * canvas.width,
    Math.random() * canvas.height,
    120, 50,
    { label: word, restitution: 0.9 }
  );
});

// Add all word bodies to the world
World.add(engine.world, bodies);

// Add mouse control for interactive effects
const mouse = Mouse.create(canvas);
const mouseConstraint = MouseConstraint.create(engine, { mouse: mouse });
World.add(engine.world, mouseConstraint);

// Run the engine and renderer
Engine.run(engine);
Render.run(render);

// Enhance interactivity: apply a repulsive force on mouse movement
canvas.addEventListener('mousemove', (event) => {
  bodies.forEach(body => {
    const dx = body.position.x - event.clientX;
    const dy = body.position.y - event.clientY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 150) {
      // Apply a small force away from the mouse pointer
      Body.applyForce(body, body.position, {
        x: (dx / distance) * 0.0005,
        y: (dy / distance) * 0.0005
      });
    }
  });
});

