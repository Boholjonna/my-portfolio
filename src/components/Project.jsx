import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import '../styles/Project.css';
import { supabase } from '../supabaseClient';
// ...existing code...

function Project({ projects = [] }) {
    const [isVisible, setIsVisible] = useState(false);
    const [projectData, setProjectData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [overlayData, setOverlayData] = useState({});
    const [activeOverlay, setActiveOverlay] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            {
                threshold: 0.3,
                rootMargin: '0px 0px -100px 0px'
            }
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
        async function fetchProjects() {
            setLoading(true);
            setError(null);
            const { data, error } = await supabase.from('Projects').select('image-url,type,title,stack,responsibilities,video-url');
            if (error) {
                setError(error.message || 'Error fetching projects');
                setProjectData([]);
            } else {
                setProjectData(data || []);
            }
            setLoading(false);
        }
        fetchProjects();
    }, []);

    // Helper functions for parsing data
    const parseStack = (stackString) => {
        if (!stackString) return [];
        return stackString.split('.').filter(item => item.trim() !== '').map(item => item.trim());
    };

    const parseResponsibilities = (responsibilitiesString) => {
        if (!responsibilitiesString) return [];
        return responsibilitiesString.split('.').filter(sentence => sentence.trim() !== '').map(sentence => sentence.trim());
    };

    const handleViewDetails = (projectIndex) => {
        setActiveOverlay(activeOverlay === projectIndex ? null : projectIndex);
    };


    return (
        <section className="project-container" ref={containerRef}>
            <h1 className={`project-title ${isVisible ? 'animate' : ''}`}>Projects</h1>
            {loading && <div style={{color:'#fff', margin:'2em'}}>Loading projects...</div>}
            {error && <div style={{color:'#ff4d4f', margin:'2em'}}>Error: {error}</div>}
            {!loading && !error && (
                <div className="project-cards-grid">
                    {projectData.length === 0 ? (
                        <div style={{color:'#fff', margin:'2em'}}>No projects found.</div>
                    ) : (
                        projectData.map((project, idx) => (
                            <div className="custom-project-card" key={idx} style={{position: 'relative'}}>
                                <div className="card-header">
                                    <span 
                                        style={{
                                            fontSize: '0.8rem', 
                                            color: '#8A2BE2', 
                                            marginRight: '0.5rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            textShadow: '0 0 0px #8A2BE2'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.color = '#B347D9';
                                            e.target.style.textShadow = '0 0 8px #8A2BE2, 0 0 16px #8A2BE2';
                                            e.target.style.transform = 'scale(1.1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.color = '#8A2BE2';
                                            e.target.style.textShadow = '0 0 0px #8A2BE2';
                                            e.target.style.transform = 'scale(1)';
                                        }}
                                    >&lt;/&gt;</span>
                                    <span className="card-type" style={{fontSize:'0.85em', padding:'0.2em 0.8em'}}>{project.type}</span>
                                </div>
                                <div className="card-image-wrapper" style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'80px'}}>
                                    <div style={{background:'transparent',borderRadius:'50%',width:'290px',height:'290px',maxWidth:'290px',maxHeight:'290px',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
                                        <img src={project["image-url"]} alt={project.type} style={{width:'85%',height:'85%',maxWidth:'246px',maxHeight:'246px',objectFit:'contain'}} />
                                    </div>
                                </div>
                                <div className="card-actions">
                                    <button className="card-play-btn" >
                                        <svg width="40" height="40" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="15" stroke="#969696ff" strokeWidth="2"/><polygon points="12,10 24,16 12,22" fill="#e0e0e0"/></svg>
                                    </button>
                                    <button 
                                        className="card-details-btn" 
                                        style={{border:'1px solid #969696ff'}}
                                        onClick={() => handleViewDetails(idx)}
                                    >
                                        view details
                                    </button>
                                </div>
                                
                                {/* Project Details Overlay */}
                                {activeOverlay === idx && (
                                    <div className="project-overlay">
                                        <div className="project-overlay-header">
                                            <h2 className="project-overlay-title">{project.title}</h2>
                                            <button 
                                                className="project-overlay-back-btn"
                                                onClick={() => handleViewDetails(idx)}
                                            >
                                                ←
                                            </button>
                                        </div>
                                        <div className="project-overlay-content">
                                            <div className="project-tech-stack-section">
                                                <h3 className="project-section-title">Tech Stack</h3>
                                                <div className="project-tech-stack">
                                                    {parseStack(project.stack).map((tech, techIdx) => (
                                                        <span key={techIdx} className="project-tech-tag">{tech}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            <div className="project-responsibilities-section">
                                                <h3 className="project-section-title">Key Responsibilities</h3>
                                                <div className="project-responsibilities">
                                                    {parseResponsibilities(project.responsibilities).map((responsibility, respIdx) => (
                                                        <div key={respIdx} className="project-responsibility-item">
                                                            • {responsibility}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}
        </section>
    );
}

Project.propTypes = {
    projects: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            link: PropTypes.string,
            technologies: PropTypes.arrayOf(PropTypes.string)
        })
    )
};

export default Project; 