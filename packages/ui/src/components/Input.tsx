import * as React from 'react';
import { useThemeStore } from '@pihu/theme';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', leftIcon, rightIcon, fullWidth = false, style, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const { themes, activeThemeId } = useThemeStore();
    const isDark = themes[activeThemeId]?.mode === 'dark';

    return (
      <div
        className={`pihu-glass-level-2 ${className}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: 'color-mix(in srgb, var(--pihu-text) 5%, transparent)',
          border: isFocused ? '1px solid var(--pihu-primary)' : `1px solid rgba(255, 255, 255, ${isDark ? 0.1 : 0.25})`,
          borderRadius: 'var(--pihu-radius-md, 8px)',
          padding: '8px 12px',
          width: fullWidth ? '100%' : 'auto',
          transition: 'all 0.2s',
          backdropFilter: 'var(--pihu-glass-filter)',
          WebkitBackdropFilter: 'var(--pihu-glass-filter)',
          ...style,
        }}
      >
        {leftIcon && (
          <div style={{ marginRight: '8px', display: 'flex', alignItems: 'center', color: 'color-mix(in srgb, var(--pihu-text) 60%, transparent)' }}>
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--pihu-text)',
            fontSize: '14px',
            width: '100%',
            fontFamily: 'inherit',
          }}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        {rightIcon && (
          <div style={{ marginLeft: '8px', display: 'flex', alignItems: 'center', color: 'color-mix(in srgb, var(--pihu-text) 60%, transparent)' }}>
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
