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
    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const [currentVideoContent, setCurrentVideoContent] = useState('');
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
            const { data, error } = await supabase.from('Projects').select('image-url,type,title,stack,responsibilities,video-url,github-url');
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

    const handlePlayVideo = (videoContent) => {
        if (videoContent) {
            setCurrentVideoContent(videoContent);
            setVideoModalOpen(true);
        }
    };

    const handleGithubClick = (githubUrl) => {
        if (githubUrl) {
            window.open(githubUrl, '_blank');
        }
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
                                        onClick={() => handleGithubClick(project["github-url"])}
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
                                    <button className="card-play-btn" onClick={() => handlePlayVideo(project["video-url"])}>
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
                                
                            </div>
                        ))
                    )}
                </div>
            )}
            
            {/* Centered Project Overlay with Backdrop */}
            {activeOverlay !== null && (
                <>
                    {/* Dark Backdrop */}
                    <div 
                        className="project-overlay-backdrop"
                        onClick={() => setActiveOverlay(null)}
                    />
                    
                    {/* Centered Overlay */}
                    <div className="project-overlay-centered">
                        <div className="project-overlay-header">
                            <h2 className="project-overlay-title">{projectData[activeOverlay]?.title}</h2>
                            <button 
                                className="project-overlay-back-btn"
                                onClick={() => setActiveOverlay(null)}
                            >
                                ←
                            </button>
                        </div>
                        <div className="project-overlay-content">
                            <div className="project-tech-stack-section">
                                <h3 className="project-section-title">Tech Stack</h3>
                                <div className="project-tech-stack">
                                    {parseStack(projectData[activeOverlay]?.stack).map((tech, techIdx) => (
                                        <span key={techIdx} className="project-tech-tag">{tech}</span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="project-responsibilities-section">
                                <h3 className="project-section-title">Key Responsibilities</h3>
                                <div className="project-responsibilities">
                                    {parseResponsibilities(projectData[activeOverlay]?.responsibilities).map((responsibility, respIdx) => (
                                        <div key={respIdx} className="project-responsibility-item">
                                            • {responsibility}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Video Modal */}
            {videoModalOpen && (
                <>
                    {/* Dark Backdrop */}
                    <div 
                        className="video-modal-backdrop"
                        onClick={() => setVideoModalOpen(false)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    />
                    
                    {/* Video Modal Content */}
                    <div 
                        className="video-modal-content"
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '90%',
                            maxWidth: '1200px',
                            height: '80%',
                            maxHeight: '800px',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '12px',
                            zIndex: 10000,
                            padding: '20px',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setVideoModalOpen(false)}
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                color: '#fff',
                                fontSize: '20px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 10001
                            }}
                        >
                            ×
                        </button>

                        {/* Video Content */}
                        <div 
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            dangerouslySetInnerHTML={{ __html: currentVideoContent }}
                        />
                    </div>
                </>
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