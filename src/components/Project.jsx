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
                        <div className={"project-overlay show"}>
                            <div className="overlay-content">
                                <h2 className="overlay-gradient-text">Library Management System</h2>
                                <p className="overlay-description">
                                    This desktop application is an exclusive platform with User, Librarian, and Admin interfaces. Users can borrow and reserve books, manage profiles, and view their activity history. Overdue books restrict access until payment is made. Librarians manage inventory, returns, payments, and reservations. Admins oversee user and librarian accounts, track earnings, and generate analytics on book usage and library operations.
                                </p>
                                <h3 className="overlay-gradient-text">Tech Stack</h3>
                                <div className="tech-stack-circles-container">
                                    <div className={`tech-stack-circles tech-stack-circles-1`}>
                                        {["java.png","mysql.png","figma.png","github.png","git.png"].map((img, i) => (
                                            <div className="tech-circle tech-circle-1" key={img}>
                                                <img src={`/my-portfolio/images/${img}`} alt={img.split('.')[0]} width="36" height="36" loading="lazy" onLoad={e => e.target.classList.add('loaded')} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <button className="overlay-back-btn" onClick={() => handleBack(0)}>
                                <img src="/my-portfolio/images/back.png" alt="Back" className="overlay-back-icon" width="32" height="32" loading="lazy" onLoad={e => e.target.classList.add('loaded')} />
                            </button>
                        </div>
                    )}
                    <div className="card-upper-div">
                        <img 
                            src="/my-portfolio/images/libit.png" 
                            alt="Libit Project" 
                            className="project-image"
                            width="120" height="120"
                            loading="lazy"
                            onLoad={e => e.target.classList.add('loaded')}
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
                                width="24" height="24"
                                loading="lazy"
                                onLoad={e => e.target.classList.add('loaded')}
                            />
                        </button>
                        <button className="project-button right-button view-details-btn" onClick={() => handleViewDetails(0)}>
                            View Details
                        </button>
                    </div>
                </div>
                <div className={`project-card project-card-2 ${isVisible ? 'animate' : ''}`} style={{position:'relative'}}>
                    {overlayVisible[1] && (
                        <div className={"project-overlay show"}>
                            <div className="overlay-content">
                                <h2 className="overlay-gradient-text">Inventory Management System</h2>
                                <p className="overlay-description">
                                    This desktop application streamlines stock control and sales tracking for a medical company through a centralized platform for managing inventory. It allows users to add, edit, and delete products, manage stock levels, and track stock on hand and product off-take. Key features include activity logs, sales data visualization, and forecasting tools—enabling informed decisions and improved operational efficiency.
                                </p>
                                <h3 className="overlay-gradient-text">Tech Stack</h3>
                                <div className="tech-stack-circles-container">
                                    <div className={`tech-stack-circles tech-stack-circles-2`}>
                                        {["java.png","mysql.png","figma.png","github.png","git.png"].map((img, i) => (
                                            <div className="tech-circle tech-circle-2" key={img}>
                                                <img src={`/my-portfolio/images/${img}`} alt={img.split('.')[0]} width="36" height="36" loading="lazy" onLoad={e => e.target.classList.add('loaded')} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <button className="overlay-back-btn" onClick={() => handleBack(1)}>
                                <img src="/my-portfolio/images/back.png" alt="Back" className="overlay-back-icon" width="32" height="32" loading="lazy" onLoad={e => e.target.classList.add('loaded')} />
                            </button>
                        </div>
                    )}
                    <div className="card-upper-div">
                        <img 
                            src="/my-portfolio/images/intervein.png" 
                            alt="Intervein Project" 
                            className="project-image"
                            width="120" height="120"
                            loading="lazy"
                            onLoad={e => e.target.classList.add('loaded')}
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
                                width="24" height="24"
                                loading="lazy"
                                onLoad={e => e.target.classList.add('loaded')}
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