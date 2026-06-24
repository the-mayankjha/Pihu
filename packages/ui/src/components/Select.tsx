import * as React from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export function Select({ options, value, onChange, placeholder = 'Select an option', className = '', style, disabled }: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={className}
      style={{ position: 'relative', display: 'inline-block', width: '100%', minWidth: '200px', opacity: disabled ? 0.5 : 1, ...style }}
    >
      <button
        type="button"
        className="pihu-glass-level-2"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          borderRadius: 'var(--pihu-radius-md, 8px)',
          background: 'color-mix(in srgb, var(--pihu-text) 5%, transparent)',
          border: isOpen ? '1px solid var(--pihu-primary)' : '1px solid color-mix(in srgb, var(--pihu-text) 10%, transparent)',
          color: selectedOption ? 'var(--pihu-text)' : 'color-mix(in srgb, var(--pihu-text) 50%, transparent)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          textAlign: 'left',
          fontSize: '14px',
          transition: 'all 0.2s',
          backdropFilter: 'var(--pihu-glass-filter)',
          WebkitBackdropFilter: 'var(--pihu-glass-filter)',
        }}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
      </button>

      {isOpen && (
        <div
          className="pihu-glass-level-3"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '8px',
            borderRadius: 'var(--pihu-radius-md, 8px)',
            background: 'color-mix(in srgb, var(--pihu-bg) 80%, transparent)',
            border: '1px solid color-mix(in srgb, var(--pihu-text) 10%, transparent)',
            backdropFilter: 'var(--pihu-glass-filter)',
            WebkitBackdropFilter: 'var(--pihu-glass-filter)',
            boxShadow: 'var(--pihu-shadow-lg, 0 10px 15px -3px rgba(0,0,0,0.5))',
            zIndex: 50,
            maxHeight: '250px',
            overflowY: 'auto',
            padding: '4px',
          }}
        >
          {options.map((opt) => {
            const isSelected = value === opt.value;
            return (
              <div
                key={opt.value}
                onClick={() => {
                  onChange?.(opt.value);
                  setIsOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: isSelected ? 'var(--pihu-primary)' : 'var(--pihu-text)',
                  background: isSelected ? 'color-mix(in srgb, var(--pihu-primary) 10%, transparent)' : 'transparent',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.background = 'color-mix(in srgb, var(--pihu-text) 5%, transparent)';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span>{opt.label}</span>
                {isSelected && <Check size={16} color="var(--pihu-primary)" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
