import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WidgetCard } from './WidgetCard';

type OrbState = 'idle' | 'wakeup' | 'listening' | 'processing' | 'speaking';

export function OrbWidget() {
  const [orbState, setOrbState] = useState<OrbState>('idle');

  const imgVariants = {
    idle: { 
      scale: 0.9, 
      opacity: 0.7, 
      y: [0, -4, 0], 
      transition: { y: { repeat: Infinity, duration: 4, ease: "easeInOut" } } 
    },
    wakeup: { 
      scale: [0.8, 1.1, 1], 
      opacity: 1, 
      transition: { duration: 0.6, type: "spring", stiffness: 300, damping: 15 } 
    },
    listening: { 
      scale: 1, 
      opacity: 1,
      rotate: [0, 3, -3, 0],
      transition: { rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" } }
    },
    processing: { 
      scale: [1, 1.05, 1], 
      opacity: [0.85, 1, 0.85], 
      transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" } 
    },
    speaking: { 
      scale: 1.02, 
      opacity: 1,
      y: [0, -2, 0],
      transition: { y: { repeat: Infinity, duration: 0.4, ease: "easeInOut" } }
    }
  };

  return (
    <WidgetCard
      widgetId="orb"
      draggable={true}
      resizable={true}
      frosted={true}
      removable={true}
      style={{ padding: '24px 0' }}
    >
      
      {/* Shared relative container for PERFECT centering of image and effects */}
      <div style={{
        position: 'relative',
        width: '120px',
        height: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px'
      }}>
        
        {/* Listening Rings (Rotating Wifi effect) */}
        <AnimatePresence>
          {orbState === 'listening' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ 
                position: 'absolute', 
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {[1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.4 + i * 0.3],
                    opacity: [0.6, 0],
                    rotate: [0, 180 * (i % 2 === 0 ? 1 : -1)]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeOut"
                  }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginLeft: '-45px', // half of 90px
                    marginTop: '-45px', // half of 90px
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    border: '2px dashed var(--pihu-accent)',
                    boxSizing: 'border-box'
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Speaking Waveform */}
        <AnimatePresence>
          {orbState === 'speaking' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 0,
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                justifyContent: 'center',
                height: '140px',
                width: '100%'
              }}
            >
              {/* 7 waveform bars */}
              {[0.2, 0.5, 0.8, 1, 0.8, 0.5, 0.2].map((intensity, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: [`${30 * intensity}px`, `${140 * intensity + Math.random() * 20}px`, `${30 * intensity}px`]
                  }}
                  transition={{
                    duration: 0.4 + Math.random() * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    width: '6px',
                    background: 'var(--pihu-accent)',
                    borderRadius: '3px',
                    opacity: 0.6
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Core Logo Image */}
        <motion.div
          variants={imgVariants}
          initial="idle"
          animate={orbState}
          style={{
            width: '120px',
            height: '120px',
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: orbState !== 'idle' ? 'drop-shadow(0 0 15px rgba(255,255,255,0.2))' : 'none'
          }}
        >
          <img src="/icons/logo.png" alt="Pihu AI" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </motion.div>

      </div> {/* End of shared relative container */}
      
      {/* Title & Status */}
      <div style={{
        marginTop: '16px',
        fontWeight: 'bold',
        fontSize: '18px',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        color: 'var(--pihu-text)',
        opacity: 0.9,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        zIndex: 1
      }}>
        I'm PIHU <motion.span 
          animate={{ scale: orbState === 'processing' || orbState === 'speaking' ? [1, 1.5, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 1 }}
          style={{ 
            width: '10px', 
            height: '10px', 
            borderRadius: '50%', 
            background: 'var(--pihu-accent)', 
            display: 'inline-block', 
            boxShadow: '0 0 12px var(--pihu-accent)' 
          }} 
        />
      </div>
      <div style={{ fontSize: '12px', opacity: 0.6, marginTop: '6px', zIndex: 1, textTransform: 'capitalize', letterSpacing: '0.5px' }}>
        {orbState === 'idle' ? 'Your Personal Voice Assistant' : `${orbState}...`}
      </div>

      {/* State Tester Buttons (For user review) */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginTop: '24px', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        zIndex: 2,
        padding: '0 8px'
      }}>
        {(['idle', 'wakeup', 'listening', 'processing', 'speaking'] as OrbState[]).map(state => (
          <button 
            key={state}
            onClick={() => setOrbState(state)}
            style={{
              padding: '6px 12px',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontWeight: 600,
              background: orbState === state ? 'var(--pihu-accent)' : 'rgba(255,255,255,0.08)',
              color: orbState === state ? '#fff' : 'var(--pihu-text)',
              border: `1px solid ${orbState === state ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: orbState === state ? '0 0 10px var(--pihu-accent)' : 'none'
            }}
          >
            {state}
          </button>
        ))}
      </div>
    </WidgetCard>
  );
}
