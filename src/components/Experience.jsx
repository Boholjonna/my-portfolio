// Stray JSX removed. All JSX is now inside the Experience component.
import '../styles/Experience.css';
import '../styles/Project.css';
import { useEffect, useRef, useState, useMemo } from 'react';
import { supabase } from '../supabaseClient';

// Reusable ExperienceCard component
const ExperienceCard = ({ experience, expanded, onToggle }) => {
  // Helper function to split skills by spaces
  const parseSkills = (skillsString) => {
    if (!skillsString) return [];
    return skillsString.split(' ').filter(skill => skill.trim() !== '');
  };

  // Helper function to split paragraphs into sentences by dots
  const parseParagraphToList = (paragraph) => {
    if (!paragraph) return [];
    return paragraph.split('.').filter(sentence => sentence.trim() !== '').map(sentence => sentence.trim());
  };

  const skills = parseSkills(experience.skills);
  const aboutList = parseParagraphToList(experience.about);
  const responsibilitiesList = parseParagraphToList(experience.responsibilities);

  return (
    <div className={`experience-card${expanded ? ' expanded' : ''}`} style={{ position: 'relative', zIndex: 1 }}>
      <div className="experience-content">
        <div className="experience-row">
          <span className="experience-image-container">
            <img 
              src="images/experience.png" 
              alt="Experience Icon" 
              className="experience-icon"
            />
          </span>
          <div className="exp-description-ctnr">
            <h2 className="experience-title-text">{experience.role}</h2>
            <p className="experience-details">{experience.companyduration}</p>
            <div className="experience-skills">
              {skills.map((skill, index) => (
                <span key={index} className="experience-skill-tag">{skill}</span>
              ))}
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
            <div className="experience-dropdown-content">
              <div className="exp-company">
                <h3>About the Company</h3>
                <ul>
                  {aboutList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="exp-responsibilities">
                <h3>My Responsibilities</h3>
                <ul>
                  {responsibilitiesList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});
  const [experienceData, setExperienceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const [containerH, setContainerH] = useState(0);

  // Fetch experience data from Supabase database (same pattern as Projects)
  useEffect(() => {
    async function fetchExperience() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('Experience')
        .select('role, companyduration, skills, about, responsibilities');
      
      if (error) {
        setError(error.message || 'Error fetching experience data');
        setExperienceData([]);
      } else {
        setExperienceData(data || []);
      }
      setLoading(false);
    }
    fetchExperience();
  }, []);

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
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
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

  // Handle card expansion
  const handleCardToggle = (cardId) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  // Scroll to card when expanded
  useEffect(() => {
    const expandedCardIds = Object.keys(expandedCards).filter(id => expandedCards[id]);
    if (expandedCardIds.length > 0) {
      const lastExpandedId = expandedCardIds[expandedCardIds.length - 1];
      const cardElement = document.querySelector(`[data-card-id="${lastExpandedId}"]`);
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [expandedCards]);

  return (
    <section className="experience-container" ref={containerRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center', marginBottom:'1.5em'}}>
        <h1 className={`project-title ${isVisible ? 'animate' : ''} experience-title-padding`} style={{width:'80%',maxWidth:'200px',margin:'0 auto',textAlign:'center',position:'relative',zIndex:1}}>Experience</h1>
      </div>
      
      {loading && (
        <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>
          Loading experiences...
        </div>
      )}
      
      {error && (
        <div style={{ color: '#ff4d4f', textAlign: 'center', padding: '2rem' }}>
          Error: {error}
        </div>
      )}
      
      {!loading && !error && (
        <>
          {experienceData.length === 0 ? (
            <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>
              No experience data found.
            </div>
          ) : (
            experienceData.map((experience, index) => (
              <div key={index} data-card-id={index} style={{ marginBottom: '2rem' }}>
                <ExperienceCard
                  experience={experience}
                  expanded={expandedCards[index] || false}
                  onToggle={() => handleCardToggle(index)}
                />
              </div>
            ))
          )}
        </>
      )}
    </section>
  );
}

export default Experience;