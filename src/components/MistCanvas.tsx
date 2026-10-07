import React from 'react';

export const MistCanvas: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Radial gradient blobs — visible but soft, like yumisani's light leaks */}
      <div
        className="absolute rounded-full blur-[120px] animate-breathe"
        style={{
          top: '-10%', left: '-5%',
          width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(184,159,200,0.15) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute rounded-full blur-[120px] animate-breathe"
        style={{
          bottom: '-10%', right: '-5%',
          width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(232,169,135,0.12) 0%, transparent 70%)',
          animationDelay: '2s',
        }}
      />
      <div
        className="absolute rounded-full blur-[100px]"
        style={{
          top: '40%', left: '30%',
          width: '30vw', height: '30vw',
          background: 'radial-gradient(circle, rgba(201,145,126,0.08) 0%, transparent 70%)',
        }}
      />
      {/* Subtle warm wash across the whole page */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 20% 10%, rgba(184,159,200,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 90%, rgba(232,169,135,0.06) 0%, transparent 50%)',
        }}
      />
    </div>
  );
};
