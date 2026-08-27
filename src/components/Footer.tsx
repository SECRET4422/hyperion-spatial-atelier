import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { GLOBAL_STUDIOS } from '../data/atelierData';
import { soundEngine } from '../services/soundEngine';

export const Footer: React.FC = () => {
  const [studioTimes, setStudioTimes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const updateTimes = () => {
      const times: { [key: string]: string } = {};
      GLOBAL_STUDIOS.forEach((studio) => {
        try {
          const timeStr = new Intl.DateTimeFormat('en-US', {
            timeZone: studio.timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          }).format(new Date());
          times[studio.city] = timeStr;
        } catch {
          times[studio.city] = '--:--:--';
        }
      });
      setStudioTimes(times);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundEngine.playLaser(1400);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#050608',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '100px 32px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1680px', margin: '0 auto' }}>
        {/* Global Studio Clocks Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '32px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '48px',
            marginBottom: '64px',
          }}
        >
          {GLOBAL_STUDIOS.map((studio) => (
            <div key={studio.city}>
              <div
                className="font-mono"
                style={{
                  fontSize: '9px',
                  color: 'var(--color-slate-tech)',
                  letterSpacing: '0.16em',
                  marginBottom: '6px',
                }}
              >
                {studio.code}
              </div>
              <div
                className="font-display"
                style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  color: 'var(--color-bone)',
                  letterSpacing: '0.04em',
                  marginBottom: '4px',
                }}
              >
                {studio.city}
              </div>
              <div
                className="font-mono"
                style={{
                  fontSize: '13px',
                  color: 'var(--color-cadmium)',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                }}
              >
                {studioTimes[studio.city] || '00:00:00'}
              </div>
            </div>
          ))}
        </div>

        {/* Monumental Colophon & Brand Mark */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '40px',
            marginBottom: '64px',
          }}
        >
          <div>
            <div
              className="font-display"
              style={{
                fontSize: 'clamp(3.5rem, 10vw, 10rem)',
                fontWeight: 900,
                lineHeight: 0.85,
                letterSpacing: '-0.04em',
                color: 'rgba(255, 255, 255, 0.08)',
                textTransform: 'uppercase',
                userSelect: 'none',
              }}
            >
              HYPERION
            </div>
            <p
              className="font-mono"
              style={{
                fontSize: '11px',
                color: 'var(--color-slate-tech)',
                letterSpacing: '0.14em',
                marginTop: '16px',
              }}
            >
              ATELIER OF SPECULATIVE ARCHITECTURE & KINETIC COMPUTATION
            </p>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            data-cursor="button"
            className="magnetic-btn"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: 'var(--color-bone)',
              borderRadius: '50%',
              width: '64px',
              height: '64px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-cadmium)';
              e.currentTarget.style.color = 'var(--color-cadmium)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.color = 'var(--color-bone)';
            }}
          >
            <ArrowUp size={24} />
          </button>
        </div>

        {/* Bottom Colophon Legal Bar */}
        <div
          className="font-mono"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            fontSize: '10px',
            color: 'var(--color-slate-tech)',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '24px',
          }}
        >
          <div>© 2026 HYPERION SPATIAL ATELIER. ALL RIGHTS RESERVED.</div>
          <div>CRAFTED WITH TECTONIC RIGOR & WEBGL SHADERS.</div>
          <div>[TYPOGRAPHY: SYNE / PLAYFAIR / JETBRAINS MONO]</div>
        </div>
      </div>
    </footer>
  );
};
