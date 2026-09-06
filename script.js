// ==========================================
// DQSN PORTFOLIO — INTERACTIONS
// ==========================================
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
let mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  const glow = document.querySelector(".cursor-glow");
  if (glow) {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }
});
// ==========================================
// PARTICLES
// ==========================================
function createParticles() {
  particles = [];
  const amount = Math.min(
    Math.floor(window.innerWidth / 9),
    130
  );
  for (let i = 0; i < amount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.7 + .3,
      speed: Math.random() * .35 + .08,
      opacity: Math.random() * .7 + .1
    });
  }
}
createParticles();
window.addEventListener("resize", createParticles);
function animateParticles() {
  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );
  particles.forEach((particle) => {
    particle.y -= particle.speed;
    if (particle.y < -10) {
      particle.y = canvas.height + 10;
      particle.x = Math.random() * canvas.width;
    }
    const distanceX = particle.x - mouse.x;
    const distanceY = particle.y - mouse.y;
    const distance = Math.sqrt(
      distanceX * distanceX +
      distanceY * distanceY
    );
    let size = particle.size;
    if (distance < 180) {
      size += (180 - distance) / 100;
    }
    ctx.beginPath();
    ctx.arc(
      particle.x,
      particle.y,
      size,
      0,
      Math.PI * 2
    );
    ctx.fillStyle =
      `rgba(69,165,255,${particle.opacity})`;
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
// ==========================================
// SCROLL REVEALS
// ==========================================
const revealElements =
  document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: .12
  }
);
revealElements.forEach((element) => {
  observer.observe(element);
});
// ==========================================
// 3D CARD TILT
// ==========================================
const cards =
  document.querySelectorAll(".tilt");
cards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect =
      card.getBoundingClientRect();
    const x =
      event.clientX - rect.left;
    const y =
      event.clientY - rect.top;
    const centerX =
      rect.width / 2;
    const centerY =
      rect.height / 2;
    const rotateX =
      ((y - centerY) / centerY) * -5;
    const rotateY =
      ((x - centerX) / centerX) * 5;
    card.style.transform =
      `perspective(1000px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       translateZ(8px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  });
});
// ==========================================
// SMOOTH NAVIGATION
// ==========================================
document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {
    link.addEventListener("click", (event) => {
      const target =
        document.querySelector(
          link.getAttribute("href")
        );
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({
        behavior: "smooth"
      });
    });
  });
// ==========================================
// HERO PARALLAX
// ==========================================
const hero =
  document.querySelector(".hero");
const orb =
  document.querySelector(".orb");
window.addEventListener("scroll", () => {
  if (!hero || !orb) return;
  const scroll =
    window.scrollY;
  if (scroll < window.innerHeight) {
    orb.style.transform =
      `translateY(${-scroll * .08}px)`;
  }
});
// ==========================================
// MOUSE PARALLAX ON ORB
// ==========================================
document.addEventListener("mousemove", (event) => {
  if (!orb) return;
  const x =
    (event.clientX / window.innerWidth - .5) * 20;
  const y =
    (event.clientY / window.innerHeight - .5) * 20;
  orb.style.setProperty(
    "--mouse-x",
    `${x}deg`
  );
  orb.style.setProperty(
    "--mouse-y",
    `${y}deg`
  );
});
