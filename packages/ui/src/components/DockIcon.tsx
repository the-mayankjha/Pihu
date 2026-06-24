import * as React from 'react';
import { motion, MotionValue, useSpring, useTransform } from 'framer-motion';

interface DockIconProps {
  mouseX: MotionValue<number | null>;
  icon: React.ReactNode;
  name: string;
  isDark: boolean;
  index: number;
  totalIcons: number;
}

export function DockIcon({ mouseX, icon, name, isDark, index, totalIcons }: DockIconProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isHovered) {
      timer = setTimeout(() => {
        setShowTooltip(true);
      }, 500);
    } else {
      setShowTooltip(false);
    }
    return () => clearTimeout(timer);
  }, [isHovered]);

  // Configuration for sizes
  const baseWidth = 48;
  const maxWidth = 80;
  const distanceLimit = 168; // Affects ~2.5 icons on each side
  const gap = 8; // Must match the gap in Dock.tsx

  // Calculate stable distance independent of layout shifts!
  const distance = useTransform(mouseX, (val) => {
    // If mouse is not hovering the dock, return a distance that makes the icon shrink to base size
    if (val === null) return distanceLimit;
    
    // Stable screen center of the dock (assuming dock is exactly at left: 50%)
    const screenCenter = window.innerWidth / 2;
    
    // Calculate the unscaled center position of THIS icon
    // The dock is symmetric. We find the index of the absolute center.
    const centerIndex = (totalIcons - 1) / 2;
    const offsetFromCenter = (index - centerIndex) * (baseWidth + gap);
    
    const stableIconCenterX = screenCenter + offsetFromCenter;
    
    return val - stableIconCenterX;
  });

  // Scale the width from baseWidth up to maxWidth using a bell curve
  // Mapped roughly to icon distances: 0, 56, 112, 168
  const widthTransform = useTransform(
    distance,
    [-168, -112, -56, 0, 56, 112, 168],
    [48, 52, 68, 80, 68, 52, 48]
  );

  // Apply a spring for smoothness
  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  // Translate Y to make them "jump" up slightly off the dock
  const yTransform = useTransform(
    distance,
    [-168, -112, -56, 0, 56, 112, 168],
    [0, -2, -8, -16, -8, -2, 0]
  );
  const y = useSpring(yTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  // Derive scale for the inner icon from the width
  const scale = useTransform(width, [baseWidth, maxWidth], [1, maxWidth / baseWidth]);

  return (
    <motion.div
      ref={ref}
      style={{
        width,
        height: width,
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        y,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="dock-icon"
    >
      {/* Custom Tooltip */}
      <div
        style={{
          position: 'absolute',
          top: '-45px',
          background: isDark ? 'rgba(30, 30, 30, 0.6)' : 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          color: isDark ? '#fff' : '#000',
          padding: '6px 12px',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          border: `1px solid rgba(255, 255, 255, ${isDark ? 0.1 : 0.4})`,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          opacity: showTooltip ? 1 : 0,
          transform: `translateY(${showTooltip ? 0 : 8}px)`,
          transition: 'all 0.2s ease-out',
          zIndex: 100,
        }}
      >
        {name}
      </div>

      <motion.div 
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
          scale, // Scale the whole inner box and icon
          transformOrigin: 'bottom', // Grow upwards from the bottom
        }}
      >
        <div style={{ transform: 'scale(1.2)' }}>
          {icon}
        </div>
      </motion.div>
    </motion.div>
  );
}
