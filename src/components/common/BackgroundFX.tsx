import React from 'react';

export const BackgroundFX: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Subtle modern geometric grid pattern - clean, minimal, architectural */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(#0F172A 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
};
