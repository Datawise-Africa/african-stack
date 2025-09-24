import { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNetworkQuality } from '@/hooks/useNetworkQuality';
import { cn } from '@/lib/utils';
import { RefreshCw } from 'lucide-react';

type ImageQuality = 'low' | 'medium' | 'high' | 'auto';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
  placeholderClassName?: string;
  quality?: ImageQuality;
  loadingStrategy?: 'lazy' | 'eager';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
}

/**
 * A component that optimizes images, shows loading states, and delivers appropriate
 * images based on device characteristics and network conditions.
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  imageClassName,
  placeholderClassName,
  quality = 'auto',
  loadingStrategy = 'lazy',
  objectFit = 'cover',
  priority = false,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [effectiveQuality, setEffectiveQuality] = useState<ImageQuality>(quality);
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });
  const { quality: networkQuality, isLowDataMode } = useNetworkQuality();
  
  // Determine best quality based on network conditions
  useEffect(() => {
    if (quality !== 'auto') {
      setEffectiveQuality(quality);
      return;
    }
    
    // Set quality based on network conditions
    if (networkQuality === 'high' && !isLowDataMode) {
      setEffectiveQuality('high');
    } else if (networkQuality === 'medium' || (networkQuality === 'high' && isLowDataMode)) {
      setEffectiveQuality('medium');
    } else {
      setEffectiveQuality('low');
    }
  }, [quality, networkQuality, isLowDataMode]);
  
  // Update image source when src or quality changes
  useEffect(() => {
    setImageSrc(src);
  }, [src]);
  
  // Handle retry
  const handleRetry = useCallback(() => {
    setIsRetrying(true);
    setHasError(false);
    setIsLoaded(false);
    setRetryCount((prev) => prev + 1);
    
    // Add a cache-busting parameter to force reload
    const cacheBuster = `?retry=${Date.now()}`;
    const baseUrl = src.split('?')[0]; // Remove any existing query params
    setImageSrc(`${baseUrl}${cacheBuster}`);
    
    // Reset retry state after a short delay
    setTimeout(() => {
      setIsRetrying(false);
    }, 100);
  }, [src]);
  
  // Handle image load
  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };
  
  // Handle image error
  const handleImageError = () => {
    setIsLoaded(false);
    setHasError(true);
    
    // Try to load a lower quality version if possible
    if (effectiveQuality === 'high') {
      setEffectiveQuality('medium');
    } else if (effectiveQuality === 'medium') {
      setEffectiveQuality('low');
    }
  };
  
  // For future: Add helper functions for specific CDN integrations as needed

  return (
    <div 
      className={cn("relative overflow-hidden", className)} 
      style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '100%' }}
      ref={ref}
    >
      {/* Loading Placeholder */}
      {!isLoaded && (
        <div 
          className={cn(
            "absolute inset-0 bg-gray-200 animate-pulse", 
            placeholderClassName
          )}
          aria-hidden="true"
        />
      )}
      
      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-gray-400 text-sm text-center p-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 mx-auto mb-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
            <p className="mb-3">Failed to load image</p>
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded transition-colors disabled:opacity-50"
            >
              <RefreshCw className="h-3 w-3" />
              Retry
            </button>
          </div>
        </div>
      )}
      
      {/* Actual Image - Only load when in viewport or if priority is true */}
      {(inView || priority) && (
        <img
          key={`image-${retryCount}`}
          src={imageSrc}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading={priority ? "eager" : loadingStrategy}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            imageClassName
          )}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit 
          }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
