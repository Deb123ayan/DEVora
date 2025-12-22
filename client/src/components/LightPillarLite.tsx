import React from "react";

interface LightPillarLiteProps {
  className?: string;
  mixBlendMode?: React.CSSProperties["mixBlendMode"];
}

const LightPillarLite: React.FC<LightPillarLiteProps> = ({
  className = "",
  mixBlendMode = "screen",
}) => {
  return (
    <div
      className={`w-full h-full absolute top-0 left-0 ${className}`}
      style={{ mixBlendMode }}
    >
      {/* Lightweight CSS-only animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-500/20 to-purple-600/30 animate-pulse" />
      <div
        className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/10 to-transparent animate-bounce"
        style={{ animationDuration: "3s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-96 bg-gradient-to-b from-purple-400/40 to-pink-400/40 blur-xl animate-pulse"
        style={{ animationDuration: "2s" }}
      />
    </div>
  );
};

export default LightPillarLite;
