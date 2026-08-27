import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Sliders, Camera } from 'lucide-react';
import type { LabParameters } from '../types';
import { soundEngine } from '../services/soundEngine';
import confetti from 'canvas-confetti';

export const KineticLabSection: React.FC = () => {
  const [params, setParams] = useState<LabParameters>({
    fluidity: 75,
    latticeTension: 50,
    entropy: 30,
    luminescence: 80,
    preset: 'vortex',
  });

  const [snapshotTaken, setSnapshotTaken] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Apply preset helper
  const applyPreset = (preset: LabParameters['preset']) => {
    soundEngine.playLaser(900);
    switch (preset) {
      case 'vortex':
        setParams({ fluidity: 90, latticeTension: 60, entropy: 20, luminescence: 85, preset: 'vortex' });
        break;
      case 'crystal':
        setParams({ fluidity: 20, latticeTension: 95, entropy: 5, luminescence: 90, preset: 'crystal' });
        break;
      case 'quantum':
        setParams({ fluidity: 60, latticeTension: 30, entropy: 85, luminescence: 70, preset: 'quantum' });
        break;
      case 'tectonic':
        setParams({ fluidity: 40, latticeTension: 70, entropy: 45, luminescence: 60, preset: 'tectonic' });
        break;
    }
  };

  // Canvas Physics Simulator
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 540);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 540;
    };
    window.addEventListener('resize', handleResize);

    // Particles array
    interface LabParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseX: number;
      baseY: number;
      size: number;
      color: string;
      phase: number;
    }

    const particles: LabParticle[] = [];
    const count = 600;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const rad = 40 + Math.random() * (Math.min(width, height) * 0.42);
      const x = width / 2 + Math.cos(angle) * rad;
      const y = height / 2 + Math.sin(angle) * rad;

      particles.push({
        x,
        y,
        vx: 0,
        vy: 0,
        baseX: x,
        baseY: y,
        size: 1.5 + Math.random() * 2.5,
        color: Math.random() > 0.6 ? '#ff3b00' : Math.random() > 0.3 ? '#e5c992' : '#f4f3ef',
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Pointer Interaction
    const mouse = { x: width / 2, y: height / 2, isDown: false, isHovering: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isHovering = true;
    };

    const handleMouseDown = () => {
      mouse.isDown = true;
      soundEngine.playLaser(1100);
    };

    const handleMouseUp = () => {
      mouse.isDown = false;
    };

    const handleMouseLeave = () => {
      mouse.isHovering = false;
      mouse.isDown = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let t = 0;

    const loop = () => {
      t += 0.015;

      // Trail fade dependent on luminescence
      const trailAlpha = 0.35 - (params.luminescence / 100) * 0.22;
      ctx.fillStyle = `rgba(7, 8, 10, ${Math.max(0.08, trailAlpha)})`;
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Preset Specific Kinetics
        if (params.preset === 'vortex') {
          const dx = centerX - p.x;
          const dy = centerY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          // Tangential force
          const speed = (params.fluidity / 100) * 3.5;
          p.vx += (-dy / dist) * speed * 0.15;
          p.vy += (dx / dist) * speed * 0.15;
          // Inward pull
          p.vx += (dx / dist) * 0.03;
          p.vy += (dy / dist) * 0.03;
        } else if (params.preset === 'crystal') {
          // Rigid grid spring return
          const tension = (params.latticeTension / 100) * 0.12;
          p.vx += (p.baseX - p.x) * tension;
          p.vy += (p.baseY - p.y) * tension;
        } else if (params.preset === 'quantum') {
          // Brownian random excitation
          const entropyForce = (params.entropy / 100) * 2.2;
          p.vx += (Math.random() - 0.5) * entropyForce;
          p.vy += (Math.random() - 0.5) * entropyForce;
        } else if (params.preset === 'tectonic') {
          // Undulating waves
          const waveY = Math.sin(p.x * 0.02 + t * 2) * 1.5;
          p.vy += waveY * (params.fluidity / 100);
          p.vx += Math.cos(p.y * 0.02 + t) * 0.5;
        }

        // 2. Mouse interactive force field
        if (mouse.isHovering) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mDist < 160 && mDist > 0) {
            const forceMultiplier = mouse.isDown ? -8 : 3;
            const force = (1 - mDist / 160) * forceMultiplier;
            p.vx += (mdx / mDist) * force;
            p.vy += (mdy / mDist) * force;
          }
        }

        // 3. Damping / Fluidity resistance
        const damping = 0.88 + (params.fluidity / 100) * 0.09;
        p.vx *= damping;
        p.vy *= damping;

        // 4. Position update & wrap around
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // 5. Render particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color === '#ff3b00' ? '#ff3b00' : '#e5c992';
        ctx.shadowBlur = (params.luminescence / 100) * 12;
        ctx.fill();
      }

      // Draw connecting energy lines for crystal/vortex modes
      if (params.preset === 'crystal' || params.preset === 'vortex') {
        ctx.lineWidth = 0.6;
        for (let i = 0; i < particles.length; i += 6) {
          for (let j = i + 1; j < Math.min(i + 4, particles.length); j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const ldx = p1.x - p2.x;
            const ldy = p1.y - p2.y;
            const dist = ldx * ldx + ldy * ldy;
            if (dist < 1800) {
              const alpha = (1 - dist / 1800) * 0.25 * (params.luminescence / 100);
              ctx.strokeStyle = p1.color === '#ff3b00' ? `rgba(255, 59, 0, ${alpha})` : `rgba(229, 201, 146, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [params]);

  const handleCaptureSnapshot = () => {
    soundEngine.playChime();
    setSnapshotTaken(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ff3b00', '#e5c992', '#f4f3ef'],
    });
    setTimeout(() => setSnapshotTaken(false), 3000);
  };

  return (
    <section
      id="lab"
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
            <Sparkles size={14} />
            <span>[06.00 // THE KINETIC LAB]</span>
          </div>

          <div
            className="font-mono"
            style={{
              fontSize: '10px',
              color: 'var(--color-slate-tech)',
              letterSpacing: '0.14em',
            }}
          >
            GENERATIVE PARTICLE & TENSION SIMULATOR
          </div>
        </div>

        {/* Section Title */}
        <div style={{ marginBottom: '40px' }}>
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
            EXPERIMENTAL SANDBOX // LIVE WebGL COMPUTATION
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
            SPECULATIVE FORM <br />
            <span className="text-stroke-subtle">LABORATORY</span>
          </h2>
        </div>

        {/* The Interactive Lab Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '32px',
            alignItems: 'stretch',
          }}
        >
          {/* Controls Column */}
          <div
            className="panel-titanium"
            style={{
              padding: '32px',
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
                  color: 'var(--color-cadmium)',
                  letterSpacing: '0.14em',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Sliders size={14} />
                <span>ARCHITECTURAL PRESETS</span>
              </div>

              {/* Preset Buttons */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  marginBottom: '32px',
                }}
              >
                {(['vortex', 'crystal', 'quantum', 'tectonic'] as const).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => applyPreset(preset)}
                    data-cursor="button"
                    style={{
                      background: params.preset === preset ? 'var(--color-cadmium)' : 'rgba(255, 255, 255, 0.04)',
                      color: params.preset === preset ? '#ffffff' : 'var(--color-bone)',
                      border: params.preset === preset ? '1px solid var(--color-cadmium)' : '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '12px',
                      borderRadius: '2px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {/* Sliders List */}
              <div
                className="font-mono"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  fontSize: '10px',
                  color: 'var(--color-bone-muted)',
                }}
              >
                {/* Fluidity */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>FLUIDITY / VISCOSITY:</span>
                    <span style={{ color: 'var(--color-cadmium)' }}>{params.fluidity}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={params.fluidity}
                    onChange={(e) => {
                      soundEngine.playTick(1600);
                      setParams({ ...params, fluidity: Number(e.target.value) });
                    }}
                    style={{ width: '100%', accentColor: 'var(--color-cadmium)' }}
                  />
                </div>

                {/* Lattice Tension */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>LATTICE TENSION / ELASTICITY:</span>
                    <span style={{ color: 'var(--color-aurum)' }}>{params.latticeTension}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={params.latticeTension}
                    onChange={(e) => {
                      soundEngine.playTick(1600);
                      setParams({ ...params, latticeTension: Number(e.target.value) });
                    }}
                    style={{ width: '100%', accentColor: 'var(--color-aurum)' }}
                  />
                </div>

                {/* Entropy */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>GRAVITATIONAL ENTROPY:</span>
                    <span style={{ color: 'var(--color-bone)' }}>{params.entropy}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={params.entropy}
                    onChange={(e) => {
                      soundEngine.playTick(1600);
                      setParams({ ...params, entropy: Number(e.target.value) });
                    }}
                    style={{ width: '100%', accentColor: 'var(--color-bone)' }}
                  />
                </div>

                {/* Luminescence */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>PHOTON LUMINESCENCE:</span>
                    <span style={{ color: 'var(--color-cadmium)' }}>{params.luminescence}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={params.luminescence}
                    onChange={(e) => {
                      soundEngine.playTick(1600);
                      setParams({ ...params, luminescence: Number(e.target.value) });
                    }}
                    style={{ width: '100%', accentColor: 'var(--color-cadmium)' }}
                  />
                </div>
              </div>
            </div>

            {/* Snapshot & Action Button */}
            <div style={{ marginTop: '32px' }}>
              <button
                onClick={handleCaptureSnapshot}
                data-cursor="button"
                className="magnetic-btn"
                style={{
                  width: '100%',
                  background: snapshotTaken ? '#10b981' : 'var(--color-bone)',
                  color: '#07080a',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'background-color 0.3s ease',
                }}
              >
                <Camera size={14} />
                <span>{snapshotTaken ? 'TELEMETRY FRAME CAPTURED!' : 'CAPTURE SIMULATION SNAPSHOT'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Canvas Viewport Column */}
          <div
            style={{
              position: 'relative',
              borderRadius: '2px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backgroundColor: '#07080a',
              minHeight: '540px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <canvas ref={canvasRef} style={{ width: '100%', height: '540px', display: 'block', cursor: 'crosshair' }} />

            {/* Viewport Floating HUD */}
            <div
              className="font-mono"
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'rgba(7, 8, 10, 0.85)',
                backdropFilter: 'blur(8px)',
                padding: '6px 12px',
                fontSize: '10px',
                color: 'var(--color-cadmium)',
                letterSpacing: '0.12em',
                border: '1px solid rgba(255, 255, 255, 0.1)',
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
              <span>PHYSICS ENGINE: ACTIVE [{params.preset.toUpperCase()}]</span>
            </div>

            <div
              className="font-mono"
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                fontSize: '10px',
                color: 'var(--color-slate-tech)',
                letterSpacing: '0.1em',
              }}
            >
              [CLICK & HOLD TO GENERATE GRAVITATIONAL SINGULARITY]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
