import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import '../styles/Project.css';
import libitImage from '../images/libit.png';
import interveinImage from '../images/intervein.png';
import playIcon from '../images/play.png';
import backIcon from '../images/back.png';

function Project({ projects = [] }) {
    const [isVisible, setIsVisible] = useState(false);
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

    return (
        <div className="project-container" ref={containerRef}>
            <h1 className={`project-title ${isVisible ? 'animate' : ''}`}>Projects</h1>
            <div className="project-grid">
                <div className={`project-card project-card-1 ${isVisible ? 'animate' : ''}`}>
                    <div className="card-upper-div">
                        <img src={libitImage} alt="Libit Project" className="project-image" />
                    </div>
                    <div className="card-lower-div">
                        <button className="project-button left-button">
                            <img src={playIcon} alt="Play" className="button-icon" />
                        </button>
                        <button className="project-button right-button">
                            <img src={backIcon} alt="Back" className="button-icon" />
                        </button>
                    </div>
                </div>
                <div className={`project-card project-card-2 ${isVisible ? 'animate' : ''}`}>
                    <div className="card-upper-div">
                        <img src={interveinImage} alt="Intervein Project" className="project-image" />
                    </div>
                    <div className="card-lower-div">
                        <button className="project-button left-button">
                            <img src={playIcon} alt="Play" className="button-icon" />
                        </button>
                        <button className="project-button right-button">
                            <img src={backIcon} alt="Back" className="button-icon" />
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