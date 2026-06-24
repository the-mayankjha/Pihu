import * as React from 'react';
import './LiquidGlass.css';
import { useThemeStore } from '@pihu/theme';

interface LiquidGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function LiquidGlass({ children, className = '', style, ...props }: LiquidGlassProps) {
  const feImageRef = React.useRef<SVGFEImageElement>(null);
  const blur = useThemeStore(state => {
    const theme = state.themes[state.activeThemeId];
    if (!theme) return 24;
    const activeStyle = theme.glass.style || 'frost';
    return theme.glass[activeStyle]?.blur || 24;
  });
  const stdDev = blur / 1000; // Map 0-50px to 0.0-0.05 objectBoundingBox scale

  React.useEffect(() => {
    if (!feImageRef.current) return;
    
    // Fetch the distortion map image and apply it to the SVG filter
    fetch("https://essykings.github.io/JavaScript/map.png")
      .then((response) => response.blob())
      .then((blob) => {
        const objURL = URL.createObjectURL(blob);
        if (feImageRef.current) {
          feImageRef.current.setAttribute("href", objURL);
        }
      })
      .catch(err => console.error("Failed to load displacement map", err));
  }, []);

  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <filter
          id="liquid-glass-filter"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          primitiveUnits="objectBoundingBox"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            ref={feImageRef}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            result="map"
            preserveAspectRatio="none"
          />
          <feGaussianBlur in="SourceGraphic" stdDeviation={stdDev} result="blur" />
          <feDisplacementMap
            id="disp"
            in="blur"
            in2="map"
            scale="0.8"
            xChannelSelector="R"
            yChannelSelector="G"
          ></feDisplacementMap>
        </filter>
      </svg>
      
      <div 
        className={`liquid-glass-container ${className}`} 
        style={style} 
        {...props}
      >
        {children}
      </div>
    </>
  );
}
