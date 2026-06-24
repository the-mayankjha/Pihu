import * as React from 'react';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ size = 'md', icon, className = '', style, ...props }, ref) => {
    
    const isSmall = size === 'sm';
    const width = isSmall ? 32 : 40;
    const height = isSmall ? 18 : 24;
    const thumbSize = isSmall ? 14 : 18;
    const padding = 2;
    
    const translate = props.checked ? width - thumbSize - padding * 2 : 0;

    return (
      <label style={{ display: 'inline-flex', alignItems: 'center', cursor: props.disabled ? 'not-allowed' : 'pointer', opacity: props.disabled ? 0.5 : 1, ...style }} className={className}>
        <div style={{ position: 'relative' }}>
          <input 
            ref={ref}
            type="checkbox" 
            style={{ position: 'absolute', width: 0, height: 0, opacity: 0 }} 
            {...props} 
          />
          <div 
            className={props.checked ? '' : 'pihu-glass-level-2'}
            style={{ 
              width: `${width}px`, 
              height: `${height}px`, 
              background: props.checked ? 'var(--pihu-primary)' : 'color-mix(in srgb, var(--pihu-text) 5%, transparent)',
              borderRadius: '9999px',
              border: props.checked ? '1px solid color-mix(in srgb, var(--pihu-primary) 30%, transparent)' : 'none',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              boxShadow: props.checked ? '0 0 10px 0 color-mix(in srgb, var(--pihu-primary) 30%, transparent)' : 'none',
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: `${padding}px`,
                left: `${padding}px`,
                width: `${thumbSize}px`,
                height: `${thumbSize}px`,
                background: '#ffffff',
                borderRadius: '50%',
                transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: `translateX(${translate}px)`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--pihu-primary)'
              }}
            >
              {icon && React.cloneElement(icon as React.ReactElement<any>, { size: thumbSize - 4 })}
            </div>
          </div>
        </div>
      </label>
    );
  }
);
Switch.displayName = 'Switch';
