import { useState, useEffect } from 'react';

export type NetworkQuality = 'low' | 'medium' | 'high' | 'unknown';

interface NetworkInformation extends EventTarget {
  effectiveType?: '2g' | '3g' | '4g';
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
}

/**
 * A custom hook that detects network connection quality.
 * 
 * @returns An object with network quality information
 */
export function useNetworkQuality() {
  const [quality, setQuality] = useState<NetworkQuality>('unknown');
  const [isLowDataMode, setIsLowDataMode] = useState<boolean>(false);
  const [effectiveType, setEffectiveType] = useState<string | undefined>(undefined);
  const [downlink, setDownlink] = useState<number | undefined>(undefined);

  useEffect(() => {
    const determineNetworkQuality = () => {
      try {
        const nav = navigator as NavigatorWithConnection;
        const connection = nav.connection || nav.mozConnection || nav.webkitConnection;

        if (!connection) {
          setQuality('unknown');
          return;
        }

        // Get connection properties
        setEffectiveType(connection.effectiveType);
        setDownlink(connection.downlink);
        setIsLowDataMode(connection.saveData || false);

        // Determine connection quality
        if (connection.effectiveType === '4g' && (connection.downlink || 0) > 5) {
          setQuality('high');
        } else if (connection.effectiveType === '4g' || connection.effectiveType === '3g') {
          setQuality('medium');
        } else {
          setQuality('low');
        }
      } catch (error) {
        console.error('Failed to determine network quality:', error);
        setQuality('unknown');
      }
    };

    // Initial determination
    determineNetworkQuality();

    // Listen for connection changes if the API is available
    const nav = navigator as NavigatorWithConnection;
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
    
    if (connection) {
      connection.addEventListener('change', determineNetworkQuality);
      
      return () => {
        connection.removeEventListener('change', determineNetworkQuality);
      };
    }
  }, []);

  return {
    quality,
    isLowDataMode,
    effectiveType,
    downlink
  };
}
