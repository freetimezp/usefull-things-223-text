const canvas = document.getElementById("water");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x, y, r, s) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.speed = s;
        this.alpha = Math.random() * 0.6 + 0.3;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 191, 255, ${this.alpha})`;
        ctx.fill();
    }
    update() {
        this.y -= this.speed;
        if (this.y < -10) {
            this.y = canvas.height + 10;
            this.x = Math.random() * canvas.width;
        }
        this.draw();
    }
}

for (let i = 0; i < 150; i++) {
    particles.push(
        new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 3 + 1,
            Math.random() * 0.5 + 0.2
        )
    );
}

let t = 0;
function animate() {
    t += 0.02;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // create distortion waves
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, `hsl(${200 + Math.sin(t) * 20}, 100%, 50%)`);
    gradient.addColorStop(1, `hsl(${210 + Math.cos(t) * 20}, 100%, 40%)`);
    ctx.fillStyle = gradient;
    ctx.globalAlpha = 0.08;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;

    particles.forEach((p) => p.update());
    requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
