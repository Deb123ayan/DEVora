import React, { lazy, Suspense } from 'react';
import { useConnection } from '@/hooks/use-connection';
import PlasmaLite from './PlasmaLite';

// Lazy load the heavy Plasma component
const Plasma = lazy(() => import('./plasma'));

interface LazyPlasmaProps {
  color?: string;
  speed?: number;
  opacity?: number;
  direction?: 'forward' | 'reverse' | 'pingpong';
  mouseInteractive?: boolean;
  className?: string;
}

const LazyPlasma: React.FC<LazyPlasmaProps> = (props) => {
  const { isSlowConnection } = useConnection();

  // Use lightweight version for slow connections
  if (isSlowConnection) {
    return <PlasmaLite color={props.color} className={props.className} />;
  }

  // Use full version with lazy loading for fast connections
  return (
    <Suspense fallback={<PlasmaLite color={props.color} className={props.className} />}>
      <Plasma {...props} />
    </Suspense>
  );
};

export default LazyPlasma;