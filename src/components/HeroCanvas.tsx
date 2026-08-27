import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  originX: number;
  originY: number;
  originZ: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
  alpha: number;
  phase: number;
}

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse & Touch Tracking with smoothing
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 180,
      isDown: false,
      lastClick: 0
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    };

    const handleMouseDown = () => {
      mouse.isDown = true;
      mouse.lastClick = Date.now();
    };

    const handleMouseUp = () => {
      mouse.isDown = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Generate Architectural Kinetic Particle Geometry (Double Hyperbolic Torus & Radial Lattice)
    const particles: Particle[] = [];
    const NUM_PARTICLES = Math.min(1400, Math.floor((width * height) / 800));
    const rings = 28;
    const pointsPerRing = Math.floor(NUM_PARTICLES / rings);

    for (let r = 0; r < rings; r++) {
      const ringRadius = 80 + r * 14;
      const zOffset = (r - rings / 2) * 18;

      for (let p = 0; p < pointsPerRing; p++) {
        const angle = (p / pointsPerRing) * Math.PI * 2 + (r * 0.12);
        const x = Math.cos(angle) * ringRadius;
        const y = Math.sin(angle) * (ringRadius * 0.45) + Math.sin(r * 0.5) * 40;
        const z = zOffset + Math.sin(angle * 3) * 35;

        // Colors: Cadmium Vermilion (#ff3b00), Champagne Aurum (#e5c992), Titanium Bone (#f4f3ef)
        const rand = Math.random();
        let color = '#f4f3ef';
        let size = 1.2 + Math.random() * 1.5;
        if (rand < 0.15) {
          color = '#ff3b00';
          size = 2.2 + Math.random() * 1.8;
        } else if (rand < 0.45) {
          color = '#e5c992';
          size = 1.6 + Math.random() * 1.2;
        }

        particles.push({
          x,
          y,
          z,
          originX: x,
          originY: y,
          originZ: z,
          vx: 0,
          vy: 0,
          vz: 0,
          size,
          color,
          alpha: 0.25 + Math.random() * 0.75,
          phase: Math.random() * Math.PI * 2
        });
      }
    }

    let time = 0;

    const render = () => {
      time += 0.008;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Subtle atmospheric fade for kinetic motion trails
      ctx.fillStyle = 'rgba(7, 8, 10, 0.28)';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const fov = 420;

      // Rotate whole system based on time + subtle mouse offset
      const rotY = time * 0.35 + (mouse.x - centerX) * 0.0008;
      const rotX = Math.sin(time * 0.4) * 0.15 + (mouse.y - centerY) * 0.0006;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Shockwave pulse if recently clicked
      const timeSinceClick = Date.now() - mouse.lastClick;
      const shockwaveRadius = timeSinceClick < 1200 ? (timeSinceClick / 1200) * 450 : 0;

      // Sort particles by projected Z for correct depth
      const projectedList: {
        screenX: number;
        screenY: number;
        depthScale: number;
        color: string;
        alpha: number;
        size: number;
      }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Wave kinetic displacement
        const wave = Math.sin(time * 2 + p.phase) * 12;
        const curX = p.originX + wave * 0.5;
        const curY = p.originY + Math.cos(time * 1.5 + p.phase) * 8;
        const curZ = p.originZ + Math.sin(time * 3 + p.phase) * 10;

        // 3D Matrix Rotation (Y then X)
        const x1 = curX * cosY - curZ * sinY;
        const z1 = curZ * cosY + curX * sinY;

        const y2 = curY * cosX - z1 * sinX;
        const z2 = z1 * cosX + curY * sinX + 500; // translate forward in camera space

        if (z2 <= 50) continue; // behind camera

        const depthScale = fov / z2;
        let screenX = centerX + x1 * depthScale;
        let screenY = centerY + y2 * depthScale;

        // Mouse displacement & interaction
        const dx = screenX - mouse.x;
        const dy = screenY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (1 - dist / mouse.radius) * 45;
          screenX += (dx / dist) * force;
          screenY += (dy / dist) * force;
        }

        // Shockwave displacement
        if (shockwaveRadius > 0) {
          const sDist = Math.abs(dist - shockwaveRadius);
          if (sDist < 40) {
            const sForce = (1 - sDist / 40) * 35;
            screenX += (dx / (dist || 1)) * sForce;
            screenY += (dy / (dist || 1)) * sForce;
          }
        }

        projectedList.push({
          screenX,
          screenY,
          depthScale,
          color: p.color,
          alpha: Math.min(1, Math.max(0.1, p.alpha * (depthScale * 0.95))),
          size: Math.max(0.8, p.size * depthScale * 1.2)
        });
      }

      // Draw particle nodes
      for (let i = 0; i < projectedList.length; i++) {
        const item = projectedList[i];
        ctx.save();
        ctx.beginPath();
        ctx.arc(item.screenX, item.screenY, item.size, 0, Math.PI * 2);
        ctx.fillStyle = item.color;
        ctx.globalAlpha = item.alpha;
        ctx.fill();

        // Glow for larger cadmium/amber nodes
        if (item.color === '#ff3b00' && item.size > 2.2) {
          ctx.shadowColor = '#ff3b00';
          ctx.shadowBlur = 10;
          ctx.fill();
        }
        ctx.restore();
      }

      // Draw subtle connecting architectural lines between close nodes
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projectedList.length; i += 4) {
        for (let j = i + 1; j < Math.min(i + 8, projectedList.length); j++) {
          const p1 = projectedList[i];
          const p2 = projectedList[j];
          const dx = p1.screenX - p2.screenX;
          const dy = p1.screenY - p2.screenY;
          const dist = dx * dx + dy * dy;

          if (dist < 2800) {
            const lineAlpha = (1 - dist / 2800) * 0.18;
            ctx.strokeStyle = p1.color === '#ff3b00' ? 'rgba(255, 59, 0, ' + lineAlpha + ')' : 'rgba(229, 201, 146, ' + lineAlpha + ')';
            ctx.beginPath();
            ctx.moveTo(p1.screenX, p1.screenY);
            ctx.lineTo(p2.screenX, p2.screenY);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'auto', zIndex: 0 }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 30%, rgba(7, 8, 10, 0.85) 90%)',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};
