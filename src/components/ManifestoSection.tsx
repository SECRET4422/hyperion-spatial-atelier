import React, { useState } from 'react';
import { ATELIER_MANIFESTO } from '../data/atelierData';
import { soundEngine } from '../services/soundEngine';
import { Sliders, Eye, Zap, Shield } from 'lucide-react';

export const ManifestoSection: React.FC = () => {
  const [activeLens, setActiveLens] = useState<'tectonic' | 'chiaroscuro' | 'ephemeral'>('tectonic');
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);

  const lensData = {
    tectonic: {
      tag: '01. TECTONIC DYNAMICS',
      headline: 'ARCHITECTURE AS A REVERSIBLE KINETIC STATE.',
      quote: '“We do not construct static monuments to human permanence. We forge metamorphic envelopes that adapt to atmospheric pressure, solar radiation, and human presence.”',
      metric: 'Kinetic Tolerance: 0.04mm',
      icon: <Shield size={16} color="var(--color-cadmium)" />,
    },
    chiaroscuro: {
      tag: '02. VOLUMETRIC CHIAROSCURO',
      headline: 'LIGHT CARVES MASS FROM THE OBSIDIAN VOID.',
      quote: '“Darkness is our primary structural material. From the obsidian blackness, we laser-mill razor apertures of golden photon energy, giving void its tactile volume.”',
      metric: 'Photon Contrast Ratio: 10,000:1',
      icon: <Eye size={16} color="var(--color-aurum)" />,
    },
    ephemeral: {
      tag: '03. GENERATIVE TRANSIENCE',
      headline: 'CODE IS THE CONCRETE OF THE POST-PHYSICAL ERA.',
      quote: '“Algorithms breathe life into inert carbon fiber. Every pavilion is grown through computational simulation, producing non-repeating topological continuums.”',
      metric: 'Algorithmic Density: 1.2M Polygons/s',
      icon: <Zap size={16} color="var(--color-bone)" />,
    },
  };

  const currentLens = lensData[activeLens];

  return (
    <section
      id="manifesto"
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-obsidian-subtle)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '120px 32px',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1680px', margin: '0 auto' }}>
        {/* Section Header Stamp */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '20px',
            marginBottom: '64px',
          }}
        >
          <div
            className="font-mono"
            style={{
              fontSize: '11px',
              color: 'var(--color-cadmium)',
              letterSpacing: '0.2em',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>[02.00 // THE MANIFESTO]</span>
          </div>

          <div
            className="font-mono"
            style={{
              fontSize: '10px',
              color: 'var(--color-slate-tech)',
              letterSpacing: '0.14em',
            }}
          >
            PHILOSOPHICAL AXIOMS OF HYPERION
          </div>
        </div>

        {/* Asymmetrical 2-Column Editorial Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
            gap: '80px',
            alignItems: 'flex-start',
          }}
        >
          {/* Left Column: Thesis & Interactive Concept Scrubber */}
          <div>
            <span
              className="font-mono"
              style={{
                fontSize: '11px',
                color: 'var(--color-aurum)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              EDITORIAL THESIS
            </span>

            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.8rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                marginBottom: '32px',
              }}
            >
              WE REFUSE TO BUILD <br />
              <span className="text-stroke-subtle">INERT TOMBS</span> OF CONCRETE.
            </h2>

            {/* Interactive Concept Lens Selector */}
            <div
              className="panel-titanium"
              style={{
                padding: '24px',
                borderRadius: '2px',
                marginBottom: '32px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                }}
              >
                <div
                  className="font-mono"
                  style={{
                    fontSize: '10px',
                    color: 'var(--color-bone-muted)',
                    letterSpacing: '0.14em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Sliders size={12} color="var(--color-cadmium)" />
                  <span>INTERACTIVE CONCEPT LENS:</span>
                </div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: '10px',
                    color: 'var(--color-aurum)',
                  }}
                >
                  {currentLens.metric}
                </div>
              </div>

              {/* Lens Mode Toggle Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '20px' }}>
                {(['tectonic', 'chiaroscuro', 'ephemeral'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      soundEngine.playLaser(750);
                      setActiveLens(mode);
                    }}
                    data-cursor="button"
                    style={{
                      background: activeLens === mode ? 'var(--color-cadmium)' : 'rgba(255, 255, 255, 0.04)',
                      color: activeLens === mode ? '#ffffff' : 'var(--color-bone-muted)',
                      border: activeLens === mode ? '1px solid var(--color-cadmium)' : '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '10px 8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      cursor: 'pointer',
                      borderRadius: '2px',
                      textTransform: 'uppercase',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              {/* Dynamic Lens Content */}
              <div
                style={{
                  borderLeft: '2px solid var(--color-cadmium)',
                  paddingLeft: '16px',
                  transition: 'all 0.3s ease',
                }}
              >
                <div
                  className="font-mono"
                  style={{
                    fontSize: '10px',
                    color: 'var(--color-cadmium)',
                    letterSpacing: '0.14em',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {currentLens.icon}
                  <span>{currentLens.tag}</span>
                </div>
                <p
                  className="font-editorial"
                  style={{
                    fontSize: '16px',
                    fontStyle: 'italic',
                    lineHeight: 1.5,
                    color: 'var(--color-bone)',
                  }}
                >
                  {currentLens.quote}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Architectural Pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {ATELIER_MANIFESTO.map((pillar) => (
              <div
                key={pillar.number}
                onMouseEnter={() => {
                  soundEngine.playTick(1600);
                  setHoveredPillar(pillar.number);
                }}
                onMouseLeave={() => setHoveredPillar(null)}
                className="panel-titanium panel-titanium-hover"
                data-cursor="view"
                data-cursor-text="PILLAR"
                style={{
                  padding: '36px',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  borderColor: hoveredPillar === pillar.number ? 'var(--color-cadmium)' : 'var(--color-titanium-border)',
                }}
              >
                {/* Number Accent */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '16px',
                  }}
                >
                  <span
                    className="font-display"
                    style={{
                      fontSize: '32px',
                      fontWeight: 900,
                      color: hoveredPillar === pillar.number ? 'var(--color-cadmium)' : 'var(--color-aurum)',
                      letterSpacing: '-0.02em',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {pillar.number}
                  </span>

                  <span
                    className="font-mono"
                    style={{
                      fontSize: '9px',
                      color: 'var(--color-slate-tech)',
                      letterSpacing: '0.16em',
                    }}
                  >
                    AXIOM
                  </span>
                </div>

                <h3
                  className="font-display"
                  style={{
                    fontSize: '20px',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'var(--color-bone)',
                    marginBottom: '12px',
                  }}
                >
                  {pillar.title}
                </h3>

                <p
                  className="font-sans"
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-bone-muted)',
                    lineHeight: 1.6,
                  }}
                >
                  {pillar.description}
                </p>

                {/* Subtle bottom edge glow on hover */}
                {hoveredPillar === pillar.number && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: 'var(--color-cadmium)',
                      boxShadow: '0 0 12px var(--color-cadmium)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
