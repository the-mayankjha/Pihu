import React from 'react';

export function TaskIcon({ size = '100%', style }: { size?: number | string, style?: React.CSSProperties }) {
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
        {/* Background gradient adaptive to theme mode */}
        <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="color-mix(in srgb, var(--pihu-bg, #050816) 80%, var(--pihu-text, #bac2de))" />
          <stop offset="100%" stopColor="color-mix(in srgb, var(--pihu-bg, #050816) 95%, var(--pihu-text, #bac2de))" />
        </linearGradient>

        <linearGradient id="task-border-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--pihu-border, rgba(255, 255, 255, 0.4))" />
          <stop offset="100%" stopColor="var(--pihu-accent, #5050FF)" stopOpacity={0.6} />
        </linearGradient>

        {/* Gradient for checkmark / diamond accents */}
        <linearGradient id="accent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--pihu-accent, #00d2ff)" />
          <stop offset="100%" stopColor="var(--pihu-primary, #9b00ff)" />
        </linearGradient>

        <filter id="task-pill-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.25"/>
        </filter>
        
        <filter id="task-diamond-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="-2" dy="5" stdDeviation="5" floodColor="#000000" floodOpacity="0.35"/>
        </filter>
      </defs>

      {/* Main squircle background matching SettingsIcon */}
      <rect 
        x="4" y="4" 
        width="92" height="92" 
        rx="24" 
        fill="url(#bg-grad)" 
        stroke="url(#task-border-grad)" 
        strokeWidth="1.5"
      />

      {/* Top pill */}
      <g filter="url(#task-pill-shadow)">
        <rect 
          x="22" y="24" width="56" height="20" rx="10" 
          fill="color-mix(in srgb, var(--pihu-bg, #050816) 90%, var(--pihu-text, #bac2de))" 
          stroke="var(--pihu-border, rgba(255,255,255,0.06))" 
          strokeWidth="1" 
        />
        {/* Circle */}
        <circle cx="33" cy="34" r="3.5" fill="none" stroke="url(#accent-grad)" strokeWidth="2" />
        {/* Lines */}
        <rect x="43" y="31.5" width="16" height="2" rx="1" fill="color-mix(in srgb, var(--pihu-bg, #050816) 30%, var(--pihu-text, #bac2de))" />
        <rect x="43" y="35.5" width="10" height="2" rx="1" fill="color-mix(in srgb, var(--pihu-bg, #050816) 30%, var(--pihu-text, #bac2de))" opacity="0.6" />
      </g>

      {/* Bottom pill */}
      <g filter="url(#task-pill-shadow)">
        <rect 
          x="22" y="52" width="56" height="20" rx="10" 
          fill="color-mix(in srgb, var(--pihu-bg, #050816) 90%, var(--pihu-text, #bac2de))" 
          stroke="var(--pihu-border, rgba(255,255,255,0.06))" 
          strokeWidth="1" 
        />
        {/* Circle */}
        <circle cx="33" cy="62" r="3.5" fill="none" stroke="url(#accent-grad)" strokeWidth="2" />
        {/* Lines */}
        <rect x="43" y="59.5" width="24" height="2" rx="1" fill="color-mix(in srgb, var(--pihu-bg, #050816) 30%, var(--pihu-text, #bac2de))" />
        <rect x="43" y="63.5" width="14" height="2" rx="1" fill="color-mix(in srgb, var(--pihu-bg, #050816) 30%, var(--pihu-text, #bac2de))" opacity="0.6" />
      </g>

      {/* Floating Diamond */}
      <g filter="url(#task-diamond-shadow)" transform="translate(70, 36)">
        <rect 
          x="-13" y="-13" width="26" height="26" rx="6" 
          fill="url(#bg-grad)" 
          stroke="url(#accent-grad)" 
          strokeWidth="2" 
          transform="rotate(45)"
        />
        {/* Checkmark */}
        <path 
          d="M-5 1 L -2 4 L 6 -4" 
          fill="none" 
          stroke="url(#accent-grad)" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </g>
    </svg>
  );
}
