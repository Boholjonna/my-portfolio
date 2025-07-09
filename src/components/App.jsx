import '../styles/App.css'
import '../styles/Text.css'
import About from './About'
import Project from './Project'
import Experience from './Experience'
import Credentials from './Credentials';
import Contact from './Contact';
import { useEffect, useRef, useState } from 'react';

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
            intro={
              <div>
                <span className="intro-text">Hi I am Jonna Bohol, call me Ms J</span>
              </div>
            }
            logo={imageUrl}
            image={profileUrl}
            title="a Computer Engineer"
            message="I'm an enthusiastic and curious software and web developer with a passion for creating visually appealing, user-friendly websites and applications. I thrive on continuous learning and enjoy transforming ideas into impactful digital experiences. With strong time management and adaptability, I consistently deliver high-quality work on time. I'm driven by innovation and always eager to explore new trends, tools, and technologies to grow and refine my craft."
          />
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
          © ms J 2025
        </footer>
      </div>
    </div>
  );
}

export default App;
