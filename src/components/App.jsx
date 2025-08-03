import '../styles/App.css'
import '../styles/Text.css'
import About from './About'
import Skills from './Skills'
import Project from './Project'
import Experience from './Experience'
import Credentials from './Credentials';
import Contact from './Contact';
import { useEffect, useRef, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://YOUR_PROJECT_ID.supabase.co'; // Replace with your Project URL
const supabaseAnonKey = 'YOUR_ANON_PUBLIC_KEY'; // Replace with your Anon Public Key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const imageUrl = 'images/msJ.png'
  const profileUrl = 'images/nightme.png'

  const experienceRef = useRef(null);
  const [experienceVisible, setExperienceVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setExperienceVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    if (experienceRef.current) {
      observer.observe(experienceRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="App">
      <div className="main-container">
        <div className="about-section" id="about">
          <About 
            logo={imageUrl}
            image={profileUrl}
            title="a Software Engineer skilled on"
            message="I'm an enthusiastic and curious software and web developer with a passion for creating visually appealing, user-friendly websites and applications. I thrive on continuous learning and enjoy transforming ideas into impactful digital experiences. With strong time management and adaptability, I consistently deliver high-quality work on time. I'm driven by innovation and always eager to explore new trends, tools, and technologies to grow and refine my craft."
          />
        </div>
        <div className="skills-section-wrapper">
          <Skills />
        </div>
        <div className="project-section" id="projects">
          <Project />
        </div>
        <div 
          className={`experience-section${experienceVisible ? ' show' : ''}`}
          ref={experienceRef}
          id="experience"
          style={{
            opacity: experienceVisible ? 1 : 0,
            transform: experienceVisible ? 'translateY(0)' : 'translateY(60px)',
            transition: 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)'
          }}
        >
          <Experience />
        </div>
        <div className="credentials-section" id="credentials">
          <Credentials />
        </div>
        <div className="contact-section-wrapper">
          <Contact />
        </div>
        <footer className="about-footer">
          <button
            className="footer-btn"
            style={{
              background: 'linear-gradient(90deg, #6a5af9, #f857a6)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
            onClick={() => window.open('auth.html', '_blank')}
          >
            © ms J 2025
          </button>
        </footer>
      </div>
    </div>
  );
}

export default App;
