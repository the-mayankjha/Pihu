import React from 'react';

export function SettingsIcon({ size = '100%', style }: { size?: number | string, style?: React.CSSProperties }) {
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

        {/* Outer border glow */}
        <linearGradient id="border-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--pihu-border, rgba(255, 255, 255, 0.4))" />
          <stop offset="100%" stopColor="var(--pihu-accent, #5050FF)" stopOpacity={0.6} />
        </linearGradient>

        <filter id="gear-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.25" />
        </filter>

        {/* User's SVG Gradients */}
        <radialGradient id="L4rKfs_gr2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--pihu-accent, #0d61a9)" />
          <stop offset="100%" stopColor="var(--pihu-primary, #16528c)" />
        </radialGradient>
        <linearGradient id="L4rKfs_gr3" x1="5.326" x2="38.082" y1="5.344" y2="38.099" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#889097" />
          <stop offset=".331" stopColor="#848c94" />
          <stop offset=".669" stopColor="#78828b" />
          <stop offset="1" stopColor="#64717c" />
        </linearGradient>
      </defs>

      {/* Main squircle background */}
      <rect 
        x="4" y="4" 
        width="92" height="92" 
        rx="24" 
        fill="url(#bg-grad)" 
        stroke="url(#border-grad)" 
        strokeWidth="1.5"
      />

      {/* Center the provided SVG group within the 100x100 canvas */}
      <g transform="translate(14, 14) scale(1.5)" filter="url(#gear-shadow)">
        {/* Inner background circle */}
        <circle cx="24" cy="24" r="11.5" fill="url(#bg-grad)" />
        
        {/* Inner blue circle */}
        <circle cx="24" cy="24" r="7" fill="url(#L4rKfs_gr2)" />
        
        {/* Gear Path */}
        <path 
          fill="url(#L4rKfs_gr3)" 
          d="M43.407,19.243c-2.389-0.029-4.702-1.274-5.983-3.493c-1.233-2.136-1.208-4.649-0.162-6.693 c-2.125-1.887-4.642-3.339-7.43-4.188C28.577,6.756,26.435,8,24,8s-4.577-1.244-5.831-3.131c-2.788,0.849-5.305,2.301-7.43,4.188 c1.046,2.044,1.071,4.557-0.162,6.693c-1.281,2.219-3.594,3.464-5.983,3.493C4.22,20.77,4,22.358,4,24 c0,1.284,0.133,2.535,0.364,3.752c2.469-0.051,4.891,1.208,6.213,3.498c1.368,2.37,1.187,5.204-0.22,7.345 c2.082,1.947,4.573,3.456,7.34,4.375C18.827,40.624,21.221,39,24,39s5.173,1.624,6.303,3.971c2.767-0.919,5.258-2.428,7.34-4.375 c-1.407-2.141-1.588-4.975-0.22-7.345c1.322-2.29,3.743-3.549,6.213-3.498C43.867,26.535,44,25.284,44,24 C44,22.358,43.78,20.77,43.407,19.243z M24,34.5c-5.799,0-10.5-4.701-10.5-10.5c0-5.799,4.701-10.5,10.5-10.5S34.5,18.201,34.5,24 C34.5,29.799,29.799,34.5,24,34.5z" 
        />
      </g>
    </svg>
  );
}
