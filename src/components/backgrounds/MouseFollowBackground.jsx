import { useEffect, useRef } from 'react';

const MouseFollowBackground = ({ type = 'gradient', colors = ['#6366f1', '#ec4899', '#8b5cf6'] }) => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();

        const handleMouseMove = (e) => {
            mouseRef.current = {
                x: e.clientX,
                y: e.clientY
            };
        };

        const particles = [];
        const particleCount = 50;

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: Math.random() * 3 + 1,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (type === 'gradient') {
                // Radial gradient following mouse
                const gradient = ctx.createRadialGradient(
                    mouseRef.current.x, mouseRef.current.y, 0,
                    mouseRef.current.x, mouseRef.current.y, 500
                );
                colors.forEach((color, i) => {
                    gradient.addColorStop(i / (colors.length - 1), color + '33');
                });
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

            } else if (type === 'particles') {
                // Particles attracted to mouse
                particles.forEach(particle => {
                    // Move towards mouse
                    const dx = mouseRef.current.x - particle.x;
                    const dy = mouseRef.current.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 200) {
                        particle.vx += dx / distance * 0.1;
                        particle.vy += dy / distance * 0.1;
                    }

                    // Apply velocity
                    particle.x += particle.vx;
                    particle.y += particle.vy;

                    // Damping
                    particle.vx *= 0.95;
                    particle.vy *= 0.95;

                    // Wrap around
                    if (particle.x < 0) particle.x = canvas.width;
                    if (particle.x > canvas.width) particle.x = 0;
                    if (particle.y < 0) particle.y = canvas.height;
                    if (particle.y > canvas.height) particle.y = 0;

                    // Draw particle
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                    ctx.fillStyle = particle.color;
                    ctx.fill();

                    // Draw connection lines to nearby particles
                    particles.forEach(other => {
                        const dist = Math.sqrt(
                            (particle.x - other.x) ** 2 + (particle.y - other.y) ** 2
                        );
                        if (dist < 100) {
                            ctx.beginPath();
                            ctx.moveTo(particle.x, particle.y);
                            ctx.lineTo(other.x, other.y);
                            ctx.strokeStyle = particle.color + Math.floor((1 - dist / 100) * 50).toString(16).padStart(2, '0');
                            ctx.lineWidth = 1;
                            ctx.stroke();
                        }
                    });
                });

            } else if (type === 'wave') {
                // Wave effect following mouse
                const time = Date.now() * 0.001;
                for (let x = 0; x < canvas.width; x += 10) {
                    const distX = Math.abs(x - mouseRef.current.x);
                    const amplitude = Math.max(0, 100 - distX / 5);
                    const y = mouseRef.current.y + Math.sin(x * 0.02 + time * 2) * amplitude;

                    ctx.beginPath();
                    ctx.arc(x, y, 3, 0, Math.PI * 2);
                    const colorIndex = Math.floor((x / canvas.width) * colors.length);
                    ctx.fillStyle = colors[colorIndex] + '88';
                    ctx.fill();
                }

            } else if (type === 'spotlight') {
                // Spotlight effect
                ctx.fillStyle = '#000';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                const gradient = ctx.createRadialGradient(
                    mouseRef.current.x, mouseRef.current.y, 0,
                    mouseRef.current.x, mouseRef.current.y, 300
                );
                gradient.addColorStop(0, colors[0] + 'ff');
                gradient.addColorStop(0.5, colors[1] + '88');
                gradient.addColorStop(1, 'transparent');

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', setCanvasSize);
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', setCanvasSize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [type, colors]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.6 }}
        />
    );
};

export default MouseFollowBackground;
