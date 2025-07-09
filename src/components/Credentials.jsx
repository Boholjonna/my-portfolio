import React, { useEffect, useRef, useState } from 'react';
import GradientText from './GradientText';
import '../styles/Project.css';
import '../styles/Experience.css';
import '../styles/Credentials.css';

// Reusable CredentialsCard component
const CredentialsCard = ({ children, degreeTitle, university, honor, isVisible }) => (
  <div className={`credentials-card${isVisible ? ' visible' : ''}`}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
      <img src="images/degree.png" alt="Degree" style={{ width: '90px', height: '90px'}} />
      <div style={{ marginTop: '0.7rem', textAlign: 'center', color: 'white' }}>
        <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{degreeTitle}</div>
        <div style={{ fontWeight: 'normal', fontSize: '12px' }}>{university}</div>
        <div style={{ fontWeight: 'normal', fontSize: '12px' }}>{honor}</div>
      </div>
    </div>
    {children}
  </div>
);

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
      className="credentials-container"
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
      <CredentialsCard
        degreeTitle="Bachelor of Science in Computer Engineering"
        university="Cebu Technological University"
        honor="Dean's Lister"
        isVisible={isVisible}
      >
        <div
          className="credentials-gradient-border"
          style={{
            maxWidth: '780px',
            minWidth: '360px',
            maxHeight: '110px',
            minHeight: '80px',
            margin: '0 auto',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Credentials content goes here */}
        </div>
      </CredentialsCard>
    </section>
  );
};

export default Credentials; 