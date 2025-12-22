import { useState, useEffect } from 'react';

interface ConnectionInfo {
  isSlowConnection: boolean;
  effectiveType: string;
  downlink: number;
}

export const useConnection = (): ConnectionInfo => {
  const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo>({
    isSlowConnection: false,
    effectiveType: '4g',
    downlink: 10
  });

  useEffect(() => {
    // Check if Network Information API is available
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;

    const updateConnectionInfo = () => {
      if (connection) {
        const effectiveType = connection.effectiveType || '4g';
        const downlink = connection.downlink || 10;
        
        // Consider connection slow if:
        // - effectiveType is 'slow-2g' or '2g'
        // - downlink is less than 1.5 Mbps
        // - saveData is enabled
        const isSlowConnection = 
          effectiveType === 'slow-2g' || 
          effectiveType === '2g' || 
          downlink < 1.5 ||
          connection.saveData === true;

        setConnectionInfo({
          isSlowConnection,
          effectiveType,
          downlink
        });
      } else {
        // Fallback: detect based on device characteristics
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isSlowDevice = navigator.hardwareConcurrency ? navigator.hardwareConcurrency < 4 : false;
        
        setConnectionInfo({
          isSlowConnection: isMobile && isSlowDevice,
          effectiveType: isMobile ? '3g' : '4g',
          downlink: isMobile ? 2 : 10
        });
      }
    };

    updateConnectionInfo();

    // Listen for connection changes
    if (connection) {
      connection.addEventListener('change', updateConnectionInfo);
      return () => connection.removeEventListener('change', updateConnectionInfo);
    }
  }, []);

  return connectionInfo;
};