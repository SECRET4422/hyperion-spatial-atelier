import React, { useState } from 'react';
import { Quote, BookOpen } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';

export const PhilosophySection: React.FC = () => {
  const [activeQuoteId, setActiveQuoteId] = useState<number>(0);

  const passages = [
    {
      title: 'I. THE MONUMENT IN MOTION',
      text: 'For five thousand years, architecture has been an obsession with resisting gravity and weather through sheer geological mass. Stone, brick, reinforced concrete — monuments constructed to assert permanence against the relentless decay of time. But in the computational epoch, permanence is no longer synonymous with inertia.',
      annotation: '“To endure today is not to remain rigid; to endure is to calculate, deform, and harmonize with flux.”',
    },
    {
      title: 'II. THE MORPHOLOGY OF SHADOW',
      text: 'Where modernist glass curtain walls surrendered all mystery to flat, uniform transparency, Hyperion re-establishes the radical power of shadow. We treat darkness as a tactile physical medium. Light is not ambient illumination; it is a razor blade slicing through volcanic obsidian.',
      annotation: '“Light without darkness is mere exposure; shadow with intent is spatial sacredness.”',
    },
    {
      title: 'III. THE BIO-SYNTHETIC COMMONS',
      text: 'Our kinetic structures do not consume power as destructive parasites. By coupling robotic actuators directly to geothermal vapor pressures, diurnal solar expansions, and micro-barometric shifts, our pavilions operate with zero-loss energetic equilibrium.',
      annotation: '“Architecture that breathes with the planetary metabolism.”',
    },
  ];

  return (
    <section
      id="philosophy"
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-obsidian)',
        padding: '140px 32px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
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
            <BookOpen size={14} />
            <span>[05.00 // THE QUIET ROOM · PHILOSOPHICAL ESSAY]</span>
          </div>

          <div
            className="font-mono"
            style={{
              fontSize: '10px',
              color: 'var(--color-slate-tech)',
              letterSpacing: '0.14em',
            }}
          >
            TREATISE ON KINETIC FORM
          </div>
        </div>

        {/* Large Editorial Headline */}
        <div style={{ marginBottom: '64px' }}>
          <h2
            className="font-editorial"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 4.2rem)',
              fontStyle: 'italic',
              fontWeight: 400,
              lineHeight: 1.15,
              color: 'var(--color-bone)',
              maxWidth: '1100px',
            }}
          >
            “The building of the future is neither physical nor virtual. It is a kinetic boundary state where matter performs in real-time dialogue with human consciousness.”
          </h2>
          <div
            className="font-mono"
            style={{
              fontSize: '11px',
              color: 'var(--color-cadmium)',
              letterSpacing: '0.16em',
              marginTop: '20px',
            }}
          >
            — HYPERION MONOGRAPH ESSAY NO. 04 // PROF. ARIS THORVALD
          </div>
        </div>

        {/* 2-Column Monograph Spread */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '64px',
            alignItems: 'flex-start',
          }}
        >
          {/* Left Column: Essay Chapters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {passages.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  soundEngine.playTick(1400);
                  setActiveQuoteId(idx);
                }}
                data-cursor="button"
                style={{
                  cursor: 'pointer',
                  borderLeft: activeQuoteId === idx ? '2px solid var(--color-cadmium)' : '2px solid rgba(255, 255, 255, 0.1)',
                  paddingLeft: '24px',
                  transition: 'border-color 0.3s ease',
                }}
              >
                <h3
                  className="font-mono"
                  style={{
                    fontSize: '11px',
                    color: activeQuoteId === idx ? 'var(--color-cadmium)' : 'var(--color-slate-tech)',
                    letterSpacing: '0.14em',
                    marginBottom: '12px',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="font-sans"
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.8,
                    color: activeQuoteId === idx ? 'var(--color-bone)' : 'var(--color-bone-muted)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: Dynamic Architectural Monograph Pull-Card */}
          <div
            className="panel-titanium"
            style={{
              padding: '48px',
              borderRadius: '2px',
              position: 'sticky',
              top: '120px',
              background: 'rgba(14, 17, 23, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
              }}
            >
              <span
                className="font-mono"
                style={{
                  fontSize: '10px',
                  color: 'var(--color-aurum)',
                  letterSpacing: '0.16em',
                }}
              >
                CURATED PULL-QUOTE // CHAPTER 0{activeQuoteId + 1}
              </span>
              <Quote size={20} color="var(--color-cadmium)" />
            </div>

            <p
              className="font-editorial"
              style={{
                fontSize: '22px',
                fontStyle: 'italic',
                lineHeight: 1.5,
                color: 'var(--color-bone)',
                marginBottom: '32px',
              }}
            >
              {passages[activeQuoteId].annotation}
            </p>

            <div
              className="font-mono"
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '20px',
                fontSize: '10px',
                color: 'var(--color-slate-tech)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>ATELIER ARCHIVE VOL. VII</span>
              <span style={{ color: 'var(--color-cadmium)' }}>ISBN 978-0-99283-1</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
