import React from 'react';

interface HyperspeedLiteProps {
  className?: string;
}

const HyperspeedLite: React.FC<HyperspeedLiteProps> = ({ className = '' }) => {
  return (
    <div className={`w-full h-full relative overflow-hidden ${className}`}>
      {/* Lightweight CSS-only hyperspeed effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      
      {/* Moving lines effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse"
            style={{
              top: `${(i * 5) + 10}%`,
              left: '0%',
              width: '100%',
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${2 + (i * 0.1)}s`
            }}
          />
        ))}
      </div>
      
      {/* Glowing particles */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-60 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${1 + Math.random()}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HyperspeedLite;