import PropTypes from 'prop-types';
import '../styles/About.css';
import '../styles/Circles.css';
import GradientDecryptText from './GradientDecryptText';
import BlurText from './BlurText';
import { useEffect, useState, useRef } from 'react';

function About({ logo, image, intro, title, message }) {
    const [key, setKey] = useState(0);
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        // Reset the key when component mounts or route changes
        setKey(prev => prev + 1);
    }, []);

    // Galaxy/stars animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !containerRef.current) return;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = containerRef.current.offsetWidth;
        let height = canvas.height = containerRef.current.offsetHeight;
        let animationFrameId;
        const numStars = 120;
        const stars = Array.from({ length: numStars }, (_, i) => ({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.2 + 0.3,
            baseAlpha: Math.random() * 0.3 + 0.08,
            alpha: 1,
            speed: Math.random() * 0.2 + 0.05,
            angle: Math.random() * Math.PI * 2,
            shinePhase: Math.random() * Math.PI * 2,
            isShining: Math.random() < 0.15
        }));
        let mouseX = width / 2;
        let mouseY = height / 2;
        let shootingStar = null;
        const shootingInterval = 3500;
        function spawnShootingStar() {
            const startY = Math.random() * height * 0.7 + height * 0.1;
            shootingStar = {
                x: Math.random() * width * 0.7,
                y: startY,
                vx: Math.random() * 4 + 6,
                vy: Math.random() * 1.5 - 0.75,
                len: Math.random() * 60 + 80,
                alpha: 0.7,
                progress: 0
            };
        }
        function draw() {
            ctx.clearRect(0, 0, width, height);
            for (const star of stars) {
                const dx = (star.x - mouseX) * 0.01;
                const dy = (star.y - mouseY) * 0.01;
                ctx.save();
                let shineAlpha = star.baseAlpha;
                if (star.isShining) {
                    shineAlpha = star.baseAlpha + 0.12 * Math.abs(Math.sin(Date.now() / 800 + star.shinePhase));
                }
                // Determine if star is in the gradient band (38%-62% of height)
                let yPos = star.y - dy;
                let bandStart = height * 0.38;
                let bandEnd = height * 0.62;
                let bandAlpha = (yPos >= bandStart && yPos <= bandEnd) ? 0.3 : 1;
                ctx.globalAlpha = shineAlpha * bandAlpha;
                ctx.beginPath();
                ctx.arc(star.x - dx, star.y - dy, star.r, 0, Math.PI * 2);
                ctx.fillStyle = '#fff';
                ctx.shadowColor = '#fff';
                ctx.shadowBlur = 6;
                ctx.fill();
                ctx.restore();
            }
            if (shootingStar) {
                ctx.save();
                ctx.globalAlpha = shootingStar.alpha;
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 2;
                ctx.shadowColor = '#fff';
                ctx.shadowBlur = 12;
                ctx.beginPath();
                ctx.moveTo(shootingStar.x, shootingStar.y);
                ctx.lineTo(
                    shootingStar.x - shootingStar.vx * shootingStar.len / 12,
                    shootingStar.y - shootingStar.vy * shootingStar.len / 12
                );
                ctx.stroke();
                ctx.restore();
                shootingStar.x += shootingStar.vx;
                shootingStar.y += shootingStar.vy;
                shootingStar.alpha -= 0.012;
                shootingStar.progress += 1;
                if (
                    shootingStar.x > width + 100 ||
                    shootingStar.y < -100 ||
                    shootingStar.y > height + 100 ||
                    shootingStar.alpha <= 0
                ) {
                    shootingStar = null;
                }
            }
            animationFrameId = requestAnimationFrame(draw);
        }
        function handleResize() {
            width = canvas.width = containerRef.current.offsetWidth;
            height = canvas.height = containerRef.current.offsetHeight;
        }
        function handleMouseMove(e) {
            const rect = containerRef.current.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        }
        window.addEventListener('resize', handleResize);
        containerRef.current.addEventListener('mousemove', handleMouseMove);
        draw();
        let shootingLoop = setInterval(() => {
            if (!shootingStar) spawnShootingStar();
        }, shootingInterval);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (containerRef.current) containerRef.current.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            clearInterval(shootingLoop);
        };
    }, []);

    const handleImageLoad = (type) => () => {
        console.log(`${type} loaded successfully`);
    };

    const handleImageError = (type) => (e) => {
        console.error(`${type} failed to load:`, e.target.src);
        // Try to reload with a different path
        const imgPath = e.target.src.split('/').pop();
        e.target.src = `./images/${imgPath}`;
    };

    return (
        <div className="about-container" ref={containerRef} style={{ position: 'relative', overflow: 'hidden' }}>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    pointerEvents: 'none',
                    transition: 'opacity 0.5s'
                }}
            />
            <header className="about-header">
                <img 
                    src={logo} 
                    alt="Logo" 
                    className="logo" 
                    loading="eager"
                    onLoad={handleImageLoad('Logo')}
                    onError={handleImageError('Logo')}
                />
                <div className="circles-container">
                    <div className="circle circle-1"></div>
                    <div className="circle circle-2"></div>
                    <div className="circle circle-3"></div>
                </div>
            </header>
            <div className="about-content">
                <h2 className="intro">{intro}</h2>
                <div className="about-image">
                    <img 
                        src={image} 
                        alt="Profile" 
                        loading="eager"
                        onLoad={handleImageLoad('Profile')}
                        onError={handleImageError('Profile')}
                    />
                </div>
                <div className="about-text">
                    <h1 className="title">
                        <GradientDecryptText 
                            text={title}
                            speed={1}
                            maxIterations={3}
                        />
                    </h1>
                    <BlurText 
                        text={message}
                        className="message"
                        delay={100}
                        direction="top"
                        stepDuration={0.4}
                        style={{ textAlign: 'center', justifyContent: 'center' }}
                    />
                </div>
            </div>
        </div>
    );
}

About.propTypes = {
    logo: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    intro: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]).isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};

export default About;