import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', fullWidth = false, children, style, ...props }, ref) => {
    
    const getVariantStyles = (): React.CSSProperties => {
      switch (variant) {
        case 'primary':
          return {
            background: 'var(--pihu-primary)',
            color: '#ffffff', // Usually white on primary for contrast
            border: 'none',
            boxShadow: '0 4px 14px 0 color-mix(in srgb, var(--pihu-primary) 40%, transparent)',
          };
        case 'secondary':
          return {
            background: 'color-mix(in srgb, var(--pihu-text) 10%, transparent)',
            color: 'var(--pihu-text)',
            border: '1px solid color-mix(in srgb, var(--pihu-text) 15%, transparent)',
          };
        case 'ghost':
          return {
            background: 'transparent',
            color: 'var(--pihu-text)',
            border: '1px solid transparent',
          };
        case 'danger':
          return {
            background: 'color-mix(in srgb, #ef4444 15%, transparent)',
            color: '#ef4444',
            border: '1px solid color-mix(in srgb, #ef4444 30%, transparent)',
          };
        case 'icon':
          return {
            background: 'color-mix(in srgb, var(--pihu-text) 10%, transparent)',
            color: 'var(--pihu-text)',
            border: 'none',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
          };
        default:
          return {};
      }
    };

    const getSizeStyles = (): React.CSSProperties => {
      if (variant === 'icon') return { width: '36px', height: '36px' };
      
      switch (size) {
        case 'sm':
          return { padding: '6px 12px', fontSize: '12px' };
        case 'md':
          return { padding: '8px 16px', fontSize: '14px' };
        case 'lg':
          return { padding: '12px 24px', fontSize: '16px' };
        default:
          return {};
      }
    };

    return (
      <button
        ref={ref}
        className={`pihu-glass-level-2 ${className}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          borderRadius: variant === 'icon' ? '50%' : 'var(--pihu-radius-md, 8px)',
          cursor: 'pointer',
          fontWeight: 500,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          width: fullWidth ? '100%' : 'auto',
          backdropFilter: 'var(--pihu-glass-filter)',
          WebkitBackdropFilter: 'var(--pihu-glass-filter)',
          ...getVariantStyles(),
          ...getSizeStyles(),
          ...style,
        }}
        onMouseEnter={(e) => {
          if (props.disabled) return;
          if (variant === 'primary') {
            e.currentTarget.style.filter = 'brightness(1.1)';
          } else if (variant === 'ghost') {
            e.currentTarget.style.background = 'color-mix(in srgb, var(--pihu-text) 10%, transparent)';
          } else if (variant === 'danger') {
            e.currentTarget.style.background = 'color-mix(in srgb, #ef4444 25%, transparent)';
          } else {
            e.currentTarget.style.background = 'color-mix(in srgb, var(--pihu-text) 15%, transparent)';
          }
        }}
        onMouseLeave={(e) => {
          if (props.disabled) return;
          if (variant === 'primary') {
            e.currentTarget.style.filter = 'none';
          } else if (variant === 'ghost') {
            e.currentTarget.style.background = 'transparent';
          } else if (variant === 'danger') {
            e.currentTarget.style.background = 'color-mix(in srgb, #ef4444 15%, transparent)';
          } else {
            e.currentTarget.style.background = 'color-mix(in srgb, var(--pihu-text) 10%, transparent)';
          }
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
