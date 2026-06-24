import * as React from 'react';
import { X } from 'lucide-react';

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  onDelete?: () => void;
  icon?: React.ReactNode;
  variant?: 'default' | 'outline';
}

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className = '', children, onDelete, icon, variant = 'default', style, ...props }, ref) => {
    
    return (
      <div
        ref={ref}
        className={`pihu-glass-level-2 ${className}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          borderRadius: 'var(--pihu-radius-full, 9999px)',
          fontSize: '12px',
          color: 'var(--pihu-text)',
          background: variant === 'default' ? 'color-mix(in srgb, var(--pihu-text) 10%, transparent)' : 'transparent',
          border: '1px solid color-mix(in srgb, var(--pihu-text) 20%, transparent)',
          backdropFilter: 'var(--pihu-glass-filter)',
          WebkitBackdropFilter: 'var(--pihu-glass-filter)',
          ...style
        }}
        {...props}
      >
        {icon && (
          <span style={{ display: 'flex', alignItems: 'center', opacity: 0.7 }}>
            {icon}
          </span>
        )}
        <span>{children}</span>
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '2px',
              margin: '0 -4px 0 2px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--pihu-text)',
              opacity: 0.5,
              borderRadius: '50%',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
          >
            <X size={12} />
          </button>
        )}
      </div>
    );
  }
);
Chip.displayName = 'Chip';
