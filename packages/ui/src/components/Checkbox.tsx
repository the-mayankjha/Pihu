import * as React from 'react';
import { Check, Minus } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', style, indeterminate, checked, onCheckedChange, onChange, disabled, ...props }, ref) => {
    
    const isChecked = checked || indeterminate;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      onChange?.(e);
      if (onCheckedChange) {
        onCheckedChange(e.target.checked);
      }
    };

    return (
      <div 
        className={isChecked ? '' : `pihu-glass-level-2 ${className}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '18px',
          height: '18px',
          borderRadius: '4px',
          background: isChecked ? 'var(--pihu-primary)' : 'color-mix(in srgb, var(--pihu-text) 5%, transparent)',
          border: isChecked ? '1px solid color-mix(in srgb, var(--pihu-primary) 30%, transparent)' : 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          transition: 'all 0.2s',
          position: 'relative',
          ...style
        }}
      >
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          style={{
            position: 'absolute',
            opacity: 0,
            width: '100%',
            height: '100%',
            cursor: 'inherit',
            margin: 0
          }}
          {...props}
        />
        {indeterminate ? (
          <Minus size={12} color="#ffffff" strokeWidth={3} />
        ) : checked ? (
          <Check size={12} color="#ffffff" strokeWidth={3} />
        ) : null}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';
