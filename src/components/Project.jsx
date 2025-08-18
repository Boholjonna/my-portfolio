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
            const { data, error } = await supabase.from('Projects').select('image-url,type');
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
                            <div className="custom-project-card" key={idx}>
                                <div className="card-header">
                                    <span className="card-type" style={{fontSize:'0.85em', padding:'0.2em 0.8em'}}>{project.type}</span>
                                </div>
                                <div className="card-image-wrapper" style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'80px'}}>
                                    <div style={{background:'transparent',borderRadius:'50%',width:'290px',height:'290px',maxWidth:'290px',maxHeight:'290px',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
                                        <img src={project["image-url"]} alt={project.type} style={{width:'85%',height:'85%',maxWidth:'246px',maxHeight:'246px',objectFit:'contain',filter:'drop-shadow(0 0 4px #a259ff)'}} />
                                    </div>
                                </div>
                                <div className="card-actions">
                                    <button className="card-play-btn" >
                                        <svg width="40" height="40" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="15" stroke="#969696ff" strokeWidth="2"/><polygon points="12,10 24,16 12,22" fill="#e0e0e0"/></svg>
                                    </button>
                                    <button className="card-details-btn" style={{border:'1px solid #969696ff'}}>view details</button>
                                </div>
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