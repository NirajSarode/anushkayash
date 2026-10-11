import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const AmbientCursorAura: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Buttery-smooth spring physics for natural trailing glow
  const springConfig = { damping: 28, stiffness: 180, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse/trackpad), not touch screens
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsVisible(true);
      const handleMouseMove = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-25 mix-blend-multiply pointer-events-none transition-opacity duration-500"
      style={{
        x: smoothX,
        y: smoothY,
        background: 'radial-gradient(circle, rgba(142,104,168,0.6) 0%, rgba(212,123,80,0.4) 45%, rgba(197,143,100,0) 72%)',
      }}
    />
  );
};

export default AmbientCursorAura;
