import React from 'react';

export function TerminalIcon({ size = '100%', style }: { size?: number | string, style?: React.CSSProperties }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        ...style,
        filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.4))'
      }}
    >
      <defs>
        {/* Terminal background - always dark as requested */}
        <linearGradient id="term-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E202B" />
          <stop offset="100%" stopColor="#0F1015" />
        </linearGradient>

        {/* Vibrant border gradient: theme-aware */}
        <linearGradient id="term-border-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--pihu-border, rgba(255, 255, 255, 0.4))" />
          <stop offset="100%" stopColor="var(--pihu-accent, #5050FF)" stopOpacity={0.6} />
        </linearGradient>

        {/* Chevron > gradient: theme-aware */}
        <linearGradient id="term-chevron-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--pihu-accent, #00d2ff)" />
          <stop offset="100%" stopColor="var(--pihu-primary, #9b00ff)" />
        </linearGradient>

        {/* Underscore _ gradient: theme-aware */}
        <linearGradient id="term-underscore-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--pihu-primary, #2dd4bf)" />
          <stop offset="100%" stopColor="var(--pihu-accent, #06b6d4)" />
        </linearGradient>

        {/* Soft inner shadow/glow for the shapes */}
        <filter id="term-shape-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="var(--pihu-primary, #00ffcc)" floodOpacity="0.3" />
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="var(--pihu-accent, #8b5cf6)" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Main squircle background - matched perfectly to other icons */}
      <rect 
        x="4" y="4" 
        width="92" height="92" 
        rx="24" 
        fill="url(#term-bg-grad)" 
        stroke="url(#term-border-grad)" 
        strokeWidth="1.5"
      />

      <g filter="url(#term-shape-glow)">
        {/* Chevron > */}
        <path 
          d="M30 35 L47 50 L30 65" 
          fill="none" 
          stroke="url(#term-chevron-grad)" 
          strokeWidth="7" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        
        {/* Underscore _ */}
        <path 
          d="M53 65 L74 65" 
          fill="none" 
          stroke="url(#term-underscore-grad)" 
          strokeWidth="7" 
          strokeLinecap="round" 
        />
      </g>
    </svg>
  );
}
