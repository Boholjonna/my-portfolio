import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import '../styles/Project.css';

function Project({ projects = [] }) {
    const [isVisible, setIsVisible] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState([false, false]);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    // Reset animation when section leaves viewport
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

    const handleViewDetails = (idx) => {
        setOverlayVisible((prev) => prev.map((v, i) => i === idx ? true : v));
    };
    const handleBack = (idx) => {
        setOverlayVisible((prev) => prev.map((v, i) => i === idx ? false : v));
    };

    return (
        <div className="project-container" ref={containerRef}>
            <h1 className={`project-title ${isVisible ? 'animate' : ''}`}>Projects</h1>
            <div className="project-grid">
                <div className={`project-card project-card-1 ${isVisible ? 'animate' : ''}`} style={{position:'relative'}}>
                    {overlayVisible[0] && (
                        <div className="project-overlay">
                            <button className="overlay-back-btn" onClick={() => handleBack(0)}>
                                <img src="/my-portfolio/images/back.png" alt="Back" className="overlay-back-icon" />
                            </button>
                        </div>
                    )}
                    <div className="card-upper-div">
                        <img 
                            src="/my-portfolio/images/libit.png" 
                            alt="Libit Project" 
                            className="project-image"
                            loading="lazy"
                            onError={(e) => {
                                console.error('Failed to load libit.png');
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                    <div className="card-lower-div" style={{visibility: overlayVisible[0] ? 'hidden' : 'visible'}}>
                        <button className="project-button left-button">
                            <img 
                                src="/my-portfolio/images/play.png" 
                                alt="Play" 
                                className="button-icon"
                                loading="lazy"
                            />
                        </button>
                        <button className="project-button right-button view-details-btn" onClick={() => handleViewDetails(0)}>
                            View Details
                        </button>
                    </div>
                </div>
                <div className={`project-card project-card-2 ${isVisible ? 'animate' : ''}`} style={{position:'relative'}}>
                    {overlayVisible[1] && (
                        <div className="project-overlay">
                            <button className="overlay-back-btn" onClick={() => handleBack(1)}>
                                <img src="/my-portfolio/images/back.png" alt="Back" className="overlay-back-icon" />
                            </button>
                        </div>
                    )}
                    <div className="card-upper-div">
                        <img 
                            src="/my-portfolio/images/intervein.png" 
                            alt="Intervein Project" 
                            className="project-image"
                            loading="lazy"
                            onError={(e) => {
                                console.error('Failed to load intervein.png');
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                    <div className="card-lower-div" style={{visibility: overlayVisible[1] ? 'hidden' : 'visible'}}>
                        <button className="project-button left-button">
                            <img 
                                src="/my-portfolio/images/play.png" 
                                alt="Play" 
                                className="button-icon"
                                loading="lazy"
                            />
                        </button>
                        <button className="project-button right-button view-details-btn" onClick={() => handleViewDetails(1)}>
                            View Details
                        </button>
                    </div>
                </div>
            </div>
            <hr className="project-bottom-line" />
        </div>
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