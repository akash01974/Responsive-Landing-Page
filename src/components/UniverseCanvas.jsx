import React, { useRef, useEffect } from 'react';

const UniverseCanvas = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    container.appendChild(canvas);

    // Initialize canvas size
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // Star configuration
    const starCount = 8000;
    const stars = new Float32Array(starCount * 3);
    const STAR_SIZE = 0.2;
    const ROTATION_SPEED = 0.0007;

    // Initialize star positions with Z-axis bias
    for (let i = 0; i < starCount * 3; i += 3) {
      stars[i] = (Math.random() - 0.5) * 1000;
      stars[i + 1] = (Math.random() - 0.5) * 1000;
      stars[i + 2] = (Math.random() * 1.5 - 1) * 1000; 
    }

    // Camera configuration
    const cameraZ = 500;
    let rotationX = 0;
    let rotationY = 0;
    const fov = 75 * Math.PI / 180;
    const near = 0.1;
    const far = 1000;

    const getProjectionScale = (aspect) => {
      return 1 / Math.tan(fov / 2);
    };

    // Animation loop
    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      rotationX -= ROTATION_SPEED;
      rotationY -= ROTATION_SPEED;

      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);

      const aspect = canvas.width / canvas.height;
      const projScale = getProjectionScale(aspect);

      ctx.fillStyle = '#555555';
      for (let i = 0; i < starCount * 3; i += 3) {
        const x = stars[i];
        const y = stars[i + 1];
        const z = stars[i + 2];

        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        const depth = z2 + cameraZ;
        if (depth < near || depth > far) continue;

        const scale = projScale * (cameraZ / depth);
        const x2d = (-x1 * scale / aspect) + canvas.width / 2;
        const y2d = -y1 * scale + canvas.height / 2;
        const size = Math.max(0.05, STAR_SIZE * (cameraZ / depth));

        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Resize handler
    const handleResize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      container.removeChild(canvas);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        background: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0
      }}
    />
  );
};

export default UniverseCanvas;