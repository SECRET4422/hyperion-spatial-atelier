import React, { useEffect, useState } from 'react';
import { X, MapPin, Calendar, Award, CheckCircle2, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import type { Project } from '../types';
import { soundEngine } from '../services/soundEngine';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenCommission: (prefillTitle?: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenCommission }) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  useEffect(() => {
    setActiveImgIndex(0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundEngine.playTick(1000);
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(7, 8, 10, 0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundEngine.playTick(1000);
          onClose();
        }
      }}
    >
      {/* Modal Drawer Sheet */}
      <div
        style={{
          width: '100%',
          maxWidth: '1100px',
          height: '100%',
          backgroundColor: '#0a0c10',
          borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          position: 'relative',
          padding: '48px 40px',
        }}
      >
        {/* Top Sticky Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '24px',
            marginBottom: '32px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span
              className="font-mono"
              style={{
                fontSize: '11px',
                color: 'var(--color-cadmium)',
                letterSpacing: '0.18em',
                fontWeight: 700,
              }}
            >
              ARCHIVAL DOSSIER // {project.category.toUpperCase()}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            <span
              className="font-mono"
              style={{
                fontSize: '10px',
                color: 'var(--color-slate-tech)',
              }}
            >
              REF: {project.id.toUpperCase()}
            </span>
          </div>

          <button
            onClick={() => {
              soundEngine.playTick(1000);
              onClose();
            }}
            data-cursor="button"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: 'var(--color-bone)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-cadmium)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.color = 'var(--color-bone)';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Hero Gallery Viewport */}
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              width: '100%',
              height: '480px',
              borderRadius: '2px',
              overflow: 'hidden',
              backgroundColor: '#050608',
              position: 'relative',
              marginBottom: '16px',
            }}
          >
            <img
              src={project.galleryImages[activeImgIndex] || project.heroImage}
              alt={project.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'opacity 0.4s ease',
              }}
            />

            <div
              className="font-mono"
              style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                background: 'rgba(7, 8, 10, 0.85)',
                backdropFilter: 'blur(10px)',
                padding: '4px 12px',
                fontSize: '10px',
                color: 'var(--color-aurum)',
                letterSpacing: '0.12em',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              PLATE 0{activeImgIndex + 1} OF 0{project.galleryImages.length}
            </div>
          </div>

          {/* Gallery Thumbnail Strip */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {project.galleryImages.map((imgUrl, i) => (
              <button
                key={i}
                onClick={() => {
                  soundEngine.playTick(1600);
                  setActiveImgIndex(i);
                }}
                data-cursor="button"
                style={{
                  width: '90px',
                  height: '60px',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  padding: 0,
                  border: activeImgIndex === i ? '2px solid var(--color-cadmium)' : '1px solid rgba(255, 255, 255, 0.15)',
                  cursor: 'pointer',
                  opacity: activeImgIndex === i ? 1 : 0.6,
                  transition: 'all 0.2s ease',
                }}
              >
                <img src={imgUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>

        {/* Project Header Info */}
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-slate-tech)',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={12} color="var(--color-aurum)" />
              {project.location}
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={12} color="var(--color-cadmium)" />
              YEAR: {project.year}
            </span>
            <span>•</span>
            <span>COMMISSIONER: {project.client}</span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              marginBottom: '8px',
            }}
          >
            {project.title}
          </h2>

          <p
            className="font-editorial"
            style={{
              fontSize: '16px',
              fontStyle: 'italic',
              color: 'var(--color-aurum)',
              marginBottom: '24px',
            }}
          >
            {project.subtitle}
          </p>

          <p
            className="font-sans"
            style={{
              fontSize: '15px',
              color: 'var(--color-bone)',
              lineHeight: 1.7,
              marginBottom: '32px',
            }}
          >
            {project.fullDescription}
          </p>
        </div>

        {/* Quantitative Metrics Matrix */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              className="panel-titanium"
              style={{
                padding: '16px',
                borderRadius: '2px',
              }}
            >
              <div
                className="font-mono"
                style={{
                  fontSize: '9px',
                  color: 'var(--color-slate-tech)',
                  letterSpacing: '0.14em',
                  marginBottom: '4px',
                }}
              >
                {metric.label.toUpperCase()}
              </div>
              <div
                className="font-display"
                style={{
                  fontSize: '15px',
                  fontWeight: 800,
                  color: 'var(--color-cadmium)',
                }}
              >
                {metric.value}
              </div>
            </div>
          ))}
        </div>

        {/* Engineering Highlights & Materiality */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            marginBottom: '40px',
          }}
        >
          {/* Materials */}
          <div className="panel-titanium" style={{ padding: '24px', borderRadius: '2px' }}>
            <h4
              className="font-mono"
              style={{
                fontSize: '11px',
                color: 'var(--color-aurum)',
                letterSpacing: '0.14em',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <ShieldCheck size={14} />
              <span>MATERIALITY MATRIX</span>
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.materials.map((mat) => (
                <span
                  key={mat}
                  className="font-mono"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '6px 12px',
                    fontSize: '10px',
                    color: 'var(--color-bone)',
                    borderRadius: '2px',
                  }}
                >
                  {mat}
                </span>
              ))}
            </div>
          </div>

          {/* Engineering Innovations */}
          <div className="panel-titanium" style={{ padding: '24px', borderRadius: '2px' }}>
            <h4
              className="font-mono"
              style={{
                fontSize: '11px',
                color: 'var(--color-cadmium)',
                letterSpacing: '0.14em',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Compass size={14} />
              <span>TECTONIC INNOVATIONS</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {project.engineeringHighlights.map((hl, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    fontSize: '12px',
                    color: 'var(--color-bone-muted)',
                    lineHeight: 1.5,
                  }}
                >
                  <CheckCircle2 size={14} color="var(--color-cadmium)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Accolades & Commission CTA Footer */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '32px',
            marginTop: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          <div>
            <div
              className="font-mono"
              style={{
                fontSize: '10px',
                color: 'var(--color-slate-tech)',
                letterSpacing: '0.14em',
                marginBottom: '6px',
              }}
            >
              DISTINCTIONS & AWARDS
            </div>
            {project.accolades.map((acc, idx) => (
              <div
                key={idx}
                className="font-editorial"
                style={{
                  fontSize: '13px',
                  fontStyle: 'italic',
                  color: 'var(--color-bone)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Award size={13} color="var(--color-aurum)" />
                {acc}
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              soundEngine.playChime();
              onClose();
              onOpenCommission(project.title);
            }}
            data-cursor="button"
            className="magnetic-btn"
            style={{
              background: 'var(--color-cadmium)',
              color: '#ffffff',
              border: 'none',
              padding: '14px 28px',
              borderRadius: '2px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 0 24px rgba(255, 59, 0, 0.4)',
            }}
          >
            <span>COMMISSION COMPARATIVE MONOGRAPH</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
