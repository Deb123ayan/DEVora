import React, { lazy, Suspense } from 'react';
import { useConnection } from '@/hooks/use-connection';
import LightPillarLite from './LightPillarLite';

// Lazy load the heavy LightPillar component
const LightPillar = lazy(() => import('./LightPillar'));

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
  const { isSlowConnection } = useConnection();

  // Use lightweight version for slow connections
  if (isSlowConnection) {
    return <LightPillarLite className={props.className} mixBlendMode={props.mixBlendMode} />;
  }

  // Use full version with lazy loading for fast connections
  return (
    <Suspense fallback={<LightPillarLite className={props.className} mixBlendMode={props.mixBlendMode} />}>
      <LightPillar {...props} />
    </Suspense>
  );
};

export default LazyLightPillar;