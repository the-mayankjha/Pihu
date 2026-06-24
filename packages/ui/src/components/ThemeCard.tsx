import type { LucideIcon } from 'lucide-react';

interface ThemeCardProps {
  label: string;
  icon: LucideIcon;
  selected: boolean;
  onClick: () => void;
}

export function ThemeCard({ label, icon: Icon, selected, onClick }: ThemeCardProps) {
  return (
    <div 
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        borderRadius: 'var(--pihu-radius-md)',
        background: selected ? 'color-mix(in srgb, var(--pihu-surface) 60%, transparent)' : 'transparent',
        border: selected ? '1px solid var(--pihu-primary)' : '1px solid var(--pihu-border)',
        cursor: 'pointer',
        transition: 'all 0.2s',
        position: 'relative'
      }}
    >
      {selected && (
        <div style={{ position: 'absolute', top: '8px', right: '8px', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--pihu-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
      <Icon size={24} color={selected ? 'var(--pihu-text)' : 'color-mix(in srgb, var(--pihu-text) 60%, transparent)'} style={{ marginBottom: '8px' }} />
      <span style={{ fontSize: '0.9em', color: selected ? 'var(--pihu-text)' : 'color-mix(in srgb, var(--pihu-text) 60%, transparent)' }}>{label}</span>
    </div>
  );
}
