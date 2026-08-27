import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';

interface HeaderProps {
  onOpenCommission: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCommission }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [timeString, setTimeString] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.toISOString().substring(11, 19) + ' UTC';
      setTimeString(utc);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const nextMuted = soundEngine.toggleMute();
    setIsMuted(nextMuted);
  };

  const navLinks = [
    { label: '01. MANIFESTO', href: '#manifesto' },
    { label: '02. MONOLITH X-RAY', href: '#feature' },
    { label: '03. SPATIAL ARCHIVE', href: '#projects' },
    { label: '04. THE LAB', href: '#lab' },
    { label: '05. DIALOGUES', href: '#recognition' },
    { label: '06. COMMISSIONS', href: '#commission' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: isScrolled ? 'rgba(7, 8, 10, 0.88)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
      }}
    >
      <div
        style={{
          maxWidth: '1680px',
          margin: '0 auto',
          padding: isScrolled ? '16px 32px' : '24px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'padding 0.3s ease',
        }}
      >
        {/* Brand & Telemetry */}
        <a
          href="#"
          data-cursor="button"
          onClick={() => soundEngine.playTick(1400)}
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            color: 'var(--color-bone)',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              border: '1.5px solid var(--color-cadmium)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: 'var(--color-aurum)',
                borderRadius: '50%',
              }}
            />
          </div>

          <div>
            <div
              className="font-display"
              style={{
                fontSize: '18px',
                fontWeight: 900,
                letterSpacing: '0.12em',
                lineHeight: 1,
              }}
            >
              HYPERION<span style={{ color: 'var(--color-cadmium)' }}> //</span>
            </div>
            <div
              className="font-mono"
              style={{
                fontSize: '9px',
                color: 'var(--color-slate-tech)',
                letterSpacing: '0.14em',
                marginTop: '4px',
              }}
            >
              SPATIAL ATELIER · EST. 2026
            </div>
          </div>
        </a>

        {/* Live Studio Telemetry (Desktop Only) */}
        <div
          className="font-mono telemetry-desktop"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '20px',
            fontSize: '11px',
            color: 'var(--color-bone-muted)',
            letterSpacing: '0.08em',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 8px #10b981',
                display: 'inline-block',
              }}
            />
            <span>ATELIER STATUS: ACTIVE</span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <div>{timeString}</div>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <div style={{ color: 'var(--color-aurum)' }}>[35.6762° N · TOKYO]</div>
        </div>

        {/* Desktop Nav Links */}
        <nav
          className="nav-desktop"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '28px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-cursor="button"
              onMouseEnter={() => soundEngine.playTick(1800)}
              style={{
                textDecoration: 'none',
                color: 'var(--color-bone-muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                transition: 'color 0.25s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-bone)')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-bone-muted)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Controls: Audio Toggle & Commission CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleToggleSound}
            data-cursor="button"
            title={isMuted ? 'Activate Atmospheric Soundscape' : 'Mute Soundscape'}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: isMuted ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid var(--color-cadmium)',
              borderRadius: '2px',
              padding: '8px 14px',
              color: isMuted ? 'var(--color-bone-muted)' : 'var(--color-cadmium)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.1em',
              transition: 'all 0.3s ease',
            }}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            <span className="sound-label" style={{ display: 'none' }}>
              {isMuted ? 'AUDIO: OFF' : 'AUDIO: ON'}
            </span>
          </button>

          {/* Direct Commission Button */}
          <button
            onClick={() => {
              soundEngine.playChime();
              onOpenCommission();
            }}
            data-cursor="button"
            className="magnetic-btn"
            style={{
              background: 'var(--color-bone)',
              color: '#07080a',
              border: 'none',
              borderRadius: '2px',
              padding: '9px 18px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>COMMISSION</span>
            <ArrowUpRight size={14} />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => {
              soundEngine.playTick(1600);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            data-cursor="button"
            className="mobile-toggle-btn"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-bone)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(7, 8, 10, 0.98)',
            backdropFilter: 'blur(24px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '40px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            zIndex: 99,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  soundEngine.playTick(1600);
                  setMobileMenuOpen(false);
                }}
                className="font-display"
                style={{
                  textDecoration: 'none',
                  color: 'var(--color-bone)',
                  fontSize: '24px',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div
            className="font-mono"
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: '24px',
              fontSize: '11px',
              color: 'var(--color-slate-tech)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div>LIVE TELEMETRY: {timeString}</div>
            <div>COORDINATES: 35.6762° N · 139.6503° E</div>
          </div>
        </div>
      )}

      {/* CSS helper for responsive desktop/mobile display */}
      <style>{`
        @media (min-width: 1024px) {
          .telemetry-desktop {
            display: flex !important;
          }
          .nav-desktop {
            display: flex !important;
          }
          .sound-label {
            display: inline !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
        }
        @media (max-width: 1023px) {
          .telemetry-desktop {
            display: none !important;
          }
          .nav-desktop {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};
