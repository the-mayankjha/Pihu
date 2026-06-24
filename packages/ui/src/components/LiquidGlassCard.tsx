import * as React from 'react';
import { useThemeStore } from '@pihu/theme';

interface LiquidGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function LiquidGlassCard({ children, style, className, ...props }: LiquidGlassCardProps) {
  const { themes, activeThemeId } = useThemeStore();
  const currentTheme = themes[activeThemeId];
  
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  
  // Create a truly unique ID that forces a re-render when dimensions change
  const idRef = React.useRef(Math.random().toString(36).substring(2, 9));
  const filterId = `liquid-filter-${idRef.current}-${Math.round(dimensions.width)}x${Math.round(dimensions.height)}`;

  React.useLayoutEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    
    observer.observe(containerRef.current);
    
    const rect = containerRef.current.getBoundingClientRect();
    setDimensions({ width: rect.width, height: rect.height });
    
    return () => observer.disconnect();
  }, []);

  if (!currentTheme) return null;

  const isDark = currentTheme.mode === 'dark';
  const alpha = currentTheme.glass.liquid?.opacity ?? currentTheme.glass.frost?.opacity ?? 0.3;
  const blur = currentTheme.glass.liquid?.blur ?? currentTheme.glass.frost?.blur ?? 12;

  const backgroundColor = isDark 
    ? `rgba(0, 0, 0, 0.05)`
    : `rgba(255, 255, 255, 0.05)`;

  const borderRatio = 0.035; // 0.07 * 0.5
  const borderWidth = Math.min(dimensions.width, dimensions.height) * borderRatio;
  const actualBorder = borderWidth; 

  const generateDisplacementMap = () => {
    if (dimensions.width === 0 || dimensions.height === 0) {
      // Return a 1x1 transparent SVG so feImage doesn't break
      return `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3C/svg%3E`;
    }
    
    const svgStr = `
      <svg viewBox="0 0 ${dimensions.width} ${dimensions.height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="blurFilter">
            <feGaussianBlur stdDeviation="11" />
          </filter>
          <linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${dimensions.width}" height="${dimensions.height}" fill="black"></rect>
        <rect x="0" y="0" width="${dimensions.width}" height="${dimensions.height}" rx="32" fill="url(#red)" />
        <rect x="0" y="0" width="${dimensions.width}" height="${dimensions.height}" rx="32" fill="url(#blue)" style="mix-blend-mode: difference" />
        <rect x="${actualBorder}" y="${actualBorder}" width="${Math.max(0, dimensions.width - actualBorder * 2)}" height="${Math.max(0, dimensions.height - actualBorder * 2)}" rx="28" fill="#808080" fill-opacity="0.93" filter="url(#blurFilter)" />
      </svg>
    `.replace(/\s+/g, ' ').trim();
    
    const base64 = typeof window !== 'undefined' ? window.btoa(svgStr) : '';
    return `data:image/svg+xml;base64,${base64}`;
  };

  const dataUri = generateDisplacementMap();
  
  const scale = -180;
  const scaleR = scale + 0;
  const scaleG = scale + 10;
  const scaleB = scale + 20;

  return (
    <>
      <svg key={filterId} style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feImage x="0" y="0" width="100%" height="100%" href={dataUri} xlinkHref={dataUri} result="map" preserveAspectRatio="none" />
            
            <feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="B" result="dispRed" scale={scaleR} />
            <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
            
            <feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="B" result="dispGreen" scale={scaleG} />
            <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
            
            <feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="B" result="dispBlue" scale={scaleB} />
            <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
            
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            
            <feGaussianBlur in="output" stdDeviation="0.2" />
          </filter>
        </defs>
      </svg>

      <div
        ref={containerRef}
        style={{
          padding: '16px',
          display: 'flex',
          position: 'relative',
          background: backgroundColor,
          backdropFilter: `url(#${filterId}) brightness(1.1) saturate(1.5)`,
          WebkitBackdropFilter: `url(#${filterId}) brightness(1.1) saturate(1.5)`,
          boxShadow: `
            inset 0 0 2px 1px rgba(255,255,255,0.15),
            inset 0 0 10px 4px rgba(255,255,255,0.1),
            0 4px 16px rgba(0,0,0,0.1),
            0 8px 24px rgba(0,0,0,0.1),
            0 16px 56px rgba(0,0,0,0.1)
          `,
          borderRadius: '32px',
          border: 'none',
          ...style
        }}
        className={className}
        {...props}
      >
        {children}
      </div>
    </>
  );
}
