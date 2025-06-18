import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import '../styles/Project.css';

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
                    <h3>Project 1</h3>
                    <p>Project description goes here...</p>
                </div>
                <div className={`project-card project-card-2 ${isVisible ? 'animate' : ''}`}>
                    <h3>Project 2</h3>
                    <p>Project description goes here...</p>
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