import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  swayOffset: number;
  swaySpeed: number;
  swayDistance: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  opacity: number;
  baseOpacity: number;
  twinklePhase: number;
  twinkleSpeed: number;
  type: 'rose' | 'mogra' | 'sparkle' | 'gold_dot';
  hueVariation: number;
}

export const FloatingDecor: React.FC = () => {
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

    const isMobile = width < 768;
    const count = isMobile ? 18 : 34;

    const createParticle = (initialYRandom = true): Particle => {
      const types: Array<Particle['type']> = ['rose', 'rose', 'mogra', 'sparkle', 'gold_dot'];
      const type = types[Math.floor(Math.random() * types.length)];
      const size =
        type === 'rose'
          ? Math.random() * 12 + 10
          : type === 'mogra'
          ? Math.random() * 9 + 7
          : type === 'sparkle'
          ? Math.random() * 8 + 6
          : Math.random() * 3 + 1.5;

      const baseOpacity =
        type === 'rose'
          ? Math.random() * 0.25 + 0.2
          : type === 'mogra'
          ? Math.random() * 0.28 + 0.22
          : type === 'sparkle'
          ? Math.random() * 0.45 + 0.25
          : Math.random() * 0.35 + 0.2;

      return {
        x: Math.random() * width,
        y: initialYRandom ? Math.random() * height : -20,
        size,
        speedY: Math.random() * 0.6 + 0.35,
        speedX: Math.random() * 0.3 - 0.15,
        swayOffset: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.015 + 0.008,
        swayDistance: Math.random() * 25 + 15,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.018 + 0.008,
        opacity: baseOpacity,
        baseOpacity,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.04 + 0.02,
        type,
        hueVariation: Math.random() * 20 - 10,
      };
    };

    const particles: Particle[] = Array.from({ length: count }, () => createParticle(true));

    // Listen to scroll to add gentle dynamic flow
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = Math.min(Math.max((currentScrollY - lastScrollY) * 0.08, -2), 3);
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Drawing helpers
    const drawRosePetal = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(Math.cos(p.flip), 1);
      ctx.globalAlpha = p.opacity;

      const grad = ctx.createLinearGradient(0, -p.size, 0, p.size);
      grad.addColorStop(0, '#E8998D'); // Soft Coral Rose
      grad.addColorStop(0.5, '#C25B6C'); // Deep Petal Pink
      grad.addColorStop(1, '#8E3E58'); // Deep Plum-Rose

      ctx.fillStyle = grad;
      ctx.beginPath();
      // Curved organic petal shape
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.6, p.size * 0.9, p.size * 0.6, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.6, -p.size * 0.8, -p.size * 0.6, 0, -p.size);
      ctx.closePath();
      ctx.fill();

      // Subtle delicate center petal rib
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.7);
      ctx.quadraticCurveTo(p.size * 0.1, 0, 0, p.size * 0.8);
      ctx.stroke();

      ctx.restore();
    };

    const drawMograPetal = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(Math.cos(p.flip), 1);
      ctx.globalAlpha = p.opacity;

      const grad = ctx.createRadialGradient(0, p.size * 0.3, 0, 0, 0, p.size);
      grad.addColorStop(0, '#FFF5D6'); // Warm gold core
      grad.addColorStop(0.4, '#FFFFF5'); // Pure mogra white
      grad.addColorStop(1, '#EADBCE'); // Soft champagne edge

      ctx.fillStyle = grad;
      ctx.beginPath();
      // Slender jasmine / mogra petal
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.55, -p.size * 0.4, p.size * 0.55, p.size * 0.5, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.55, p.size * 0.5, -p.size * 0.55, -p.size * 0.4, 0, -p.size);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const drawSparkle = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      // 4-point golden starburst
      const s = p.size;
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, s);
      grad.addColorStop(0, '#FFFBEB');
      grad.addColorStop(0.4, '#FDE047');
      grad.addColorStop(1, 'transparent');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.quadraticCurveTo(0, 0, s, 0);
      ctx.quadraticCurveTo(0, 0, 0, s);
      ctx.quadraticCurveTo(0, 0, -s, 0);
      ctx.quadraticCurveTo(0, 0, 0, -s);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const drawGoldDot = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.globalAlpha = p.opacity;

      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2);
      grad.addColorStop(0, 'rgba(253, 224, 71, 0.9)');
      grad.addColorStop(0.5, 'rgba(217, 119, 6, 0.4)');
      grad.addColorStop(1, 'transparent');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    let time = 0;
    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Decay scroll velocity
      scrollVelocity *= 0.92;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Sway motion
        p.swayOffset += p.swaySpeed;
        const swayX = Math.sin(p.swayOffset) * p.swayDistance;

        // Position update
        p.y += p.speedY + scrollVelocity;
        p.x += p.speedX + Math.sin(p.swayOffset * 0.8) * 0.3;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        // Twinkle for sparkles
        if (p.type === 'sparkle' || p.type === 'gold_dot') {
          p.twinklePhase += p.twinkleSpeed;
          p.opacity = p.baseOpacity * (0.6 + 0.4 * Math.sin(p.twinklePhase));
        }

        // Draw particle
        const renderX = p.x + swayX * 0.15;
        const tempX = p.x;
        p.x = renderX;

        if (p.type === 'rose') {
          drawRosePetal(p);
        } else if (p.type === 'mogra') {
          drawMograPetal(p);
        } else if (p.type === 'sparkle') {
          drawSparkle(p);
        } else {
          drawGoldDot(p);
        }

        p.x = tempX;

        // Reset when out of screen
        if (p.y > height + 30) {
          particles[i] = createParticle(false);
        } else if (p.y < -40 && scrollVelocity < 0) {
          particles[i].y = height + 10;
        }
        if (p.x > width + 40) p.x = -20;
        if (p.x < -40) p.x = width + 20;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 will-change-transform"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    />
  );
};
