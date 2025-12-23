import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5227FF" />
          <stop offset="50%" stopColor="#8b2cf5" />
          <stop offset="100%" stopColor="#FF9FFC" />
        </linearGradient>
      </defs>

      {/* Outer ring */}
      <circle
        cx="16"
        cy="16"
        r="14"
        stroke="url(#logoGradient)"
        strokeWidth="2"
        fill="none"
        opacity="0.8"
      />

      {/* Inner geometric shape - representing digital/tech */}
      <path
        d="M8 16 L16 8 L24 16 L16 24 Z"
        fill="url(#logoGradient)"
        opacity="0.6"
      />

      {/* Center dot */}
      <circle cx="16" cy="16" r="3" fill="url(#logoGradient)" />

      {/* Corner accents */}
      <circle cx="6" cy="6" r="1.5" fill="#5227FF" opacity="0.7" />
      <circle cx="26" cy="6" r="1.5" fill="#8b2cf5" opacity="0.7" />
      <circle cx="6" cy="26" r="1.5" fill="#FF9FFC" opacity="0.7" />
      <circle cx="26" cy="26" r="1.5" fill="#5227FF" opacity="0.7" />
    </svg>
  );
};

export default Logo;
