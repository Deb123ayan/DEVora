import React from 'react';

interface PlasmaLiteProps {
  color?: string;
  className?: string;
}

const PlasmaLite: React.FC<PlasmaLiteProps> = ({ 
  color = '#ff6b6b',
  className = ''
}) => {
  return (
    <div className={`w-full h-full relative overflow-hidden ${className}`}>
      {/* Lightweight CSS-only plasma effect */}
      <div 
        className="absolute inset-0 opacity-40 animate-pulse"
        style={{
          background: `radial-gradient(circle at 20% 50%, ${color}40 0%, transparent 50%), 
                       radial-gradient(circle at 80% 20%, ${color}30 0%, transparent 50%), 
                       radial-gradient(circle at 40% 80%, ${color}20 0%, transparent 50%)`
        }}
      />
      <div 
        className="absolute inset-0 opacity-30 animate-bounce"
        style={{
          background: `linear-gradient(45deg, ${color}20, transparent, ${color}10)`,
          animationDuration: '4s'
        }}
      />
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `conic-gradient(from 0deg, ${color}10, transparent, ${color}05, transparent)`,
          animation: 'spin 20s linear infinite'
        }}
      />
    </div>
  );
};

export default PlasmaLite;