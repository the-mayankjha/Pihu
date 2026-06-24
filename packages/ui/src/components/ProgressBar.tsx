import * as React from 'react';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  indeterminate?: boolean;
  color?: string;
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ value = 0, max = 100, indeterminate = false, color = 'var(--pihu-primary)', className = '', style, ...props }, ref) => {
    
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div 
        ref={ref}
        className={`pihu-glass-level-2 ${className}`}
        style={{
          width: '100%',
          height: '8px',
          borderRadius: '9999px',
          overflow: 'hidden',
          background: 'color-mix(in srgb, var(--pihu-text) 10%, transparent)',
          border: '1px solid color-mix(in srgb, var(--pihu-text) 10%, transparent)',
          ...style
        }}
        {...props}
      >
        <div 
          style={{
            height: '100%',
            background: color,
            borderRadius: '9999px',
            width: indeterminate ? '50%' : `${percentage}%`,
            transition: 'width 0.3s ease',
            boxShadow: `0 0 10px ${color}`,
            animation: indeterminate ? 'pihu-progress-indeterminate 1.5s infinite linear' : 'none',
            transformOrigin: 'left',
          }}
        />
        <style>
          {`
            @keyframes pihu-progress-indeterminate {
              0% { transform: translateX(-100%); width: 50%; }
              100% { transform: translateX(200%); width: 50%; }
            }
          `}
        </style>
      </div>
    );
  }
);
ProgressBar.displayName = 'ProgressBar';
