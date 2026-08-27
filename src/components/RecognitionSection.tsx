import React, { useState } from 'react';
import { Award, Quote } from 'lucide-react';
import { RECOGNITIONS, PRESS_QUOTES } from '../data/atelierData';
import { soundEngine } from '../services/soundEngine';

export const RecognitionSection: React.FC = () => {
  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);

  return (
    <section
      id="recognition"
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
            <Award size={14} />
            <span>[07.00 // DIALOGUES & RECOGNITION]</span>
          </div>

          <div
            className="font-mono"
            style={{
              fontSize: '10px',
              color: 'var(--color-slate-tech)',
              letterSpacing: '0.14em',
            }}
          >
            GLOBAL CITATIONS & HONORS
          </div>
        </div>

        {/* Section Title */}
        <div style={{ marginBottom: '56px' }}>
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
            INSTITUTIONAL CRITIQUE // AWARDS
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
            INTERNATIONAL <br />
            <span className="text-stroke-subtle">ACCLAIM</span>
          </h2>
        </div>

        {/* 2-Column Grid: Left Awards Ledger, Right Press Dialogue Slider */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
            gap: '64px',
            alignItems: 'flex-start',
          }}
        >
          {/* Left: Tabular Awards Ledger */}
          <div
            className="panel-titanium"
            style={{
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              className="font-mono"
              style={{
                display: 'grid',
                gridTemplateColumns: '70px 1.5fr 1fr',
                padding: '16px 24px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '10px',
                color: 'var(--color-slate-tech)',
                letterSpacing: '0.14em',
              }}
            >
              <div>YEAR</div>
              <div>DISTINCTION // MONOGRAPH</div>
              <div>ORGANIZATION</div>
            </div>

            {RECOGNITIONS.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={() => soundEngine.playTick(1600)}
                data-cursor="button"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '70px 1.5fr 1fr',
                  alignItems: 'center',
                  padding: '20px 24px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div
                  className="font-mono"
                  style={{
                    fontSize: '11px',
                    color: 'var(--color-aurum)',
                  }}
                >
                  {item.year}
                </div>

                <div>
                  <div
                    className="font-display"
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: 'var(--color-bone)',
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.award}
                  </div>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: '10px',
                      color: 'var(--color-cadmium)',
                      marginTop: '2px',
                    }}
                  >
                    {item.project}
                  </div>
                </div>

                <div
                  className="font-sans"
                  style={{
                    fontSize: '12px',
                    color: 'var(--color-bone-muted)',
                  }}
                >
                  {item.organization}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Press Critique Card */}
          <div
            className="panel-titanium"
            style={{
              padding: '48px',
              borderRadius: '2px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '440px',
              background: 'rgba(14, 17, 23, 0.95)',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '32px',
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: '10px',
                    color: 'var(--color-cadmium)',
                    letterSpacing: '0.16em',
                  }}
                >
                  PRESS CRITIQUE // 0{activeQuoteIdx + 1} OF 0{PRESS_QUOTES.length}
                </span>
                <Quote size={24} color="var(--color-aurum)" />
              </div>

              <p
                className="font-editorial"
                style={{
                  fontSize: '24px',
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                  color: 'var(--color-bone)',
                  marginBottom: '32px',
                }}
              >
                {PRESS_QUOTES[activeQuoteIdx].quote}
              </p>
            </div>

            <div>
              <div
                className="font-mono"
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '20px',
                  marginBottom: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-bone)' }}>
                    {PRESS_QUOTES[activeQuoteIdx].author}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-slate-tech)', marginTop: '2px' }}>
                    {PRESS_QUOTES[activeQuoteIdx].publication} ({PRESS_QUOTES[activeQuoteIdx].year})
                  </div>
                </div>
              </div>

              {/* Quote Pagination Buttons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {PRESS_QUOTES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      soundEngine.playTick(1600);
                      setActiveQuoteIdx(i);
                    }}
                    data-cursor="button"
                    style={{
                      width: '36px',
                      height: '4px',
                      background: activeQuoteIdx === i ? 'var(--color-cadmium)' : 'rgba(255, 255, 255, 0.15)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
