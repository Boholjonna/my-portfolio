import '../styles/Experience.css';
import '../styles/Project.css';
import { useEffect, useRef, useState, useMemo } from 'react';

// Reusable ExperienceCard component
const ExperienceCard = ({ image, alt, title, expanded, onToggle, children }) => (
  <div className={`experience-card${expanded ? ' expanded' : ''}`} style={{ position: 'relative', zIndex: 1 }}>
    <div className="experience-row">
      <img 
        src={image} 
        alt={alt} 
        className="experience-icon"
      />
      <span className="experience-title-text">
        {title}
      </span>
      <button className="experience-dropdown-btn" onClick={onToggle}>
        <img 
          src="images/dropdown.png" 
          alt="Dropdown" 
          className="experience-dropdown-icon"
          style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
        />
      </button>
    </div>
    {expanded && (
      <div className="experience-dropdown-row">
        {children}
      </div>
    )}
  </div>
);

const DROPDOWN_TEXT = (
  <div className="experience-dropdown-content">
    <div style={{ textAlign: 'left', marginTop: '1.2rem' }}>
      <div>About Native Camp:</div>
      <ul style={{ marginTop: 0, marginBottom: '1rem', paddingLeft: '1.2em' }}>
        <li>Innovative online platform for English language learning.</li>
        <li>Provides high-quality, accessible, and engaging education.</li>
        <li>Empowers students to achieve personal and professional language goals.</li>
      </ul>
      <div>Responsibilities as a Teacher:</div>
      <ul style={{ marginTop: 0, paddingLeft: '1.2em' }}>
        <li>Conduct live, one-on-one English lessons.</li>
        <li>Use a variety of textbooks and learning materials provided by Native Camp.</li>
        <li>Engage in free conversation with students to entertain, build rapport, and encourage them to speak confidently.</li>
        <li>Provide constructive feedback and corrections to enhance students' language skills.</li>
        <li>Tailor lessons to suit individual learning styles and proficiency levels.</li>
        <li>Motivate students to practice regularly and provide supplementary resources for continued learning.</li>
      </ul>
    </div>
  </div>
);

function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const cardRef = useRef(null);
  const [containerH, setContainerH] = useState(0);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (containerRef.current) setContainerH(containerRef.current.offsetHeight);
  }, []);

  const planetPositions = useMemo(() => {
    function randomY() {
      // 0-38% or 62-100%
      const band = Math.random() < 0.5 ? [0, 0.38] : [0.62, 1];
      return `${(Math.random() * (band[1] - band[0]) + band[0]) * 100}%`;
    }
    function randomX() {
      return `${Math.random() * 80 + 5}%`;
    }
    return {
      saturn: { top: randomY(), left: randomX() },
      mars: { top: randomY(), left: randomX() }
    };
  }, [containerH]);

  // Galaxy/stars animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = containerRef.current.offsetWidth;
    let height = canvas.height = containerRef.current.offsetHeight;
    let animationFrameId;
    const numStars = 120;
    const stars = Array.from({ length: numStars }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.3,
      baseAlpha: Math.random() * 0.08 + 0.04, // Much lower opacity
      alpha: 1,
      speed: Math.random() * 0.2 + 0.05,
      angle: Math.random() * Math.PI * 2,
      shinePhase: Math.random() * Math.PI * 2, // For shining effect
      isShining: Math.random() < 0.15 // 15% of stars shine
    }));
    let mouseX = width / 2;
    let mouseY = height / 2;

    // Shooting star state
    let shootingStar = null;
    let shootingTimer = 0;
    const shootingInterval = 3500; // ms

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
      // Draw stars
      for (const star of stars) {
        // Parallax effect
        const dx = (star.x - mouseX) * 0.01;
        const dy = (star.y - mouseY) * 0.01;
        ctx.save();
        // Shining (pulsing) effect
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
      // Draw shooting star
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
        // Move shooting star
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
    // Shooting star loop
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

  // Scroll to card when expanded
  useEffect(() => {
    if (expanded && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [expanded]);

  return (
    <section className="experience-container" ref={containerRef} style={{ position: 'relative', overflow: 'hidden' }}>
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
      {/* <img
        src="images/saturn.png"
        alt="Saturn Planet"
        style={{
          position: 'absolute',
          top: planetPositions.saturn.top,
          left: planetPositions.saturn.left,
          width: '55px',
          opacity: 0.10,
          zIndex: 1,
          pointerEvents: 'none',
          filter: 'blur(0.5px)'
        }}
      /> */}
      <img
        src="images/mars.png"
        alt="Mars Planet"
        style={{
          position: 'absolute',
          top: '50%',
          right: '2%',
          transform: 'translateY(-50%)',
          width: '38px',
          opacity: 0.10,
          zIndex: 1,
          pointerEvents: 'none',
          filter: 'blur(0.5px)'
        }}
      />
      <h1 className={`project-title ${isVisible ? 'animate' : ''} experience-title-padding`} style={{ position: 'relative', zIndex: 1 }}>Experience</h1>
      <ExperienceCard
        image="images/experience.png"
        alt="Experience Icon"
        title="English Teacher at Native Camp"
        expanded={expanded}
        onToggle={() => setExpanded(e => !e)}
      >
        {DROPDOWN_TEXT}
      </ExperienceCard>
    </section>
  );
}

export default Experience;
