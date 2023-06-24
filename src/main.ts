import "./style.css";

const canvas: HTMLCanvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement;
const ctx = canvas?.getContext("2d");
const mouse = { x: 0, y: 0 };
const particles: Particle[] = [];
let hue = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.addEventListener("click", (e) => {
  [mouse.x, mouse.y] = [e.clientX, e.clientY];
  initParticles();
});
canvas.addEventListener("mousemove", (e) => {
  [mouse.x, mouse.y] = [e.clientX, e.clientY];
  initParticles();
});
canvas.addEventListener("touchmove", (e) => {
  [mouse.x, mouse.y] = [e.touches[0].clientX, e.touches[0].clientY];
  initParticles();
});

const randomNumRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const getColor = () => `hsl(${hue}, 100%, 50%)`;

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = 10;
    this.speedX = randomNumRange(-2.5, 2.5);
    this.speedY = randomNumRange(-2.5, 2.5);
    this.color = getColor();
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.05;
  }
  draw() {
    if (!ctx) return;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    // x, y, radius, start degree, end degree
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  for (let x = 0; x < 25; x++) {
    particles.push(new Particle());
  }
}

function setParticle() {
  for (let x = 0; x < particles.length; x++) {
    particles[x].update();
    particles[x].draw();
    if (particles[x].size < 0.3) {
      particles.splice(x, 1);
    }
  }
}

function animate() {
  if (!ctx) return;
  ctx.fillStyle = "rgb(0,0,0,0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  setParticle();
  hue += 0.5;
  requestAnimationFrame(animate);
}

animate();
