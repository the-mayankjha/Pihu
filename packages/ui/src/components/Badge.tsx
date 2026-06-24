import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'pro' | 'beta' | 'new';
  size?: 'sm' | 'md';
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = '', variant = 'default', size = 'md', children, style, ...props }, ref) => {
    
    const getVariantStyles = (): React.CSSProperties => {
      switch (variant) {
        case 'primary':
          return { background: 'color-mix(in srgb, var(--pihu-primary) 15%, transparent)', color: 'var(--pihu-primary)', border: '1px solid color-mix(in srgb, var(--pihu-primary) 30%, transparent)' };
        case 'success':
          return { background: 'color-mix(in srgb, #10b981 15%, transparent)', color: '#10b981', border: '1px solid color-mix(in srgb, #10b981 30%, transparent)' };
        case 'warning':
          return { background: 'color-mix(in srgb, #f59e0b 15%, transparent)', color: '#f59e0b', border: '1px solid color-mix(in srgb, #f59e0b 30%, transparent)' };
        case 'error':
          return { background: 'color-mix(in srgb, #ef4444 15%, transparent)', color: '#ef4444', border: '1px solid color-mix(in srgb, #ef4444 30%, transparent)' };
        case 'pro':
          return { background: 'linear-gradient(135deg, color-mix(in srgb, #f59e0b 20%, transparent), color-mix(in srgb, #ef4444 20%, transparent))', color: '#f59e0b', border: '1px solid color-mix(in srgb, #f59e0b 40%, transparent)' };
        case 'beta':
          return { background: 'color-mix(in srgb, #06b6d4 15%, transparent)', color: '#06b6d4', border: '1px solid color-mix(in srgb, #06b6d4 30%, transparent)' };
        case 'new':
          return { background: 'color-mix(in srgb, #8b5cf6 15%, transparent)', color: '#8b5cf6', border: '1px solid color-mix(in srgb, #8b5cf6 30%, transparent)' };
        default:
          return { background: 'color-mix(in srgb, var(--pihu-text) 10%, transparent)', color: 'var(--pihu-text)', border: '1px solid color-mix(in srgb, var(--pihu-text) 20%, transparent)' };
      }
    };

    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return { padding: '2px 6px', fontSize: '10px' };
        case 'md':
          return { padding: '4px 8px', fontSize: '12px' };
        default:
          return {};
      }
    };

    return (
      <div
        ref={ref}
        className={`pihu-glass-level-1 ${className}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'var(--pihu-radius-sm, 4px)',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          ...getVariantStyles(),
          ...getSizeStyles(),
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Badge.displayName = 'Badge';
