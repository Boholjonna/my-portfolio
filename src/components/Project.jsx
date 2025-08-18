import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import '../styles/Project.css';
// ...existing code...

function Project({ projects = [] }) {
    const [isVisible, setIsVisible] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState([false, false]);
    // ...existing code...
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

    const handleViewDetails = (idx) => {
        setOverlayVisible((prev) => prev.map((v, i) => i === idx ? true : v));
    };
    const handleBack = (idx) => {
        setOverlayVisible((prev) => prev.map((v, i) => i === idx ? false : v));
    };

    return (
        <section className="project-container" ref={containerRef} style={{ position: 'relative', overflow: 'hidden' }}>
            {/* ...existing code... */}
            <button type="button" className={`project-title ${isVisible ? 'animate' : ''}`}>Projects</button>
            {/* Project cards removed as requested */}
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