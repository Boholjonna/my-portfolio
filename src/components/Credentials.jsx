import React, { useEffect, useRef, useState } from 'react';
import GradientText from './GradientText';
import '../styles/Project.css';
import '../styles/Experience.css';

const Credentials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="project-container"
      ref={containerRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: 'auto',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        paddingBottom: '2rem',
        paddingTop: 0,
      }}
    >
      <h1 className={`project-title ${isVisible ? 'animate' : ''}`} style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginTop: '5rem', marginBottom: '2rem' }}>Credentials</h1>
      {/* Add your credentials content here */}
    </section>
  );
};

export default Credentials; 