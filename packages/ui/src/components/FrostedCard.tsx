import * as React from 'react';
import { useThemeStore } from '@pihu/theme';

interface FrostedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function FrostedCard({ children, style, className, ...props }: FrostedCardProps) {
  const { themes, activeThemeId } = useThemeStore();
  const currentTheme = themes[activeThemeId];

  if (!currentTheme) return null;

  // The alpha value controls the transparency.
  const isDark = currentTheme.mode === 'dark';
  const alpha = currentTheme.glass[currentTheme.glass.style || 'frost']?.opacity ?? 0.3;
  const blur = currentTheme.glass[currentTheme.glass.style || 'frost']?.blur ?? 24;

  const backgroundColor = isDark 
    ? `rgba(0, 0, 0, ${alpha})`
    : `rgba(255, 255, 255, ${alpha})`;

  return (
    <div
      style={{
        padding: '16px',
        display: 'flex',
        position: 'relative',
        background: backgroundColor,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        // Adding the shadow
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.18)',
        borderRadius: currentTheme.radius.md || '16px',
        border: `1px solid rgba(255, 255, 255, ${isDark ? 0.1 : 0.25})`,
        ...style
      }}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}
