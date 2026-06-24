import * as React from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
}

export function Modal({ isOpen, onClose, title, children, footer, width = '400px' }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        animation: 'pihu-fade-in 0.2s ease-out',
      }}
      onClick={onClose}
    >
      <div 
        className="pihu-glass-level-3"
        style={{
          width,
          maxWidth: '90vw',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 'var(--pihu-radius-xl, 16px)',
          overflow: 'hidden',
          animation: 'pihu-slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div style={{ padding: '20px 24px', borderBottom: '1px solid color-mix(in srgb, var(--pihu-text) 10%, transparent)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>{title}</h2>
            <button 
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', color: 'var(--pihu-text)', cursor: 'pointer', opacity: 0.6, padding: '4px' }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
            >
              <X size={20} />
            </button>
          </div>
        )}
        
        <div style={{ padding: '24px', overflowY: 'auto' }}>
          {children}
        </div>

        {footer && (
          <div style={{ padding: '16px 24px', borderTop: '1px solid color-mix(in srgb, var(--pihu-text) 10%, transparent)', display: 'flex', justifyContent: 'flex-end', gap: '12px', background: 'color-mix(in srgb, var(--pihu-bg) 50%, transparent)' }}>
            {footer}
          </div>
        )}
      </div>
      <style>
        {`
          @keyframes pihu-fade-in { from { opacity: 0; } to { opacity: 1; } }
          @keyframes pihu-slide-up { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        `}
      </style>
    </div>
  );
}
