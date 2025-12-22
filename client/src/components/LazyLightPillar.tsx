import React from 'react';
import LightPillar from './LightPillar';

interface LazyLightPillarProps {
  topColor?: string;
  bottomColor?: string;
  intensity?: number;
  rotationSpeed?: number;
  glowAmount?: number;
  pillarWidth?: number;
  pillarHeight?: number;
  noiseIntensity?: number;
  pillarRotation?: number;
  interactive?: boolean;
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
  className?: string;
}

const LazyLightPillar: React.FC<LazyLightPillarProps> = (props) => {
  // Simplified - just use the regular LightPillar
  return <LightPillar {...props} />;
};

export default LazyLightPillar;