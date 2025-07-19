import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import '../styles/Project.css';
import Test from './Test';

function Project({ projects = [] }) {
    const [isVisible, setIsVisible] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState([false, false]);
    const [showTest, setShowTest] = useState(false);
    const containerRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    // Reset animation when section leaves viewport
                    setIsVisible(false);
                }
            },
            {
                threshold: 0.3,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
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

    const handleViewDetails = (idx) => {
        setOverlayVisible((prev) => prev.map((v, i) => i === idx ? true : v));
    };
    const handleBack = (idx) => {
        setOverlayVisible((prev) => prev.map((v, i) => i === idx ? false : v));
    };

    return (
        <section className="project-container" ref={containerRef} style={{ position: 'relative', overflow: 'hidden' }}>
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
            <img
                src="images/saturn.png"
                alt="Saturn Planet"
                style={{
                    position: 'absolute',
                    top: '8%',
                    right: '5%',
                    width: '60px',
                    opacity: 0.10,
                    zIndex: 1,
                    pointerEvents: 'none',
                    filter: 'blur(0.5px)'
                }}
            />
            <img
                src="images/mars.png"
                alt="Mars Planet"
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '8%',
                    width: '32px',
                    opacity: 0.10,
                    zIndex: 1,
                    pointerEvents: 'none',
                    filter: 'blur(0.5px)'
                }}
            />
            {showTest && <Test onClose={() => setShowTest(false)} />}
            <h1 className={`project-title ${isVisible ? 'animate' : ''}`}>Projects</h1>
            <div className="project-grid">
                <div className={`project-card project-card-1 ${isVisible ? 'animate' : ''} ${overlayVisible[0] ? 'overlay-expanded no-border' : ''}`} style={{position:'relative'}}>
                    {overlayVisible[0] && (
                        <div className={"project-overlay show"}>
                            <div className="overlay-content">
                                <h2 className="overlay-gradient-text">Library Management System</h2>
                                <p className="overlay-description">
                                    This desktop application is an exclusive platform with User, Librarian, and Admin interfaces. Users can borrow and reserve books, manage profiles, and view their activity history. Overdue books restrict access until payment is made. Librarians manage inventory, returns, payments, and reservations. Admins oversee user and librarian accounts, track earnings, and generate analytics on book usage and library operations.
                                </p>
                                <h3 className="overlay-gradient-text">Tech Stack</h3>
                                <div className="tech-stack-circles-container">
                                    <div className={`tech-stack-circles tech-stack-circles-1`}>
                                        {["java.png","mysql.png","figma.png","github.png","git.png","vscode.png"].map((img, i) => (
                                            <div className="tech-item" key={img}>
                                                <div className="tech-circle tech-circle-1">
                                                    <img src={`/my-portfolio/images/${img}`} alt={img.split('.')[0]} width="36" height="36" loading="lazy" onLoad={e => e.target.classList.add('loaded')} />
                                                </div>
                                                <span className="tech-label">{img.split('.')[0].charAt(0).toUpperCase() + img.split('.')[0].slice(1)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <button className="overlay-back-btn" onClick={() => handleBack(0)}>
                                <img src="/my-portfolio/images/back.png" alt="Back" className="overlay-back-icon" width="32" height="32" loading="lazy" onLoad={e => e.target.classList.add('loaded')} />
                            </button>
                        </div>
                    )}
                    <div className="card-upper-div">
                        <img 
                            src="/my-portfolio/images/libit.png" 
                            alt="Libit Project" 
                            className="project-image"
                            width="120" height="120"
                            loading="lazy"
                            onLoad={e => e.target.classList.add('loaded')}
                            onError={(e) => {
                                console.error('Failed to load libit.png');
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                    <div className="card-lower-div" style={{visibility: overlayVisible[0] ? 'hidden' : 'visible'}}>
                        <button className="project-button left-button" onClick={() => setShowTest(true)}>
                            <img 
                                src="/my-portfolio/images/play.png" 
                                alt="Play" 
                                className="button-icon"
                                width="24" height="24"
                                loading="lazy"
                                onLoad={e => e.target.classList.add('loaded')}
                            />
                        </button>
                        <button className="project-button right-button view-details-btn" onClick={() => handleViewDetails(0)}>
                            View Details
                        </button>
                    </div>
                </div>
                <div className={`project-card project-card-2 ${isVisible ? 'animate' : ''} ${overlayVisible[1] ? 'overlay-expanded no-border' : ''}`} style={{position:'relative'}}>
                    {overlayVisible[1] && (
                        <div className={"project-overlay show project-overlay-2"}>
                            <div className="overlay-content">
                                <h2 className="overlay-gradient-text">Inventory Management System</h2>
                                <p className="overlay-description">
                                    This desktop application streamlines stock control and sales tracking for a medical company through a centralized platform for managing inventory. It allows users to add, edit, and delete products, manage stock levels, and track stock on hand and product off-take. Key features include activity logs, sales data visualization, and forecasting tools—enabling informed decisions and improved operational efficiency.
                                </p>
                                <h3 className="overlay-gradient-text">Tech Stack</h3>
                                <div className="tech-stack-circles-container">
                                    <div className={`tech-stack-circles tech-stack-circles-2`}>
                                        {["java.png","mysql.png","figma.png","github.png","git.png","intellij.png","scenebuilder.png"].map((img, i) => (
                                            <div className="tech-item" key={img}>
                                                <div className="tech-circle tech-circle-2">
                                                    <img src={`/my-portfolio/images/${img}`} alt={img.split('.')[0]} width="36" height="36" loading="lazy" onLoad={e => e.target.classList.add('loaded')} />
                                                </div>
                                                <span className="tech-label">{img.split('.')[0].charAt(0).toUpperCase() + img.split('.')[0].slice(1)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <button className="overlay-back-btn" onClick={() => handleBack(1)}>
                                <img src="/my-portfolio/images/back.png" alt="Back" className="overlay-back-icon" width="32" height="32" loading="lazy" onLoad={e => e.target.classList.add('loaded')} />
                            </button>
                        </div>
                    )}
                    <div className="card-upper-div">
                        <img 
                            src="/my-portfolio/images/intervein.png" 
                            alt="Intervein Project" 
                            className="project-image"
                            width="120" height="120"
                            loading="lazy"
                            onLoad={e => e.target.classList.add('loaded')}
                            onError={(e) => {
                                console.error('Failed to load intervein.png');
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                    <div className="card-lower-div" style={{visibility: overlayVisible[1] ? 'hidden' : 'visible'}}>
                        <button className="project-button left-button">
                            <img 
                                src="/my-portfolio/images/play.png" 
                                alt="Play" 
                                className="button-icon"
                                width="24" height="24"
                                loading="lazy"
                                onLoad={e => e.target.classList.add('loaded')}
                            />
                        </button>
                        <button className="project-button right-button view-details-btn" onClick={() => handleViewDetails(1)}>
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

Project.propTypes = {
    projects: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            link: PropTypes.string,
            technologies: PropTypes.arrayOf(PropTypes.string)
        })
    )
};

export default Project; 