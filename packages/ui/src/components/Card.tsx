import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'secondary' | 'metric' | 'stats' | 'profile';
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'glass', children, className = '', style, ...props }, ref) => {
    
    const getVariantStyles = (): React.CSSProperties => {
      switch (variant) {
        case 'glass':
          return {
            padding: '24px',
            borderRadius: 'var(--pihu-radius-xl, 16px)',
          };
        case 'secondary':
          return {
            padding: '20px',
            borderRadius: 'var(--pihu-radius-lg, 12px)',
            background: 'color-mix(in srgb, var(--pihu-bg) 60%, transparent)',
          };
        case 'metric':
        case 'stats':
          return {
            padding: '16px 20px',
            borderRadius: 'var(--pihu-radius-lg, 12px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          };
        case 'profile':
          return {
            padding: '24px',
            borderRadius: 'var(--pihu-radius-xl, 16px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '12px',
          };
        default:
          return {};
      }
    };

    return (
      <div 
        ref={ref}
        className={`pihu-glass-level-2 ${className}`}
        style={{
          ...getVariantStyles(),
          ...style
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';
