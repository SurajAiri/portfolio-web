"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number };
type Pulse = { from: number; to: number; t: number; speed: number };

const MINT = "79, 217, 160";
const SKY = "92, 200, 255";

// A drifting network of nodes — the hero's one big graphic, and a nod to what
// the site's owner builds. Nodes connect when they're close, small "signals"
// travel along the links (and sometimes hop onward to a neighbour), and the
// cursor lights up whatever it's near.
//
// It pauses when scrolled out of view or when the tab is hidden, and with
// reduced motion it draws a single still frame.
export default function NeuralBackdrop({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion() === true;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    let lastTime = 0;
    let spawnClock = 0;
    let onScreen = true;
    const mouse = { x: 0, y: 0, active: false };

    const linkDistance = () => (width < 640 ? 105 : 150);
    const mouseDistance = () => (width < 640 ? 130 : 190);

    const seed = () => {
      const count = Math.round(
        Math.min(90, Math.max(22, (width * height) / 13000)),
      );
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 0.8,
      }));
      pulses = [];
    };

    const neighbours = (index: number, maxDistance: number) => {
      const origin = nodes[index];
      const limit = maxDistance * maxDistance;
      const found: number[] = [];
      for (let i = 0; i < nodes.length; i++) {
        if (i === index) continue;
        const dx = nodes[i].x - origin.x;
        const dy = nodes[i].y - origin.y;
        if (dx * dx + dy * dy < limit) found.push(i);
      }
      return found;
    };

    const spawnPulse = (from: number) => {
      const options = neighbours(from, linkDistance());
      if (options.length === 0) return;
      const to = options[Math.floor(Math.random() * options.length)];
      pulses.push({ from, to, t: 0, speed: 0.0007 + Math.random() * 0.0007 });
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const maxD = linkDistance();
      const maxD2 = maxD * maxD;
      const mouseD = mouseDistance();
      const mouseD2 = mouseD * mouseD;

      // Links between nearby nodes
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 >= maxD2) continue;
          ctx.strokeStyle = `rgba(${MINT}, ${(1 - d2 / maxD2) * 0.22})`;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      // Nodes, plus brighter links from the cursor to nodes it's close to
      for (const node of nodes) {
        let glow = 0;
        if (mouse.active) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < mouseD2) {
            glow = 1 - d2 / mouseD2;
            ctx.strokeStyle = `rgba(${SKY}, ${glow * 0.5})`;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(node.x, node.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = `rgba(${glow > 0 ? SKY : MINT}, ${0.5 + glow * 0.5})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r + glow * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Signals travelling along links
      for (const pulse of pulses) {
        const a = nodes[pulse.from];
        const b = nodes[pulse.to];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * pulse.t;
        const y = a.y + (b.y - a.y) * pulse.t;
        ctx.fillStyle = `rgba(${MINT}, 0.16)`;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${MINT}, 0.95)`;
        ctx.beginPath();
        ctx.arc(x, y, 1.9, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = (dt: number) => {
      for (const node of nodes) {
        node.x += node.vx * dt * 0.06;
        node.y += node.vy * dt * 0.06;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.t += pulse.speed * dt;
        if (pulse.t >= 1) {
          pulses.splice(i, 1);
          // Often hop onward, so a signal reads as moving through the net.
          if (Math.random() < 0.6 && pulses.length < 14) spawnPulse(pulse.to);
        }
      }

      spawnClock += dt;
      if (spawnClock > 650 && pulses.length < 14) {
        spawnClock = 0;
        spawnPulse(Math.floor(Math.random() * nodes.length));
      }
    };

    const frame = (time: number) => {
      const dt = Math.min(time - lastTime, 50);
      lastTime = time;
      step(dt);
      render();
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (reduce || raf || !onScreen || document.hidden) return;
      lastTime = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      render(); // paints the still frame when motion is reduced
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouse.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      mouse.x = x;
      mouse.y = y;
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    intersectionObserver.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduce]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
