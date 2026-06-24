import * as React from 'react';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Slider({ style, ...props }: SliderProps) {
  return (
    <input
      type="range"
      style={{
        width: '100%',
        accentColor: 'var(--pihu-primary)',
        cursor: 'pointer',
        ...style
      }}
      {...props}
    />
  );
}
