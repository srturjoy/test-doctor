import React, { useRef, useEffect } from "react";

/**
 * SpatialCanvas3D
 * Pure HTML5 Canvas 3D projective engine rendering a calm, organic neural node field.
 * - 3D spherical point cloud with synaptic connections
 * - Subtle mouse-reactive perspective rotation
 * - Organic breathing expansion and contraction
 * - Respects prefers-reduced-motion
 * - Lightweight and zero external library dependency
 */
export default function SpatialCanvas3D({
  className = "w-full h-full",
  nodeCount = 42,
  interactive = true,
  opacity = 0.75,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Check prefers-reduced-motion & mobile viewport
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = width < 768;
    const isSmallMobile = width < 480;

    // Mobile-optimized node count: reduce 3D depth and particle complexity on mobile
    const effectiveNodeCount = isSmallMobile
      ? Math.min(nodeCount, 14)
      : isMobile
      ? Math.min(nodeCount, 22)
      : nodeCount;

    // Generate 3D nodes arranged in a soft organic spherical constellation
    const nodes = [];
    const radius = Math.min(width, height) * (isMobile ? 0.35 : 0.4);

    for (let i = 0; i < effectiveNodeCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / effectiveNodeCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = radius * (0.85 + Math.sin(i * 1.5) * 0.25);

      nodes.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta) * 0.8,
        z: r * Math.cos(phi),
        baseRadius: 1.5 + (i % 3) * 0.8,
        pulseSpeed: 0.001 + (i % 5) * 0.0004,
        pulseOffset: i * 0.3,
      });
    }

    // 3D Floating ambient particles: scaled down significantly on mobile
    const particleCount = isSmallMobile ? 8 : isMobile ? 14 : 28;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.2,
        y: (Math.random() - 0.5) * height * 1.2,
        z: (Math.random() - 0.5) * (isMobile ? 250 : 400),
        vx: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.25),
        vy: (Math.random() - 0.5) * (isMobile ? 0.12 : 0.2),
        vz: (Math.random() - 0.5) * (isMobile ? 0.12 : 0.2),
        size: 0.8 + Math.random() * 1.2,
        alpha: 0.12 + Math.random() * 0.28,
      });
    }

    let rotX = 0.15;
    let rotY = 0;
    let targetRotX = 0.15;
    let targetRotY = 0;
    let time = 0;

    const handleMouseMove = (e) => {
      if (!interactive || prefersReducedMotion) return;
      // On mobile / touch screens, minimize 3D depth tilt to prevent disorientation and save CPU
      if (width < 768) return;
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = nx * 0.6;
      targetRotX = -ny * 0.4 + 0.15;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += prefersReducedMotion ? 0.001 : 0.006;
      const breathe = Math.sin(time * 0.8) * 0.08 + 1; // gentle breathing expansion

      // Smooth camera interpolation
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      // Subtle subconscious continuous rotation
      if (!prefersReducedMotion) {
        rotY += 0.0018;
      }

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const fov = 450;
      const cx = width / 2;
      const cy = height / 2;

      // Project 3D coordinates to 2D
      const projected = nodes.map((node) => {
        // Breathing scale
        const px = node.x * breathe;
        const py = node.y * breathe;
        const pz = node.z * breathe;

        // Rotation around Y
        const x1 = px * cosY - pz * sinY;
        const z1 = pz * cosY + px * sinY;

        // Rotation around X
        const y2 = py * cosX - z1 * sinX;
        const z2 = z1 * cosX + py * sinX;

        // Perspective scale factor
        const scale = fov / (fov + z2 + 200);
        const screenX = cx + x1 * scale;
        const screenY = cy + y2 * scale;
        const alpha = Math.max(0.12, Math.min(1, (z2 + 200) / 400));

        return {
          x: screenX,
          y: screenY,
          z: z2,
          scale,
          alpha,
          size: node.baseRadius * scale,
        };
      });

      // Sort by Z depth for realistic occlusion
      projected.sort((a, b) => a.z - b.z);

      // Draw subtle connecting synaptic neural lines between nearby nodes
      ctx.lineWidth = 0.75;
      const maxDistance = 75 * (width / 800);

      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (p1.x < 0 || p1.x > width || p1.y < 0 || p1.y > height) continue;

        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.28 * p1.alpha * p2.alpha * opacity;
            ctx.strokeStyle = `rgba(185, 179, 255, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw floating particles drifting slowly in 3D space
      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];
        if (!prefersReducedMotion) {
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.z += pt.vz;

          // Wrap around space boundaries
          if (pt.x < -width * 0.6) pt.x = width * 0.6;
          if (pt.x > width * 0.6) pt.x = -width * 0.6;
          if (pt.y < -height * 0.6) pt.y = height * 0.6;
          if (pt.y > height * 0.6) pt.y = -height * 0.6;
          if (pt.z < -200) pt.z = 200;
          if (pt.z > 200) pt.z = -200;
        }

        const scale = fov / (fov + pt.z + 200);
        const px = cx + pt.x * scale;
        const py = cy + pt.y * scale;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const partAlpha = pt.alpha * opacity * ((pt.z + 200) / 400);
          ctx.fillStyle = `rgba(196, 181, 253, ${partAlpha})`;
          ctx.beginPath();
          ctx.arc(px, py, pt.size * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw gentle psychological breathing waveform (soft undulating organic curve)
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      const waveY = height * 0.62;
      const waveAmp = (isMobile ? 12 : 18) * breathe;
      const waveFreq = 0.0035;
      const wavePhase = time * 0.9;
      const waveStep = isSmallMobile ? 14 : isMobile ? 10 : 6;

      for (let x = 0; x <= width; x += waveStep) {
        // Multi-frequency soothing organic wave
        const y =
          waveY +
          Math.sin(x * waveFreq + wavePhase) * waveAmp +
          Math.sin(x * waveFreq * 1.8 - wavePhase * 0.7) * (waveAmp * 0.35);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      const waveAlpha = 0.16 * opacity;
      ctx.strokeStyle = `rgba(167, 139, 250, ${waveAlpha})`;
      ctx.stroke();

      // Secondary deeper echo wave (only rendered on tablet & desktop for mobile efficiency)
      if (!isSmallMobile) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 8) {
          const y =
            waveY +
            12 +
            Math.sin(x * waveFreq * 1.2 - wavePhase * 0.6) * (waveAmp * 0.6);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = `rgba(249, 115, 22, ${waveAlpha * 0.65})`;
        ctx.stroke();
      }

      // Draw 3D nodes with soft glowing halos
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) continue;

        const pulse = Math.sin(time * 2 + i) * 0.3 + 0.7;
        const nodeAlpha = p.alpha * opacity * pulse;

        // Ambient soft outer aura
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 4.5
        );
        gradient.addColorStop(0, `rgba(185, 179, 255, ${nodeAlpha * 0.55})`);
        gradient.addColorStop(0.5, `rgba(91, 75, 219, ${nodeAlpha * 0.2})`);
        gradient.addColorStop(1, "rgba(91, 75, 219, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Core bright node center
        ctx.fillStyle = `rgba(255, 255, 255, ${nodeAlpha * 0.95})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1.2, p.size), 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [nodeCount, interactive, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
