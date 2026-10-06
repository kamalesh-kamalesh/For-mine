import React, { useEffect, useRef } from 'react';

export const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Warm floating amber/dust particles
    const particleCount = Math.min(35, Math.floor(width / 35));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.4,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: -Math.random() * 0.4 - 0.1, // gently drifts upward
      opacity: Math.random() * 0.4 + 0.1,
      fadeSpeed: (Math.random() * 0.006 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.fadeSpeed;

        if (p.opacity > 0.5) {
          p.opacity = 0.5;
          p.fadeSpeed = -Math.abs(p.fadeSpeed);
        } else if (p.opacity < 0.08) {
          p.opacity = 0.08;
          p.fadeSpeed = Math.abs(p.fadeSpeed);
        }

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Soft antique gold glow
        ctx.fillStyle = `rgba(197, 168, 128, ${p.opacity.toFixed(3)})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Film grain noise */}
      <div className="film-grain" aria-hidden="true" />

      {/* Cinematic vignette */}
      <div className="cinematic-vignette" aria-hidden="true" />

      {/* Canvas for gentle dust motes */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
        aria-hidden="true"
      />

      {/* Subtle butterfly silhouette that gracefully glides across occasionally */}
      <div className="ambient-butterfly" aria-hidden="true" style={{ width: '42px', height: '42px' }}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 6px rgba(197, 168, 128, 0.2))' }}>
          <path
            d="M24 16C26 10 34 8 38 13C41 18 38 25 30 25C36 28 38 36 33 39C28 42 25 35 24 30C23 35 20 42 15 39C10 36 12 28 18 25C10 25 7 18 10 13C14 8 22 10 24 16Z"
            fill="#C5A880"
            fillOpacity="0.3"
          />
          <circle cx="24" cy="23" r="1.5" fill="#F4EBDD" fillOpacity="0.4" />
        </svg>
      </div>
    </>
  );
};
