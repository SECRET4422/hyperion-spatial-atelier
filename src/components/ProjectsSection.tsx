import React, { useState } from 'react';
import { LayoutGrid, Table, ArrowUpRight, MapPin } from 'lucide-react';
import type { Project, ProjectCategory } from '../types';
import { PROJECTS } from '../data/atelierData';
import { soundEngine } from '../services/soundEngine';

interface ProjectsSectionProps {
  onOpenProject: (projectId: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [viewMode, setViewMode] = useState<'gallery' | 'ledger'>('gallery');
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const filteredProjects =
    selectedCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'ALL MONOGRAPHS' },
    { id: 'pavilions', label: 'SPECULATIVE PAVILIONS' },
    { id: 'scenography', label: 'KINETIC SCENOGRAPHY' },
    { id: 'generative', label: 'GENERATIVE REALMS' },
    { id: 'hardware', label: 'SPATIAL HARDWARE' },
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      id="projects"
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-obsidian-subtle)',
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
            <span>[04.00 // SPATIAL ARCHIVES]</span>
          </div>

          <div
            className="font-mono"
            style={{
              fontSize: '10px',
              color: 'var(--color-slate-tech)',
              letterSpacing: '0.14em',
            }}
          >
            CURATED COMMISSIONS & ARTIFACTS
          </div>
        </div>

        {/* Section Title & View Toggle Controls */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '32px',
            marginBottom: '48px',
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
              SELECTED WORKS // 2025-2026
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
              PHYSICAL REALITIES & <br />
              <span className="text-stroke-subtle">KINETIC MONUMENTS</span>
            </h2>
          </div>

          {/* View Mode Toggle Switch */}
          <div
            className="panel-titanium"
            style={{
              display: 'flex',
              padding: '4px',
              borderRadius: '2px',
            }}
          >
            <button
              onClick={() => {
                soundEngine.playTick(1200);
                setViewMode('gallery');
              }}
              data-cursor="button"
              style={{
                background: viewMode === 'gallery' ? 'var(--color-cadmium)' : 'transparent',
                color: viewMode === 'gallery' ? '#ffffff' : 'var(--color-bone-muted)',
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
              <LayoutGrid size={14} />
              <span>GALLERY</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playTick(1200);
                setViewMode('ledger');
              }}
              data-cursor="button"
              style={{
                background: viewMode === 'ledger' ? 'var(--color-cadmium)' : 'transparent',
                color: viewMode === 'ledger' ? '#ffffff' : 'var(--color-bone-muted)',
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
              <Table size={14} />
              <span>LEDGER</span>
            </button>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '48px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '20px',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundEngine.playLaser(800);
                setSelectedCategory(cat.id);
              }}
              data-cursor="button"
              style={{
                background: selectedCategory === cat.id ? 'rgba(255, 59, 0, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                color: selectedCategory === cat.id ? 'var(--color-cadmium)' : 'var(--color-bone-muted)',
                border: selectedCategory === cat.id ? '1px solid var(--color-cadmium)' : '1px solid rgba(255, 255, 255, 0.08)',
                padding: '8px 16px',
                borderRadius: '2px',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {cat.label} (
              {cat.id === 'all'
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.category === cat.id).length}
              )
            </button>
          ))}
        </div>

        {/* VIEW MODE 1: Spatial 3D Gallery */}
        {viewMode === 'gallery' ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
              gap: '40px',
            }}
          >
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => {
                  soundEngine.playChime();
                  onOpenProject(project.id);
                }}
                data-cursor="view"
                data-cursor-text="DOSSIER"
                className="panel-titanium panel-titanium-hover"
                style={{
                  borderRadius: '2px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Image Window */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: '62%',
                    overflow: 'hidden',
                    backgroundColor: '#07080a',
                  }}
                >
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1.0)';
                    }}
                  />

                  {/* Year & Index Badge */}
                  <div
                    className="font-mono"
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      background: 'rgba(7, 8, 10, 0.85)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '4px 10px',
                      fontSize: '10px',
                      color: 'var(--color-aurum)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    0{idx + 1} // {project.year}
                  </div>

                  {/* Category Tag */}
                  <div
                    className="font-mono"
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: 'var(--color-cadmium)',
                      padding: '4px 10px',
                      fontSize: '9px',
                      fontWeight: 700,
                      color: '#ffffff',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {project.category}
                  </div>
                </div>

                {/* Project Metadata Card Body */}
                <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      fontSize: '11px',
                      color: 'var(--color-slate-tech)',
                      fontFamily: 'var(--font-mono)',
                      marginBottom: '12px',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} color="var(--color-aurum)" />
                      {project.location}
                    </span>
                  </div>

                  <h3
                    className="font-display"
                    style={{
                      fontSize: '22px',
                      fontWeight: 800,
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase',
                      color: 'var(--color-bone)',
                      marginBottom: '8px',
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    className="font-editorial"
                    style={{
                      fontSize: '14px',
                      fontStyle: 'italic',
                      color: 'var(--color-cadmium)',
                      marginBottom: '16px',
                    }}
                  >
                    {project.subtitle}
                  </p>

                  <p
                    className="font-sans"
                    style={{
                      fontSize: '13px',
                      color: 'var(--color-bone-muted)',
                      lineHeight: 1.6,
                      marginBottom: '24px',
                      flexGrow: 1,
                    }}
                  >
                    {project.excerpt}
                  </p>

                  {/* Card Bottom Specs & CTA */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      paddingTop: '16px',
                      marginTop: 'auto',
                    }}
                  >
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '10px',
                        color: 'var(--color-slate-tech)',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {project.dimensions}
                    </span>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: 'var(--color-bone)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                      }}
                    >
                      <span>INSPECT</span>
                      <ArrowUpRight size={14} color="var(--color-cadmium)" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* VIEW MODE 2: Architectural Ledger Table */
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
                gridTemplateColumns: '80px 2fr 1.5fr 1fr 100px',
                padding: '16px 24px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '10px',
                color: 'var(--color-slate-tech)',
                letterSpacing: '0.14em',
              }}
            >
              <div>REF</div>
              <div>MONOGRAPH // TITLE</div>
              <div>LOCATION & CLIENT</div>
              <div>TYPOLOGY</div>
              <div style={{ textAlign: 'right' }}>ACTION</div>
            </div>

            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => {
                  soundEngine.playChime();
                  onOpenProject(project.id);
                }}
                onMouseEnter={() => {
                  soundEngine.playTick(1600);
                  setHoveredProject(project);
                }}
                onMouseLeave={() => setHoveredProject(null)}
                data-cursor="view"
                data-cursor-text="OPEN"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 2fr 1.5fr 1fr 100px',
                  alignItems: 'center',
                  padding: '24px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  cursor: 'pointer',
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
                  0{idx + 1}
                </div>

                <div>
                  <div
                    className="font-display"
                    style={{
                      fontSize: '16px',
                      fontWeight: 800,
                      color: 'var(--color-bone)',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {project.title}
                  </div>
                  <div
                    className="font-editorial"
                    style={{
                      fontSize: '12px',
                      fontStyle: 'italic',
                      color: 'var(--color-cadmium)',
                      marginTop: '2px',
                    }}
                  >
                    {project.subtitle}
                  </div>
                </div>

                <div
                  className="font-sans"
                  style={{
                    fontSize: '12px',
                    color: 'var(--color-bone-muted)',
                  }}
                >
                  {project.location}
                </div>

                <div
                  className="font-mono"
                  style={{
                    fontSize: '10px',
                    color: 'var(--color-slate-tech)',
                    textTransform: 'uppercase',
                  }}
                >
                  {project.category}
                </div>

                <div style={{ textAlign: 'right' }}>
                  <ArrowUpRight size={16} color="var(--color-cadmium)" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Floating Dynamic Hover Image Portal for Ledger Mode */}
        {viewMode === 'ledger' && hoveredProject && (
          <div
            style={{
              position: 'fixed',
              left: `${mousePos.x + 20}px`,
              top: `${mousePos.y - 120}px`,
              width: '280px',
              height: '180px',
              borderRadius: '2px',
              overflow: 'hidden',
              pointerEvents: 'none',
              zIndex: 999,
              boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
              border: '1px solid var(--color-cadmium)',
              animation: 'fadeIn 0.2s ease',
            }}
          >
            <img
              src={hoveredProject.heroImage}
              alt={hoveredProject.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};
