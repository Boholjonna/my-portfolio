// Stray JSX removed. All JSX is now inside the Experience component.
import '../styles/Experience.css';
import '../styles/Project.css';
import { useEffect, useRef, useState, useMemo } from 'react';

// Reusable ExperienceCard component
const ExperienceCard = ({ image, alt, title, expanded, onToggle, children }) => (
  <div className={`experience-card${expanded ? ' expanded' : ''}`} style={{ position: 'relative', zIndex: 1 }}>
    <div className="experience-content">
      <div className="experience-row">
        <span className="experience-image-container">
          <img 
            src={image} 
            alt={alt} 
            className="experience-icon"
          />
        </span>
        <div className="exp-description-ctnr">
          <h2 className="experience-title-text">English Teacher</h2>
          <p className="experience-details">Native Camp | Aug 2022 – Present</p>
          <div className="experience-skills">
            <span className="experience-skill-tag">communication</span>
            <span className="experience-skill-tag">interpersonal</span>
            <span className="experience-skill-tag">instructional</span>
          </div>
        </div>
        <div className="experience-btn-wrapper">
          <button className="experience-dropdown-btn" onClick={onToggle}>
            <span>show information</span>
            <img 
              src="images/dropdown.png" 
              alt="Dropdown" 
              className="experience-btn-icon"
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
            />
          </button>
        </div>
      </div>
      {expanded && (
        <div className="experience-dropdown-column">
          {children}
        </div>
      )}
    </div>
  </div>
);

const DROPDOWN_TEXT = (
  <div className="experience-dropdown-content">
    <div className="exp-company">
      <h3>About the Company</h3>
      <ul>
        <li>Innovative online platform for English language learning.</li>
        <li>Provides high-quality, accessible, and engaging education.</li>
        <li>Empowers students to achieve personal and professional language goals.</li>
      </ul>
    </div>
    <div className="exp-responsibilities">
      <h3>My Responsibilities</h3>
      <ul>
        <li>Conduct live, one-on-one English lessons.</li>
        <li>Use a variety of textbooks and learning materials provided by Native Camp.</li>
        <li>Engage in free conversation with students to entertain, build rapport, and encourage confident speaking.</li>
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
      <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center', marginBottom:'1.5em'}}>
        <h1 className={`project-title ${isVisible ? 'animate' : ''} experience-title-padding`} style={{width:'80%',maxWidth:'200px',margin:'0 auto',textAlign:'center',position:'relative',zIndex:1}}>Experience</h1>
      </div>
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
