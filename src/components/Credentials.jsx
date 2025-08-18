import React, { useEffect, useRef, useState } from 'react';
import GradientText from './GradientText';
import '../styles/Project.css';
import '../styles/Experience.css';
import '../styles/Credentials.css';
import { supabase } from '../supabaseClient';

// Reusable CredentialsCard component
const CredentialsCard = ({ credential, isVisible }) => {
  // Helper function to get image based on type
  const getImageByType = (type) => {
    switch (type?.toLowerCase()) {
      case 'degree':
        return 'images/degree.png';
      case 'course':
        return 'images/course.png';
      case 'certification':
        return 'images/cert.png';
      default:
        return 'images/degree.png'; // fallback
    }
  };

  // Helper function to split description by periods
  const parseDescription = (description) => {
    if (!description) return [];
    return description.split('.').filter(sentence => sentence.trim() !== '').map(sentence => sentence.trim());
  };

  const descriptionLines = parseDescription(credential.description);

  return (
    <div className={`credentials-card${isVisible ? ' visible' : ''}`}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
        <img 
          src={getImageByType(credential.type)} 
          alt={credential.type || 'Credential'} 
          style={{ width: '90px', height: '90px'}} 
        />
        <div style={{ marginTop: '0.7rem', textAlign: 'center', color: 'white' }}>
          {descriptionLines.map((line, index) => (
            <div 
              key={index} 
              style={{ 
                fontWeight: index === 0 ? 'bold' : 'normal', 
                fontSize: '12px',
                marginBottom: '0.1rem'
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Credentials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [credentialsData, setCredentialsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  // Fetch credentials data from Supabase database
  useEffect(() => {
    async function fetchCredentials() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('Credentials')
        .select('type, description');
      
      if (error) {
        setError(error.message || 'Error fetching credentials data');
        setCredentialsData([]);
      } else {
        setCredentialsData(data || []);
      }
      setLoading(false);
    }
    fetchCredentials();
  }, []);

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
        paddingBottom: '1rem',
        paddingTop: 0,
      }}
    >
      <h1 className={`project-title ${isVisible ? 'animate' : ''}`} style={{ marginBottom: '4rem' }}>Credentials</h1>
      
      <div>
        {loading && (
          <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>
            Loading credentials...
          </div>
        )}
        
        {error && (
          <div style={{ color: '#ff4d4f', textAlign: 'center', padding: '2rem' }}>
            Error: {error}
          </div>
        )}
        
        {!loading && !error && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
            {credentialsData.length === 0 ? (
              <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>
                No credentials data found.
              </div>
            ) : (
              credentialsData.map((credential, index) => (
                <CredentialsCard
                  key={index}
                  credential={credential}
                  isVisible={isVisible}
                />
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Credentials;