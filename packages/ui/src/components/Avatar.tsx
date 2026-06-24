import * as React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'busy' | 'away';
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, fallback, size = 'md', status, className = '', style, ...props }, ref) => {
    
    const sizeMap = {
      sm: 32,
      md: 40,
      lg: 56
    };
    
    const s = sizeMap[size];

    return (
      <div 
        ref={ref}
        className={className}
        style={{
          position: 'relative',
          display: 'inline-flex',
          ...style
        }}
        {...props}
      >
        <div 
          className="pihu-glass-level-2"
          style={{
            width: s,
            height: s,
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'color-mix(in srgb, var(--pihu-primary) 15%, transparent)',
            border: '1px solid color-mix(in srgb, var(--pihu-primary) 30%, transparent)',
          }}
        >
          {src ? (
            <img src={src} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ color: 'var(--pihu-primary)', fontWeight: 'bold', fontSize: s * 0.4 }}>
              {fallback || '?'}
            </span>
          )}
        </div>
        
        {status && (
          <div 
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: s * 0.25,
              height: s * 0.25,
              borderRadius: '50%',
              background: status === 'online' ? '#10b981' : status === 'busy' ? '#ef4444' : status === 'away' ? '#f59e0b' : '#6b7280',
              border: '2px solid var(--pihu-bg)',
            }}
          />
        )}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, max = 4, className = '', style, ...props }, ref) => {
    const avatars = React.Children.toArray(children);
    const visibleAvatars = avatars.slice(0, max);
    const hiddenCount = avatars.length - max;

    return (
      <div 
        ref={ref}
        className={className}
        style={{ display: 'inline-flex', alignItems: 'center', ...style }}
        {...props}
      >
        {visibleAvatars.map((avatar, index) => (
          <div key={index} style={{ marginLeft: index === 0 ? 0 : -12, zIndex: 10 - index }}>
            {avatar}
          </div>
        ))}
        {hiddenCount > 0 && (
          <div 
            className="pihu-glass-level-2"
            style={{
              marginLeft: -12,
              zIndex: 0,
              width: 40,
              height: 40,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              color: 'var(--pihu-text)',
              border: '1px solid color-mix(in srgb, var(--pihu-text) 20%, transparent)',
            }}
          >
            +{hiddenCount}
          </div>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = 'AvatarGroup';
