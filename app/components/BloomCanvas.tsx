"use client";

import { useEffect, useRef } from "react";

type Blob = {
  x: number;
  y: number;
  radius: number;
  bornAt: number;
  ttl: number;
  driftX: number;
  driftY: number;
  layerColors: number[][];
};

const MAX_BLOBS = 16;
const THROTTLE_MS = 75;

const paletteLight = [
  [255, 130, 130],
  [255, 170, 110],
  [255, 220, 120],
  [150, 220, 150],
  [120, 190, 255],
  [150, 140, 230],
  [205, 150, 230],
];

const paletteDark = [
  [255, 120, 130],
  [255, 165, 105],
  [255, 215, 115],
  [145, 225, 160],
  [115, 190, 255],
  [155, 145, 240],
  [210, 150, 235],
];

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

export default function BloomCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    const activeCanvas = canvas;
    const activeContext = context;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const blobs: Blob[] = [];
    let frameId = 0;
    let lastPoint = 0;
    let motionEnabled = !prefersReducedMotion.matches;

    function resizeCanvas() {
      const ratio = window.devicePixelRatio || 1;
      activeCanvas.width = Math.floor(window.innerWidth * ratio);
      activeCanvas.height = Math.floor(window.innerHeight * ratio);
      activeCanvas.style.width = `${window.innerWidth}px`;
      activeCanvas.style.height = `${window.innerHeight}px`;
      activeContext.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function addBlob(x: number, y: number) {
      if (!motionEnabled) {
        return;
      }

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

    function drawBlob(blob: Blob, now: number) {
      const age = now - blob.bornAt;
      const life = 1 - age / blob.ttl;

      if (life <= 0) {
        return false;
      }

      const alpha = getTheme() === "dark" ? 0.1 : 0.12;
      const spread = blob.radius * (1 + (1 - life) * 1.1);
      const offsetX = blob.driftX * age;
      const offsetY = blob.driftY * age;

      activeContext.save();
      activeContext.globalCompositeOperation = "lighter";

      for (let index = 0; index < 3; index += 1) {
        const color = blob.layerColors[index];
        const cx = blob.x + offsetX + (index - 1) * 36;
        const cy = blob.y + offsetY + (1 - index) * 18;
        const gradient = activeContext.createRadialGradient(
          cx,
          cy,
          spread * 0.1,
          cx,
          cy,
          spread
        );

        gradient.addColorStop(
          0,
          `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * life})`
        );
        gradient.addColorStop(
          0.45,
          `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * 0.55 * life})`
        );
        gradient.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);

        activeContext.fillStyle = gradient;
        activeContext.beginPath();
        activeContext.arc(cx, cy, spread, 0, Math.PI * 2);
        activeContext.fill();
      }

      activeContext.restore();
      return true;
    }

    function clearCanvas() {
      activeContext.clearRect(0, 0, activeCanvas.width, activeCanvas.height);
    }

    function render(now: number) {
      clearCanvas();

      for (let index = blobs.length - 1; index >= 0; index -= 1) {
        if (!drawBlob(blobs[index], now)) {
          blobs.splice(index, 1);
        }
      }

      frameId = motionEnabled ? window.requestAnimationFrame(render) : 0;
    }

    function startRenderLoop() {
      if (!frameId) {
        frameId = window.requestAnimationFrame(render);
      }
    }

    function stopRenderLoop() {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }

      blobs.length = 0;
      clearCanvas();
    }

    function syncMotionPreference() {
      motionEnabled = !prefersReducedMotion.matches;

      if (motionEnabled) {
        startRenderLoop();
        return;
      }

      stopRenderLoop();
    }

    function handlePointerMove(event: PointerEvent) {
      if (!motionEnabled) {
        return;
      }

      const now = performance.now();
      if (now - lastPoint < THROTTLE_MS) {
        return;
      }

      lastPoint = now;
      addBlob(event.clientX, event.clientY);
    }

    function handleMotionChange() {
      syncMotionPreference();
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", handlePointerMove);

    if (typeof prefersReducedMotion.addEventListener === "function") {
      prefersReducedMotion.addEventListener("change", handleMotionChange);
    } else {
      prefersReducedMotion.addListener(handleMotionChange);
    }

    syncMotionPreference();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);

      if (typeof prefersReducedMotion.removeEventListener === "function") {
        prefersReducedMotion.removeEventListener("change", handleMotionChange);
      } else {
        prefersReducedMotion.removeListener(handleMotionChange);
      }

      stopRenderLoop();
    };
  }, []);

  return <canvas ref={canvasRef} className="bloom-layer" aria-hidden="true" />;
}
