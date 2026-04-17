const canvas = document.querySelector(".bloom-layer");
const context = canvas.getContext("2d");
const blobs = [];

const colors = [
  [104, 210, 255],
  [127, 243, 191],
  [177, 173, 255],
  [246, 238, 153],
];

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function addBlob(x, y) {
  const baseRadius = 80 + Math.random() * 70;
  const angle = Math.random() * Math.PI * 2;

  blobs.push({
    x,
    y,
    radius: baseRadius,
    bornAt: performance.now(),
    ttl: 1200 + Math.random() * 700,
    driftX: Math.cos(angle) * (0.18 + Math.random() * 0.22),
    driftY: Math.sin(angle) * (0.18 + Math.random() * 0.22),
    paletteOffset: Math.floor(Math.random() * colors.length),
  });
}

function drawBlob(blob, now) {
  const age = now - blob.bornAt;
  const life = 1 - age / blob.ttl;

  if (life <= 0) {
    return false;
  }

  const spread = blob.radius * (1 + (1 - life) * 1.1);
  const offsetX = blob.driftX * age;
  const offsetY = blob.driftY * age;

  context.save();
  context.globalCompositeOperation = "lighter";

  for (let i = 0; i < 3; i += 1) {
    const color = colors[(blob.paletteOffset + i) % colors.length];
    const gradient = context.createRadialGradient(
      blob.x + offsetX + (i - 1) * 36,
      blob.y + offsetY + (1 - i) * 18,
      spread * 0.1,
      blob.x + offsetX + (i - 1) * 36,
      blob.y + offsetY + (1 - i) * 18,
      spread
    );

    gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${0.18 * life})`);
    gradient.addColorStop(0.45, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${0.11 * life})`);
    gradient.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);

    context.fillStyle = gradient;
    context.beginPath();
    context.arc(
      blob.x + offsetX + (i - 1) * 36,
      blob.y + offsetY + (1 - i) * 18,
      spread,
      0,
      Math.PI * 2
    );
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

  if (now - lastPoint < 34) {
    return;
  }

  lastPoint = now;
  addBlob(event.clientX, event.clientY);
});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
requestAnimationFrame(render);
