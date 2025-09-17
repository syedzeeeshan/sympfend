// src/components/ParticlesBackground.jsx - Enhanced Version
import React, { useRef, useEffect } from 'react';

const ParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const numParticles = 120;
    const mouse = { x: null, y: null };
    const config = {
      mouseRadius: 150,
      connectionDistance: 100,
      particleOpacity: 0.6,
      lineOpacity: 0.3,
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 20 + 1;
        this.vx = 0;
        this.vy = 0;
        this.opacity = config.particleOpacity;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#ffd700';
        ctx.shadowColor = '#ffaa00';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      update() {
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.mouseRadius) {
            const force = (config.mouseRadius - distance) / config.mouseRadius;
            const forceX = (dx / distance) * force * this.density * 0.08;
            const forceY = (dy / distance) * force * this.density * 0.08;
            
            this.vx -= forceX;
            this.vy -= forceY;
            this.opacity = Math.min(1, config.particleOpacity + force * 0.4);
          } else {
            this.opacity = config.particleOpacity;
          }
        }

        // Return to base position
        const dx = this.x - this.baseX;
        const dy = this.y - this.baseY;
        this.x -= dx * 0.03;
        this.y -= dy * 0.03;

        // Apply velocity
        this.x += this.vx;
        this.y += this.vy;

        // Friction
        this.vx *= 0.96;
        this.vy *= 0.96;
      }
    }

    // Draw connections between particles
    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.connectionDistance) {
            const opacity = (1 - distance / config.connectionDistance) * config.lineOpacity;
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = '#ffaa00';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    }

    // Initialize particles
    function init() {
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    }

    // Animation loop
    function animate() {
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      drawConnections();

      requestAnimationFrame(animate);
    }

    // Event handlers
    function handleMouseMove(event) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    }

    function handleMouseLeave() {
      mouse.x = null;
      mouse.y = null;
    }

    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    // Initialize and start
    init();
    animate();

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: '#0a0a0a',
        pointerEvents: 'auto',
      }}
    />
  );
};

export default ParticlesBackground;
