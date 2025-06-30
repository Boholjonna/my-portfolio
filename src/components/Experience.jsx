import '../styles/Experience.css';
import '../styles/Project.css';
import { useEffect, useRef, useState } from 'react';

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

  return (
    <div className="experience-container" ref={containerRef}>
      <h1 className={`project-title ${isVisible ? 'animate' : ''} experience-title-padding`}>Experience</h1>
      <div className={`experience-card${expanded ? ' expanded' : ''}`}> 
        <div className="experience-row">
          <img 
            src="images/experience.png" 
            alt="Experience Icon" 
            className="experience-icon"
          />
          <span className="experience-title-text">
            English Teacher at Native Camp
          </span>
          <button className="experience-dropdown-btn" onClick={() => setExpanded(e => !e)}>
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
            {DROPDOWN_TEXT}
          </div>
        )}
      </div>
    </div>
  );
}

export default Experience;
