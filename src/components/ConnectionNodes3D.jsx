import React, { useRef, useEffect } from "react";

/**
 * ConnectionNodes3D
 * Subtle interactive 3D connection-node animation representing
 * human-to-human empathy, therapeutic alliance, and communication networks.
 */
export default function ConnectionNodes3D({
  className = "",
  height = "h-48 sm:h-56 lg:h-64",
  nodeCount = 38
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;
    const isMobile = window.innerWidth < 768;
    const isSmallMobile = window.innerWidth < 480;

    // Cap DPR to 1.5 on mobile to avoid excessive rasterization overhead
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    let width = (canvas.width = (canvas.offsetWidth || 300) * dpr);
    let heightPx = (canvas.height = (canvas.offsetHeight || 220) * dpr);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleResize = () => {
      if (!canvas) return;
      const currentDpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.5 : 2);
      width = canvas.width = (canvas.offsetWidth || 300) * currentDpr;
      heightPx = canvas.height = (canvas.offsetHeight || 220) * currentDpr;
    };

    window.addEventListener("resize", handleResize);

    // Generate 3D nodes in a torus/spatial cloud: reduced count on mobile
    const effectiveNodeCount = isSmallMobile ? 16 : isMobile ? 22 : nodeCount;
    const nodes = [];
    for (let i = 0; i < effectiveNodeCount; i++) {
      const angle = (i / effectiveNodeCount) * Math.PI * 2;
      const radius = (isMobile ? 80 : 120) + (i % 4) * (isMobile ? 16 : 24);
      nodes.push({
        baseX: Math.cos(angle) * radius + (Math.random() - 0.5) * 30,
        baseY: (Math.sin(angle * 2) * (isMobile ? 35 : 50)) + (Math.random() - 0.5) * 40,
        baseZ: Math.sin(angle) * radius + (Math.random() - 0.5) * 30,
        size: (isMobile ? 1.8 : 2.2) + (i % 3) * 1,
        pulseSpeed: 1.5 + Math.random() * 2,
        pulseOffset: Math.random() * Math.PI * 2,
        isHub: i % 5 === 0 // Major communication hubs
      });
    }

    let time = 0;
    let rotX = 0.15;
    let rotY = 0;
    let targetRotY = 0;
    let targetRotX = 0.15;

    const render = () => {
      time += 0.012;

      rotY += (targetRotY - rotY) * 0.05;
      rotX += (targetRotX - rotX) * 0.05;

      const currentRotY = prefersReducedMotion ? 0.3 : rotY + time * 0.2;
      const currentRotX = prefersReducedMotion ? 0.15 : rotX + Math.sin(time * 0.4) * 0.08;

      ctx.clearRect(0, 0, width, heightPx);

      const centerX = width / 2;
      const centerY = heightPx / 2;
      const fov = 340;

      // Project 3D nodes to 2D
      const projected = nodes.map((node) => {
        // Rotate around Y
        const cosY = Math.cos(currentRotY);
        const sinY = Math.sin(currentRotY);
        const x1 = node.baseX * cosY - node.baseZ * sinY;
        const z1 = node.baseZ * cosY + node.baseX * sinY;

        // Rotate around X
        const cosX = Math.cos(currentRotX);
        const sinX = Math.sin(currentRotX);
        const y2 = node.baseY * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.baseY * sinX;

        const scale = fov / (fov + z2 + 260);
        const px = centerX + x1 * scale;
        const py = centerY + y2 * scale;

        const pulse = 0.7 + 0.3 * Math.sin(time * node.pulseSpeed + node.pulseOffset);
        const depthAlpha = Math.max(0.12, Math.min(0.9, (z2 + 200) / 400));

        return {
          px,
          py,
          z: z2,
          scale,
          size: node.size * scale * (node.isHub ? 1.4 : 1),
          alpha: depthAlpha * pulse,
          isHub: node.isHub
        };
      });

      // Sort back-to-front
      projected.sort((a, b) => a.z - b.z);

      // Draw connections between nodes that are within spatial proximity
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 95 * ((p1.scale + p2.scale) / 2);
          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.28 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);

            // If connected to a major hub, highlight with soft warm violet
            if (p1.isHub || p2.isHub) {
              ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha * 1.5})`;
              ctx.lineWidth = 1.0;
            } else {
              ctx.strokeStyle = `rgba(129, 140, 248, ${lineAlpha})`;
              ctx.lineWidth = 0.65;
            }
            ctx.stroke();
          }
        }
      }

      // Draw glowing nodes
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(1.2, p.size), 0, Math.PI * 2);

        if (p.isHub) {
          // Luminous empathy beacon hub
          ctx.fillStyle = `rgba(249, 115, 22, ${p.alpha})`; // Warm amber/orange
          ctx.shadowColor = "rgba(249, 115, 22, 0.7)";
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = `rgba(192, 132, 252, ${p.alpha})`; // Lavender
          ctx.shadowColor = "rgba(168, 85, 247, 0.5)";
          ctx.shadowBlur = 4;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * 0.9;
      targetRotX = 0.15 - y * 0.5;
    };

    const containerEl = containerRef.current;
    if (containerEl) {
      containerEl.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      if (containerEl) {
        containerEl.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [nodeCount]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none pointer-events-auto ${height} ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
