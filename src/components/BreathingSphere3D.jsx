import React, { useRef, useEffect, useState } from "react";
import { Sparkles, Wind } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

/**
 * BreathingSphere3D
 * A calm, meditative 3D sphere that slowly expands and contracts in a rhythmic breathing cycle.
 *
 * Visual Specifications:
 * - Background: Deep navy (#070A18 / #0B1026) + soft purple (rgba(168, 85, 247, 0.2)) + subtle particles.
 * - 3D Sphere: Projective mathematical sphere with layered geodesic latitude rings,
 *   shimmering synaptic nodal intersections, and soft volumetric glow.
 * - Breathing Rhythm: Organic continuous expansion and contraction simulating deep, tranquil breath.
 * - Interactive: Subtle perspective parallax on mouse move, respectful of reduced motion.
 */

export default function BreathingSphere3D({
  className = "",
  showGuidance = true,
  height = "h-[360px] sm:h-[420px] lg:h-[480px]"
}) {
  const { lang } = useLanguage();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [breathPhase, setBreathPhase] = useState("inhale"); // "inhale" | "pause" | "exhale"
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;
    const isMobile = window.innerWidth < 768;
    const isSmallMobile = window.innerWidth < 480;

    // Cap device pixel ratio on mobile to prevent excessive GPU fillrate
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    let width = (canvas.width = (canvas.offsetWidth || 340) * dpr);
    let height = (canvas.height = (canvas.offsetHeight || 340) * dpr);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Handle canvas resizing smoothly
    const handleResize = () => {
      if (!canvas) return;
      const currentDpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.5 : 2);
      width = canvas.width = (canvas.offsetWidth || 340) * currentDpr;
      height = canvas.height = (canvas.offsetHeight || 340) * currentDpr;
    };

    window.addEventListener("resize", handleResize);

    // 1. Generate 3D Spherical Nodes (Fibonacci sphere distribution)
    // Scaled down node count on mobile to reduce rendering complexity and depth computation
    const nodeCount = isSmallMobile ? 32 : isMobile ? 48 : 96;
    const sphereNodes = [];
    const baseSphereRadius = Math.min(width, height) * (isMobile ? 0.28 : 0.26);

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      sphereNodes.push({
        baseX: Math.sin(phi) * Math.cos(theta),
        baseY: Math.cos(phi),
        baseZ: Math.sin(phi) * Math.sin(theta),
        size: 1.5 + (i % 4) * 0.7,
        alphaOffset: (i * 0.1) % Math.PI
      });
    }

    // 2. Generate 3D Latitude Rings - streamlined on mobile
    const ringCount = isSmallMobile ? 4 : isMobile ? 5 : 7;
    const rings = [];
    for (let r = 1; r < ringCount; r++) {
      const ringLat = (r / ringCount - 0.5) * Math.PI * 0.85;
      const ringY = Math.sin(ringLat);
      const ringRad = Math.cos(ringLat);
      const points = [];
      const segs = isSmallMobile ? 18 : isMobile ? 24 : 36;
      for (let s = 0; s <= segs; s++) {
        const theta = (s / segs) * Math.PI * 2;
        points.push({
          x: Math.cos(theta) * ringRad,
          y: ringY,
          z: Math.sin(theta) * ringRad
        });
      }
      rings.push(points);
    }

    // 3. Ambient Background Floating Particles (Deep navy & soft purple field)
    const particleCount = isSmallMobile ? 12 : isMobile ? 20 : 48;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * (isMobile ? 300 : 500),
        radius: 0.8 + Math.random() * 1.6,
        speedX: (Math.random() - 0.5) * (isMobile ? 0.12 : 0.18),
        speedY: -0.1 - Math.random() * (isMobile ? 0.15 : 0.25),
        baseAlpha: 0.15 + Math.random() * 0.4,
        color: i % 3 === 0 ? "rgba(168, 85, 247, " : i % 3 === 1 ? "rgba(129, 140, 248, " : "rgba(236, 72, 153, "
      });
    }

    let time = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let currentRotY = 0;
    let currentRotX = 0;

    const render = () => {
      time += 0.015;

      // Smooth mouse interaction interpolation
      currentRotY += (targetRotY - currentRotY) * 0.05;
      currentRotX += (targetRotX - currentRotX) * 0.05;

      const autoSpin = time * 0.25;
      const rotY = autoSpin + currentRotY;
      const rotX = Math.sin(time * 0.2) * 0.15 + currentRotX;

      // 4. Meditative Breathing Expansion and Contraction Cycle
      // Breathing frequency: ~5.5 seconds per full cycle
      const breathCycle = Math.sin(time * 0.9);
      // Expansion multiplier between 0.86 and 1.16 (~30% gentle volumetric breath)
      const currentRadius = prefersReducedMotion
        ? baseSphereRadius
        : baseSphereRadius * (1.0 + 0.15 * breathCycle);

      // Report breath phase state for gentle label indicator
      if (!prefersReducedMotion && Math.floor(time * 60) % 20 === 0) {
        if (breathCycle > 0.3) {
          setBreathPhase("inhale");
        } else if (breathCycle < -0.3) {
          setBreathPhase("exhale");
        } else {
          setBreathPhase("pause");
        }
      }

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const fov = 400;

      // -------------------------------------------------------------
      // Background: Deep navy + soft purple radial ambiance
      // -------------------------------------------------------------
      const bgGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        currentRadius * 0.2,
        centerX,
        centerY,
        width * 0.7
      );
      bgGrad.addColorStop(0, "rgba(120, 80, 220, 0.22)"); // Soft radiant purple core
      bgGrad.addColorStop(0.35, "rgba(79, 70, 229, 0.16)"); // Indigo twilight
      bgGrad.addColorStop(0.7, "rgba(15, 23, 50, 0.08)");
      bgGrad.addColorStop(1, "rgba(7, 10, 24, 0)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // -------------------------------------------------------------
      // Subtle background floating particles
      // -------------------------------------------------------------
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around gracefully
        if (p.y < -height * 0.6) p.y = height * 0.6;
        if (p.x < -width * 0.6) p.x = width * 0.6;
        if (p.x > width * 0.6) p.x = -width * 0.6;

        const pScale = fov / (fov + p.z);
        const px = centerX + p.x * pScale;
        const py = centerY + p.y * pScale;
        const pAlpha = p.baseAlpha * (0.8 + 0.2 * Math.sin(time + p.radius));

        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.5, p.radius * pScale), 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${pAlpha})`;
        ctx.fill();
      });

      // -------------------------------------------------------------
      // 3D Rotation helper
      // -------------------------------------------------------------
      const rotatePoint = (x, y, z) => {
        // Rotate Y
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;

        // Rotate X
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        return { x: x1, y: y2, z: z2 };
      };

      // -------------------------------------------------------------
      // Soft breathing aura / core volumetric glow
      // -------------------------------------------------------------
      const auraGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        currentRadius * 0.1,
        centerX,
        centerY,
        currentRadius * 1.35
      );
      auraGrad.addColorStop(0, "rgba(192, 132, 252, 0.45)"); // Luminous lilac
      auraGrad.addColorStop(0.4, "rgba(147, 51, 234, 0.25)"); // Purple
      auraGrad.addColorStop(0.8, "rgba(79, 70, 229, 0.12)"); // Navy/indigo
      auraGrad.addColorStop(1, "rgba(99, 102, 241, 0)");

      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius * 1.35, 0, Math.PI * 2);
      ctx.fillStyle = auraGrad;
      ctx.fill();

      // -------------------------------------------------------------
      // Render 3D Latitude Rings
      // -------------------------------------------------------------
      rings.forEach((ringPoints, rIdx) => {
        ctx.beginPath();
        let first = true;
        let avgZ = 0;

        ringPoints.forEach((pt) => {
          const transformed = rotatePoint(
            pt.x * currentRadius,
            pt.y * currentRadius,
            pt.z * currentRadius
          );
          avgZ += transformed.z;

          const scale = fov / (fov + transformed.z + 400);
          const screenX = centerX + transformed.x * scale;
          const screenY = centerY + transformed.y * scale;

          if (first) {
            ctx.moveTo(screenX, screenY);
            first = false;
          } else {
            ctx.lineTo(screenX, screenY);
          }
        });

        avgZ /= ringPoints.length;
        const ringAlpha = Math.max(0.08, Math.min(0.4, 0.2 + (avgZ / currentRadius) * 0.15));
        ctx.strokeStyle =
          rIdx % 2 === 0
            ? `rgba(192, 132, 252, ${ringAlpha})` // Soft purple
            : `rgba(129, 140, 248, ${ringAlpha * 0.85})`; // Soft periwinkle
        ctx.lineWidth = Math.max(0.8, (1 + avgZ / currentRadius) * 1.1);
        ctx.stroke();
      });

      // -------------------------------------------------------------
      // Render 3D Spherical Nodes
      // -------------------------------------------------------------
      const projectedNodes = [];

      sphereNodes.forEach((node) => {
        const transformed = rotatePoint(
          node.baseX * currentRadius,
          node.baseY * currentRadius,
          node.baseZ * currentRadius
        );

        const scale = fov / (fov + transformed.z + 400);
        const screenX = centerX + transformed.x * scale;
        const screenY = centerY + transformed.y * scale;

        // Depth lighting (front hemisphere is brighter, back is softer)
        const depthFactor = (transformed.z + currentRadius) / (2 * currentRadius);
        const nodeAlpha = Math.max(0.15, Math.min(0.95, 0.25 + depthFactor * 0.7));

        projectedNodes.push({
          x: screenX,
          y: screenY,
          z: transformed.z,
          size: node.size * scale * (0.8 + depthFactor * 0.5),
          alpha: nodeAlpha
        });
      });

      // Sort back-to-front for proper depth blending
      projectedNodes.sort((a, b) => a.z - b.z);

      // Subtle interconnecting neural links between close neighboring nodes
      for (let i = 0; i < projectedNodes.length; i++) {
        const n1 = projectedNodes[i];
        if (n1.z < -currentRadius * 0.4) continue; // Skip deep back lines

        for (let j = i + 1; j < Math.min(i + 5, projectedNodes.length); j++) {
          const n2 = projectedNodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < currentRadius * 0.45) {
            const lineAlpha = (1 - dist / (currentRadius * 0.45)) * 0.22 * n1.alpha;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(192, 132, 252, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw glowing sphere nodes
      projectedNodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(1, node.size), 0, Math.PI * 2);

        // Gradient node fill (luminous white center with soft purple halo)
        if (node.z > 0) {
          ctx.fillStyle = `rgba(255, 255, 255, ${node.alpha})`;
          ctx.shadowColor = "rgba(168, 85, 247, 0.8)";
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = `rgba(168, 85, 247, ${node.alpha * 0.6})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Outer concentric soft pulse ring (breathing ripple)
      const rippleRadius = currentRadius * (1.18 + 0.1 * Math.sin(time * 0.9 - 0.5));
      ctx.beginPath();
      ctx.arc(centerX, centerY, rippleRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(168, 85, 247, 0.2)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      animationId = requestAnimationFrame(render);
    };

    render();

    // Mouse movement parallax
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * 0.8;
      targetRotX = -y * 0.5;
      setMousePos({ x, y });
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
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#070A18] via-[#0B1028] to-[#070A18] border border-white/10 shadow-2xl flex flex-col items-center justify-center select-none ${height} ${className}`}
    >
      {/* Dynamic atmospheric radial backdrops */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.14),transparent_70%)] pointer-events-none" />
      <div className="absolute -top-12 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HTML5 Canvas 3D Projective Engine */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block relative z-10 cursor-grab active:cursor-grabbing"
      />

      {/* Subtle Somatic Breathing Rhythm Caption (Bottom) */}
      {showGuidance && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/60 border border-white/15 backdrop-blur-md text-slate-300 text-xs font-mono tracking-wider pointer-events-none">
          <Wind className="w-3.5 h-3.5 text-purple-400 animate-pulse shrink-0" />
          <span>
            {breathPhase === "inhale"
              ? lang === "bn"
                ? "ধীর শ্বাস নিন (Inhale)..."
                : "Slow, tranquil inhalation..."
              : breathPhase === "exhale"
              ? lang === "bn"
                ? "ধীর শ্বাস ছাড়ুন (Exhale)..."
                : "Gentle, calm exhalation..."
              : lang === "bn"
              ? "মানসিক প্রশান্তি (Pause)..."
              : "Stillness & centeredness..."}
          </span>
        </div>
      )}

      {/* Aesthetic Top Tag */}
      <div className="absolute top-4 left-4 z-20 hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-purple-300 pointer-events-none">
        <Sparkles className="w-3 h-3 text-purple-400" />
        <span>3D CALM BREATHING SPHERE</span>
      </div>
    </div>
  );
}
