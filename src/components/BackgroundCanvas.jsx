import React, { useRef, useEffect } from 'react';

const BackgroundCanvas = () => {
  const canvasRef = useRef(null);
  const mouse = { x: null, y: null, radius: 150 };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const particles = [];
    const particleCount = 180;

    class Particle {
      constructor() {
        this.reset(true);
        this.baseSize = Math.random() * 2.5 + 1.5;
        this.alphaVariation = Math.random() * 0.4 + 0.1;
      }

      reset(initial) {
        if (!initial && Math.random() > 0.3) {
          this.x = Math.random() > 0.5 ? -30 : canvas.width + 30;
          this.y = Math.random() * canvas.height;
        } else if (!initial) {
          this.y = Math.random() > 0.5 ? -30 : canvas.height + 30;
          this.x = Math.random() * canvas.width;
        } else {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.size = this.baseSize * (Math.random() * 0.8 + 0.6);
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = mouse.radius * (this.size / 3);
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 1.2;
          this.y -= Math.sin(angle) * force * 1.2;
        }
        this.x += this.speedX * (0.6 + Math.random() * 0.4);
        this.y += this.speedY * (0.6 + Math.random() * 0.4);
        if (
          this.x > canvas.width + 40 || this.x < -40 ||
          this.y > canvas.height + 40 || this.y < -40
        ) {
          if (Math.random() > 0.2) this.reset(false);
        }
      }

      draw() {
        ctx.fillStyle = `rgba(210, 210, 210, ${this.alphaVariation * (this.size / 3)})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Resize function
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Mouse move event
    const handleMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Math.random() > 0.90 && particles.length < 250) {
        particles.push(new Particle());
      }
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (Math.random() > 0.995 && particles.length > particleCount) {
          particles.splice(index, 1);
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
    />
  );
};

export default BackgroundCanvas;