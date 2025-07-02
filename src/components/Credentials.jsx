import React, { useEffect, useRef, useState } from 'react';
import GradientText from './GradientText';
import '../styles/Project.css';
import '../styles/Experience.css';
import '../styles/Credentials.css';

// Reusable CredentialsCard component
const CredentialsCard = ({ children }) => (
  <div className="credentials-card">
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
      <CredentialsCard>
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