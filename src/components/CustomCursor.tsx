import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hoverState, setHoverState] = useState<'default' | 'button' | 'view' | 'drag'>('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('[data-cursor]');
      if (interactive) {
        const type = interactive.getAttribute('data-cursor');
        const text = interactive.getAttribute('data-cursor-text') || '';
        setHoverState(type as 'button' | 'view' | 'drag' || 'button');
        setCursorText(text);
      } else if (target.closest('button, a, input, select, textarea, [role="button"]')) {
        setHoverState('button');
        setCursorText('');
      } else {
        setHoverState('default');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const isExpanded = hoverState !== 'default';
  const size = hoverState === 'view' || hoverState === 'drag' ? 84 : isExpanded ? 48 : 20;

  return (
    <div
      className="custom-cursor"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: hoverState === 'default' ? 'var(--color-bone)' : 'var(--color-cadmium)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#07080a',
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        fontWeight: 'bold',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        boxShadow: isExpanded ? '0 0 24px rgba(255, 59, 0, 0.6)' : 'none',
        transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, box-shadow 0.25s ease'
      }}
    >
      {cursorText && (
        <span style={{ animation: 'fadeIn 0.2s ease forwards' }}>
          {cursorText}
        </span>
      )}
    </div>
  );
};
