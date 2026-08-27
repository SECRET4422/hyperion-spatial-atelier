import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles, Activity, Layers } from 'lucide-react';
import { HeroCanvas } from './HeroCanvas';
import { soundEngine } from '../services/soundEngine';

interface HeroSectionProps {
  onOpenCommission?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let lastTime = performance.now();
    let frameCount = 0;

    const measureFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      requestAnimationFrame(measureFps);
    };

    const animId = requestAnimationFrame(measureFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '120px 32px 48px',
        overflow: 'hidden',
      }}
    >
      {/* 3D Kinetic WebGL Canvas */}
      <HeroCanvas />

      {/* Atmospheric Vignette & Blueprint Hairlines */}
      <div
        className="blueprint-grid subtle-scanline"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.35,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Top Telemetry & Index Identifier */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1680px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            className="font-mono"
            style={{
              fontSize: '11px',
              color: 'var(--color-cadmium)',
              letterSpacing: '0.18em',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                backgroundColor: 'var(--color-cadmium)',
                borderRadius: '50%',
                display: 'inline-block',
              }}
            />
            SECTOR 01 // OVERVIEW
          </div>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
          <div
            className="font-mono"
            style={{
              fontSize: '10px',
              color: 'var(--color-slate-tech)',
              letterSpacing: '0.12em',
            }}
          >
            REF: ARCH-2026-X
          </div>
        </div>

        {/* Live System Diagnostics HUD */}
        <div
          className="font-mono"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            fontSize: '10px',
            color: 'var(--color-bone-muted)',
            letterSpacing: '0.1em',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={12} color="var(--color-aurum)" />
            <span>RENDER: {fps} FPS</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers size={12} color="var(--color-cadmium)" />
            <span>NODES: 1,400 PTS</span>
          </div>
        </div>
      </div>

      {/* Main Monumental Kinetic Typography & Narrative */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1680px',
          width: '100%',
          margin: 'auto 0',
          padding: '40px 0',
        }}
      >
        {/* Editorial Sub-Headline */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '20px',
          }}
        >
          <span
            style={{
              width: '40px',
              height: '1px',
              backgroundColor: 'var(--color-cadmium)',
            }}
          />
          <p
            className="font-mono"
            style={{
              fontSize: '12px',
              color: 'var(--color-aurum)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            ATELIER OF COMPUTATIONAL TECTONICS & SPATIAL KINETICS
          </p>
        </div>

        {/* Monumental Display Headline */}
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(2.8rem, 7.5vw, 7.5rem)',
            fontWeight: 900,
            lineHeight: 0.94,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: 'var(--color-bone)',
            maxWidth: '1400px',
          }}
        >
          WHERE MATTER <br />
          <span className="text-stroke-subtle">LEARNS TO</span> MOVE.
        </h1>

        {/* Asymmetrical Editorial Thesis & Narrative Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            marginTop: '40px',
            alignItems: 'flex-end',
          }}
        >
          <p
            className="font-editorial"
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.45rem)',
              fontStyle: 'italic',
              lineHeight: 1.45,
              color: 'rgba(244, 243, 239, 0.85)',
              maxWidth: '560px',
            }}
          >
            “We dissolve the boundary between monolithic permanence and algorithmic mutability, crafting spatial environments that breathe, listen, and transform.”
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <p
              className="font-sans"
              style={{
                fontSize: '14px',
                color: 'var(--color-bone-muted)',
                lineHeight: 1.6,
                maxWidth: '480px',
              }}
            >
              From Paris fashion week kinetic scenography to monolithic geothermal observatories in Iceland, Hyperion choreographs physical reality with computational precision.
            </p>

            {/* Kinetic Interactive Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <a
                href="#projects"
                data-cursor="view"
                data-cursor-text="EXPLORE"
                onClick={() => soundEngine.playLaser(900)}
                className="magnetic-btn"
                style={{
                  textDecoration: 'none',
                  background: 'var(--color-cadmium)',
                  color: '#ffffff',
                  padding: '14px 28px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 0 30px rgba(255, 59, 0, 0.4)',
                }}
              >
                <span>EXPLORE SPATIAL ARCHIVES</span>
                <ArrowDown size={14} />
              </a>

              <a
                href="#lab"
                data-cursor="drag"
                data-cursor-text="EXPERIMENT"
                onClick={() => soundEngine.playTick(1600)}
                style={{
                  textDecoration: 'none',
                  background: 'rgba(255, 255, 255, 0.04)',
                  color: 'var(--color-bone)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '14px 24px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-aurum)';
                  e.currentTarget.style.color = 'var(--color-aurum)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.color = 'var(--color-bone)';
                }}
              >
                <Sparkles size={14} color="var(--color-aurum)" />
                <span>ENTER KINETIC LAB</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Architectural Anchor Bar */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1680px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '20px',
        }}
      >
        <div
          className="font-mono"
          style={{
            fontSize: '10px',
            color: 'var(--color-slate-tech)',
            letterSpacing: '0.14em',
          }}
        >
          [CLICK & DRAG TO DISRUPT KINETIC LATTICE]
        </div>

        <a
          href="#manifesto"
          data-cursor="button"
          onClick={() => soundEngine.playTick(1200)}
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'var(--color-bone-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.14em',
            transition: 'color 0.2s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-cadmium)')}
          onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-bone-muted)')}
        >
          <span>PROCEED TO MANIFESTO</span>
          <div
            style={{
              width: '24px',
              height: '24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArrowDown size={12} />
          </div>
        </a>
      </div>
    </section>
  );
};
