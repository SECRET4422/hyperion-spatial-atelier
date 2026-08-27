import React, { useState } from 'react';
import { Send, ArrowRight, Calculator, Check } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';
import confetti from 'canvas-confetti';

interface CommissionSectionProps {
  prefillProjectTitle?: string;
}

export const CommissionSection: React.FC<CommissionSectionProps> = ({ prefillProjectTitle }) => {
  const [typology, setTypology] = useState<'pavilion' | 'scenography' | 'generative' | 'hardware'>('pavilion');
  const [scaleArea, setScaleArea] = useState<number>(2400); // m²
  const [timelineMonths, setTimelineMonths] = useState<number>(12); // months
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    brief: prefillProjectTitle ? `Inquiry regarding comparative monograph or execution similar to: ${prefillProjectTitle}` : '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Dynamic scope and budget calculation
  const baseCostPerSqm = {
    pavilion: 3200,
    scenography: 2400,
    generative: 1600,
    hardware: 4500,
  }[typology];

  const estimatedBudget = Math.round((scaleArea * baseCostPerSqm) / 1000); // in thousands EUR
  const engineeringHours = Math.round(scaleArea * 0.75 + timelineMonths * 120);
  const feasibilityScore = Math.min(99.4, +(92.0 + (timelineMonths / 24) * 7.4).toFixed(1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    soundEngine.playChime();
    setSubmitted(true);
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff3b00', '#e5c992', '#f4f3ef'],
    });
  };

  return (
    <section
      id="commission"
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-obsidian-subtle)',
        padding: '140px 32px 100px',
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
            <Calculator size={14} />
            <span>[08.00 // COMMISSIONS & TERMINALS]</span>
          </div>

          <div
            className="font-mono"
            style={{
              fontSize: '10px',
              color: 'var(--color-slate-tech)',
              letterSpacing: '0.14em',
            }}
          >
            PROJECT SCOPE & INTAKE PROTOCOL
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
            INITIATE DIALOGUE // 2026-2027 CALENDAR
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
            COMMISSION A <br />
            <span className="text-stroke-subtle">MONUMENT</span>
          </h2>
        </div>

        {/* 2-Column Grid: Left Calculator, Right Intake Form */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))',
            gap: '48px',
            alignItems: 'stretch',
          }}
        >
          {/* Left: Interactive Project Scope Calculator */}
          <div
            className="panel-titanium"
            style={{
              padding: '40px',
              borderRadius: '2px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                className="font-mono"
                style={{
                  fontSize: '11px',
                  color: 'var(--color-aurum)',
                  letterSpacing: '0.14em',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Calculator size={14} />
                <span>SPATIAL SCOPE ESTIMATOR</span>
              </div>

              {/* Typology Select */}
              <div style={{ marginBottom: '28px' }}>
                <label
                  className="font-mono"
                  style={{
                    fontSize: '10px',
                    color: 'var(--color-bone-muted)',
                    display: 'block',
                    marginBottom: '12px',
                  }}
                >
                  PROJECT TYPOLOGY:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {[
                    { id: 'pavilion', label: 'SPECULATIVE PAVILION' },
                    { id: 'scenography', label: 'KINETIC SCENOGRAPHY' },
                    { id: 'generative', label: 'GENERATIVE REALM' },
                    { id: 'hardware', label: 'SPATIAL HARDWARE' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        soundEngine.playLaser(800);
                        setTypology(t.id as typeof typology);
                      }}
                      data-cursor="button"
                      style={{
                        background: typology === t.id ? 'var(--color-cadmium)' : 'rgba(255, 255, 255, 0.04)',
                        color: typology === t.id ? '#ffffff' : 'var(--color-bone-muted)',
                        border: typology === t.id ? '1px solid var(--color-cadmium)' : '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '10px 8px',
                        borderRadius: '2px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scale Area Slider */}
              <div style={{ marginBottom: '28px' }}>
                <div
                  className="font-mono"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '10px',
                    color: 'var(--color-bone-muted)',
                    marginBottom: '8px',
                  }}
                >
                  <span>SPATIAL SCALE / ENVELOPE:</span>
                  <span style={{ color: 'var(--color-cadmium)' }}>{scaleArea.toLocaleString()} m²</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="10000"
                  step="100"
                  value={scaleArea}
                  onChange={(e) => {
                    soundEngine.playTick(1500);
                    setScaleArea(Number(e.target.value));
                  }}
                  style={{ width: '100%', accentColor: 'var(--color-cadmium)' }}
                />
              </div>

              {/* Timeline Slider */}
              <div style={{ marginBottom: '32px' }}>
                <div
                  className="font-mono"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '10px',
                    color: 'var(--color-bone-muted)',
                    marginBottom: '8px',
                  }}
                >
                  <span>ESTIMATED DELIVERY HORIZON:</span>
                  <span style={{ color: 'var(--color-aurum)' }}>{timelineMonths} MONTHS</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="24"
                  value={timelineMonths}
                  onChange={(e) => {
                    soundEngine.playTick(1500);
                    setTimelineMonths(Number(e.target.value));
                  }}
                  style={{ width: '100%', accentColor: 'var(--color-aurum)' }}
                />
              </div>
            </div>

            {/* Calculated Estimates Display */}
            <div
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                paddingTop: '24px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '16px',
              }}
            >
              <div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: '9px',
                    color: 'var(--color-slate-tech)',
                    letterSpacing: '0.12em',
                  }}
                >
                  ESTIMATED BUDGET
                </div>
                <div
                  className="font-display"
                  style={{
                    fontSize: '17px',
                    fontWeight: 800,
                    color: 'var(--color-cadmium)',
                    marginTop: '4px',
                  }}
                >
                  €{estimatedBudget.toLocaleString()}k
                </div>
              </div>

              <div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: '9px',
                    color: 'var(--color-slate-tech)',
                    letterSpacing: '0.12em',
                  }}
                >
                  EST. BANDWIDTH
                </div>
                <div
                  className="font-display"
                  style={{
                    fontSize: '17px',
                    fontWeight: 800,
                    color: 'var(--color-bone)',
                    marginTop: '4px',
                  }}
                >
                  {engineeringHours.toLocaleString()}h
                </div>
              </div>

              <div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: '9px',
                    color: 'var(--color-slate-tech)',
                    letterSpacing: '0.12em',
                  }}
                >
                  FEASIBILITY
                </div>
                <div
                  className="font-display"
                  style={{
                    fontSize: '17px',
                    fontWeight: 800,
                    color: '#10b981',
                    marginTop: '4px',
                  }}
                >
                  {feasibilityScore}%
                </div>
              </div>
            </div>
          </div>

          {/* Right: Commission Inquiry Form */}
          <div
            className="panel-titanium"
            style={{
              padding: '40px',
              borderRadius: '2px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {submitted ? (
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '40px 20px',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 59, 0, 0.15)',
                    border: '1.5px solid var(--color-cadmium)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                  }}
                >
                  <Check size={32} color="var(--color-cadmium)" />
                </div>
                <h3
                  className="font-display"
                  style={{
                    fontSize: '24px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                  }}
                >
                  COMMISSION RECEIVED
                </h3>
                <p
                  className="font-sans"
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-bone-muted)',
                    lineHeight: 1.6,
                    maxWidth: '380px',
                    marginBottom: '24px',
                  }}
                >
                  Your inquiry has been encrypted and routed to the Hyperion Atelier board in Zurich & Tokyo. An art director will initiate contact within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  data-cursor="button"
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'var(--color-bone)',
                    padding: '10px 20px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    cursor: 'pointer',
                    borderRadius: '2px',
                  }}
                >
                  SUBMIT ANOTHER INQUIRY
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div
                  className="font-mono"
                  style={{
                    fontSize: '11px',
                    color: 'var(--color-cadmium)',
                    letterSpacing: '0.14em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Send size={14} />
                  <span>CLIENT DOSSIER TRANSMISSION</span>
                </div>

                <div>
                  <label
                    className="font-mono"
                    style={{
                      fontSize: '10px',
                      color: 'var(--color-bone-muted)',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    PRINCIPAL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Charlotte de Saint-Germain"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '12px 16px',
                      color: 'var(--color-bone)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      borderRadius: '2px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label
                      className="font-mono"
                      style={{
                        fontSize: '10px',
                        color: 'var(--color-bone-muted)',
                        display: 'block',
                        marginBottom: '6px',
                      }}
                    >
                      DIRECT EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="principal@institution.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '12px 16px',
                        color: 'var(--color-bone)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '13px',
                        borderRadius: '2px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="font-mono"
                      style={{
                        fontSize: '10px',
                        color: 'var(--color-bone-muted)',
                        display: 'block',
                        marginBottom: '6px',
                      }}
                    >
                      ORGANIZATION / BRAND
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Nordic Foundation"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      style={{
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '12px 16px',
                        color: 'var(--color-bone)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '13px',
                        borderRadius: '2px',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="font-mono"
                    style={{
                      fontSize: '10px',
                      color: 'var(--color-bone-muted)',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    COMMISSION BRIEF & SPATIAL INTENT
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe spatial parameters, site location, structural aspirations..."
                    value={formData.brief}
                    onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '12px 16px',
                      color: 'var(--color-bone)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      borderRadius: '2px',
                      outline: 'none',
                      resize: 'none',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  data-cursor="button"
                  className="magnetic-btn"
                  style={{
                    background: 'var(--color-cadmium)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '16px',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.16em',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    marginTop: '8px',
                    boxShadow: '0 0 30px rgba(255, 59, 0, 0.4)',
                  }}
                >
                  <span>TRANSMIT COMMISSION INQUIRY</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
