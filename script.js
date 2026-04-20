const canvas = document.querySelector(".bloom-layer");
const context = canvas.getContext("2d");
const themeToggle = document.querySelector("#theme-toggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const blobs = [];
const MAX_BLOBS = 16;

// Five colors spread across warm + cool so no hue family dominates.
// Each blob picks three colors independently at random, so ordering doesn't bias output.
const paletteLight = [
  [255, 179, 122], // warm amber
  [255, 160, 180], // warm rose
  [190, 180, 255], // cool lavender
  [140, 220, 200], // cool mint
  [120, 205, 255], // cool sky
];

const paletteDark = [
  [255, 170, 115], // warm amber
  [255, 150, 175], // warm rose
  [185, 175, 255], // cool lavender
  [145, 225, 200], // cool mint
  [130, 215, 255], // cool sky
];

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function getTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getPalette() {
  return getTheme() === "dark" ? paletteDark : paletteLight;
}

function pickLayerColors() {
  const palette = getPalette();
  return [
    palette[Math.floor(Math.random() * palette.length)],
    palette[Math.floor(Math.random() * palette.length)],
    palette[Math.floor(Math.random() * palette.length)],
  ];
}

function applyTheme(theme) {
  const resolvedTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = resolvedTheme;
  localStorage.setItem("portfolio-theme", resolvedTheme);

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(resolvedTheme === "dark"));
    themeToggle.setAttribute(
      "aria-label",
      resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );
  }
}

function addBlob(x, y) {
  if (reducedMotion.matches) return;

  const baseRadius = 110 + Math.random() * 70;
  const angle = Math.random() * Math.PI * 2;

  blobs.push({
    x,
    y,
    radius: baseRadius,
    bornAt: performance.now(),
    ttl: 1400 + Math.random() * 700,
    driftX: Math.cos(angle) * (0.12 + Math.random() * 0.14),
    driftY: Math.sin(angle) * (0.12 + Math.random() * 0.14),
    layerColors: pickLayerColors(),
  });

  if (blobs.length > MAX_BLOBS) {
    blobs.splice(0, blobs.length - MAX_BLOBS);
  }
}

function drawBlob(blob, now) {
  const age = now - blob.bornAt;
  const life = 1 - age / blob.ttl;

  if (life <= 0) {
    return false;
  }

  const alpha = getTheme() === "dark" ? 0.1 : 0.12;
  const spread = blob.radius * (1 + (1 - life) * 1.1);
  const offsetX = blob.driftX * age;
  const offsetY = blob.driftY * age;

  context.save();
  context.globalCompositeOperation = "lighter";

  for (let i = 0; i < 3; i += 1) {
    const color = blob.layerColors[i];
    const cx = blob.x + offsetX + (i - 1) * 36;
    const cy = blob.y + offsetY + (1 - i) * 18;
    const gradient = context.createRadialGradient(cx, cy, spread * 0.1, cx, cy, spread);

    gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * life})`);
    gradient.addColorStop(0.45, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * 0.55 * life})`);
    gradient.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);

    context.fillStyle = gradient;
    context.beginPath();
    context.arc(cx, cy, spread, 0, Math.PI * 2);
    context.fill();
  }

  context.restore();
  return true;
}

function render(now) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = blobs.length - 1; i >= 0; i -= 1) {
    if (!drawBlob(blobs[i], now)) {
      blobs.splice(i, 1);
    }
  }

  requestAnimationFrame(render);
}

let lastPoint = 0;

window.addEventListener("pointermove", (event) => {
  const now = performance.now();
  if (now - lastPoint < 75) return;
  lastPoint = now;
  addBlob(event.clientX, event.clientY);
});

window.addEventListener("resize", resizeCanvas);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    applyTheme(getTheme() === "dark" ? "light" : "dark");
  });
}

resizeCanvas();
applyTheme(getTheme());

if (!reducedMotion.matches) {
  requestAnimationFrame(render);
}
