import React, { lazy, Suspense } from 'react';
import { useConnection } from '@/hooks/use-connection';
import HyperspeedLite from './HyperspeedLite';

// Lazy load the heavy Hyperspeed component
const Hyperspeed = lazy(() => import('./hyperspeed'));

interface LazyHyperspeedProps {
  effectOptions?: any;
  className?: string;
}

const LazyHyperspeed: React.FC<LazyHyperspeedProps> = (props) => {
  const { isSlowConnection } = useConnection();

  // Use lightweight version for slow connections
  if (isSlowConnection) {
    return <HyperspeedLite className={props.className} />;
  }

  // Use full version with lazy loading for fast connections
  return (
    <Suspense fallback={<HyperspeedLite className={props.className} />}>
      <Hyperspeed {...props} />
    </Suspense>
  );
};

export default LazyHyperspeed;