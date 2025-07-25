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
  // const canvasRef = useRef(null); // Removed for star background removal
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

  // Galaxy/stars animation removed as requested

  // Scroll to card when expanded
  useEffect(() => {
    if (expanded && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [expanded]);

  return (
    <section className="experience-container" ref={containerRef} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Star background (canvas) removed as requested */}
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
      {/* Mars planet image removed as requested */}
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
