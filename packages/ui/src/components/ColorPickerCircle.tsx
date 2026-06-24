

interface ColorPickerCircleProps {
  color: string;
  selected: boolean;
  onClick: () => void;
}

export function ColorPickerCircle({ color, selected, onClick }: ColorPickerCircleProps) {
  return (
    <div 
      onClick={onClick}
      style={{
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        background: color,
        cursor: 'pointer',
        position: 'relative',
        boxShadow: selected ? `0 0 0 2px var(--pihu-bg), 0 0 0 4px ${color}` : 'none',
        transition: 'all 0.2s'
      }}
    >
      {selected && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '12px', height: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="8" height="6" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4L3.5 6.5L9 1" stroke={color === '#ffffff' ? 'black' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  );
}
