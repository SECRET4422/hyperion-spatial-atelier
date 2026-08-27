import React, { useState } from 'react';
import { Layers, ExternalLink } from 'lucide-react';
import type { XRayLayer } from '../types';
import { soundEngine } from '../services/soundEngine';

interface FeatureFocusSectionProps {
  onOpenProject: (projectId: string) => void;
}

export const FeatureFocusSection: React.FC<FeatureFocusSectionProps> = ({ onOpenProject }) => {
  const [activeLayer, setActiveLayer] = useState<XRayLayer>('realized');

  const layers: { id: XRayLayer; label: string; description: string; tag: string }[] = [
    { id: 'realized', label: 'REALIZED STATE', description: 'Real-world photographic capture at Icelandic twilight.', tag: 'PHOTO-01' },
    { id: 'wireframe', label: 'CAD BLUEPRINT', description: 'Sub-millimeter topological vector geometry & geodesic nodes.', tag: 'VECTOR-02' },
    { id: 'thermal', label: 'THERMAL FLUX', description: 'Geothermal energy transfer and Arctic heat retention gradients.', tag: 'FLUX-03' },
    { id: 'structural', label: 'CARBON TECTONICS', description: 'Stress-concentration vectors across continuous carbon composite.', tag: 'STRESS-04' },
  ];

  return (
    <section
      id="feature"
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-obsidian)',
        padding: '120px 32px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
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
            marginBottom: '48px',
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
            <span>[03.00 // ARCHITECTURAL FOCUS]</span>
          </div>

          <div
            className="font-mono"
            style={{
              fontSize: '10px',
              color: 'var(--color-slate-tech)',
              letterSpacing: '0.14em',
            }}
          >
            FLAGSHIP MONOGRAPH // ICELAND
          </div>
        </div>

        {/* Feature Title Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          <div>
            <span
              className="font-mono"
              style={{
                fontSize: '11px',
                color: 'var(--color-aurum)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '12px',
              }}
            >
              SPATIAL MONOGRAPH · 2026
            </span>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
                fontWeight: 900,
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
              }}
            >
              KRONOS MONOLITH <br />
              <span className="text-stroke-subtle">OBSERVATORY</span>
            </h2>
          </div>

          <p
            className="font-editorial"
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              fontStyle: 'italic',
              color: 'var(--color-bone-muted)',
              maxWidth: '480px',
              lineHeight: 1.5,
            }}
          >
            “An autonomous architectural instrument embedded into Icelandic volcanic basalt, responding to diurnal solar angles through motorized kinetic facets.”
          </p>
        </div>

        {/* The Interactive X-Ray Media Stage */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            borderRadius: '2px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            minHeight: '560px',
            maxHeight: '740px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#050608',
          }}
        >
          {/* Base Realized Image */}
          <img
            src="/assets/hero_monolith.jpg"
            alt="Kronos Monolith Pavilion"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              inset: 0,
              filter:
                activeLayer === 'wireframe'
                  ? 'grayscale(100%) brightness(0.2) contrast(200%)'
                  : activeLayer === 'thermal'
                  ? 'invert(100%) hue-rotate(180deg) saturate(300%)'
                  : activeLayer === 'structural'
                  ? 'sepia(100%) hue-rotate(320deg) contrast(150%) brightness(0.7)'
                  : 'none',
              transition: 'filter 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />

          {/* Wireframe CAD Vector Overlay */}
          {activeLayer === 'wireframe' && (
            <div
              className="blueprint-grid"
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                opacity: 0.9,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                viewBox="0 0 800 500"
                style={{
                  width: '90%',
                  height: '90%',
                  stroke: '#00f0ff',
                  strokeWidth: '1.2',
                  fill: 'none',
                  opacity: 0.85,
                }}
              >
                {/* Geodesic & Isometric blueprint lines */}
                <polygon points="400,60 620,180 580,380 220,380 180,180" strokeDasharray="4,4" />
                <polygon points="400,60 580,380 400,420 220,380" />
                <line x1="400" y1="60" x2="400" y2="420" stroke="#ff3b00" strokeWidth="2" />
                <line x1="180" y1="180" x2="620" y2="180" strokeDasharray="2,2" />
                <circle cx="400" cy="60" r="6" fill="#00f0ff" />
                <circle cx="620" cy="180" r="6" fill="#00f0ff" />
                <circle cx="580" cy="380" r="6" fill="#00f0ff" />
                <circle cx="220" cy="380" r="6" fill="#00f0ff" />
                <circle cx="180" cy="180" r="6" fill="#00f0ff" />
                <text x="420" y="70" fill="#00f0ff" fontFamily="JetBrains Mono" fontSize="12">
                  APEX: +28.00m (AZIMUTH 042°)
                </text>
                <text x="630" y="190" fill="#00f0ff" fontFamily="JetBrains Mono" fontSize="12">
                  TENSION VECTOR: 4,200 kN
                </text>
                <text x="230" y="400" fill="#ff3b00" fontFamily="JetBrains Mono" fontSize="12">
                  BASALT ANCHOR DEPTH: 14.5m
                </text>
              </svg>
            </div>
          )}

          {/* Thermal Flux Heat Map HUD */}
          {activeLayer === 'thermal' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background: 'radial-gradient(circle at 50% 55%, rgba(255, 59, 0, 0.45) 0%, rgba(138, 43, 226, 0.3) 50%, transparent 80%)',
                mixBlendMode: 'screen',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                padding: '32px',
              }}
            >
              <div
                className="panel-titanium font-mono"
                style={{
                  padding: '16px 20px',
                  borderRadius: '2px',
                  fontSize: '11px',
                  color: '#ffffff',
                }}
              >
                <div style={{ color: 'var(--color-cadmium)', fontWeight: 'bold', marginBottom: '6px' }}>
                  THERMAL CORE: +24.2°C
                </div>
                <div>EXTERNAL AMBIENT: -18.6°C</div>
                <div style={{ color: 'var(--color-aurum)', marginTop: '4px' }}>GEOTHERMAL DELTA: Δ 42.8 K</div>
              </div>
            </div>
          )}

          {/* Structural Stress Overlay */}
          {activeLayer === 'structural' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                padding: '32px',
              }}
            >
              <div
                className="panel-titanium font-mono"
                style={{
                  padding: '16px 20px',
                  borderRadius: '2px',
                  fontSize: '11px',
                  color: 'var(--color-bone)',
                }}
              >
                <div style={{ color: 'var(--color-cadmium)', fontWeight: 'bold', marginBottom: '6px' }}>
                  LOAD FACTOR: 0.28 (ULTRA-SAFE)
                </div>
                <div>CARBON WEAVE DENSITY: 850 g/m²</div>
                <div>WIND VELOCITY SURGE: 160 km/h RATED</div>
              </div>
            </div>
          )}

          {/* Live X-Ray Mode Switcher Toolbar */}
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              right: '24px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              zIndex: 20,
            }}
          >
            {/* Layer Buttons */}
            <div
              className="panel-titanium"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                padding: '6px',
                borderRadius: '2px',
              }}
            >
              {layers.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => {
                    soundEngine.playLaser(layer.id === 'realized' ? 600 : 900);
                    setActiveLayer(layer.id);
                  }}
                  data-cursor="button"
                  style={{
                    background: activeLayer === layer.id ? 'var(--color-cadmium)' : 'transparent',
                    color: activeLayer === layer.id ? '#ffffff' : 'var(--color-bone-muted)',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <Layers size={12} />
                  <span>{layer.label}</span>
                </button>
              ))}
            </div>

            {/* Deep Dive Case Study Button */}
            <button
              onClick={() => {
                soundEngine.playChime();
                onOpenProject('monolith-pavilion');
              }}
              data-cursor="button"
              className="magnetic-btn"
              style={{
                background: 'var(--color-bone)',
                color: '#07080a',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '2px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>INSPECT COMPLETE DOSSIER</span>
              <ExternalLink size={14} />
            </button>
          </div>
        </div>

        {/* Architectural Specs Data Ribbon */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
            marginTop: '32px',
          }}
        >
          {[
            { label: 'COORDINATES', val: '64.1466° N, 21.9426° W' },
            { label: 'TOTAL FOOTPRINT', val: '3,850 m² ENVELOPE' },
            { label: 'FACADE ACTUATION', val: 'GEOTHERMAL 32-AXIS' },
            { label: 'RESONANCE FREQUENCY', val: '432 Hz ACOUSTIC CORE' },
          ].map((spec) => (
            <div
              key={spec.label}
              className="panel-titanium"
              style={{
                padding: '20px',
                borderRadius: '2px',
              }}
            >
              <div
                className="font-mono"
                style={{
                  fontSize: '9px',
                  color: 'var(--color-slate-tech)',
                  letterSpacing: '0.16em',
                  marginBottom: '6px',
                }}
              >
                {spec.label}
              </div>
              <div
                className="font-display"
                style={{
                  fontSize: '15px',
                  fontWeight: 800,
                  color: 'var(--color-bone)',
                  letterSpacing: '0.04em',
                }}
              >
                {spec.val}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
