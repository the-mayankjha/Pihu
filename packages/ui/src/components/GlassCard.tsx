import * as React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassCard({ children, style, className, ...props }: GlassCardProps) {
  return (
    <div
      style={{
        padding: '16px',
        borderRadius: 'var(--pihu-radius-lg, 24px)',
        ...style
      }}
      className={`pihu-glass-level-2 ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
}
