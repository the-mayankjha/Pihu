import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLayoutStore } from '@pihu/layout-engine';

export interface WidgetCardProps {
  widgetId: string;
  children: React.ReactNode;
  title?: string;
  draggable?: boolean;
  resizable?: boolean;
  frosted?: boolean;
  removable?: boolean;
  style?: React.CSSProperties;
}

export function WidgetCard({
  widgetId,
  children,
  title,
  draggable = false,
  resizable = false,
  frosted = true,
  removable = false,
  style = {}
}: WidgetCardProps) {
  const removeWidget = useLayoutStore(state => state.removeWidget);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggable) return;
    e.dataTransfer.setData('widgetId', widgetId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleRemove = () => {
    removeWidget(widgetId);
  };

  // Base styles
  const baseStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '24px',
    marginBottom: '16px',
    width: '100%',
    ...style,
    // Add native CSS resizing if requested
    resize: resizable ? 'vertical' : 'none',
    minHeight: '150px'
  };

  const [isHovered, setIsHovered] = React.useState(false);

  // If frosted, we apply the pihu-glass-level-3 class which natively handles 
  // the background, blur, tint, and border from the theme engine.
  if (frosted) {
    // Relying on CSS class instead of inline styles for glass
  }

  return (
    <div 
      className={frosted ? 'widget-card-container pihu-glass-level-3' : ''}
      style={baseStyle}
      draggable={draggable}
      onDragStart={handleDragStart}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Absolute Header (Hover Only) */}
      <AnimatePresence>
        {(title || removable || draggable) && isHovered && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              cursor: draggable ? 'grab' : 'default',
              zIndex: 50,
            }}>
            <div style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--pihu-text)',
              opacity: 0.8,
              fontWeight: 'bold',
              userSelect: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              {draggable && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="12" r="1"></circle>
                  <circle cx="9" cy="5" r="1"></circle>
                  <circle cx="9" cy="19" r="1"></circle>
                  <circle cx="15" cy="12" r="1"></circle>
                  <circle cx="15" cy="5" r="1"></circle>
                  <circle cx="15" cy="19" r="1"></circle>
                </svg>
              )}
              {title}
            </div>

            {removable && (
              <button 
                onClick={handleRemove}
                title="Remove Widget"
                style={{
                  background: 'rgba(0,0,0,0.2)',
                  border: 'none',
                  color: 'var(--pihu-text)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                  borderRadius: '50%',
                  backdropFilter: 'blur(4px)',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.2)'}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Widget Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
        {children}
      </div>
    </div>
  );
}
