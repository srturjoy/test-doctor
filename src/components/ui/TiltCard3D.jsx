import React, { useRef, useState, useCallback } from "react";

/**
 * TiltCard3D
 * Provides hardware-accelerated 3D tilt and specular lighting interaction on hover.
 * - Smooth dampening
 * - Configurable max tilt degrees
 * - Optional specular shine gradient overlay
 * - Automatically disabled if user prefers reduced motion
 */
export default function TiltCard3D({
  children,
  className = "",
  maxTilt = 8, // subtle, refined tilt degrees (not cartoonish)
  scale = 1.015,
  shine = true,
  onClick,
  role,
  tabIndex,
  onKeyDown,
}) {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    shinePos: { x: 50, y: 50, opacity: 0 },
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e) => {
      const card = cardRef.current;
      if (!card) return;

      // Check prefers-reduced-motion or mobile/touch screens
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.innerWidth < 768 ||
        window.matchMedia("(hover: none)").matches
      ) {
        return;
      }

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const px = (x / rect.width) * 2 - 1; // -1 to 1
      const py = (y / rect.height) * 2 - 1; // -1 to 1

      const rotateY = px * maxTilt;
      const rotateX = -py * maxTilt;

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, 1)`,
        shinePos: {
          x: (x / rect.width) * 100,
          y: (y / rect.height) * 100,
          opacity: 0.15,
        },
      });
    },
    [maxTilt, scale]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      shinePos: { x: 50, y: 50, opacity: 0 },
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role={role}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      style={{
        transform: tiltStyle.transform,
        transition: isHovered
          ? "transform 0.12s ease-out"
          : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
        transformStyle: "preserve-3d",
      }}
      className={`relative will-change-transform ${className}`}
    >
      {/* Specular shine layer */}
      {shine && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-30"
          style={{
            opacity: tiltStyle.shinePos.opacity,
            background: `radial-gradient(circle at ${tiltStyle.shinePos.x}% ${tiltStyle.shinePos.y}%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 65%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
