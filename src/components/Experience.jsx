import '../styles/Experience.css';
import '../styles/Project.css';
import { useEffect, useRef, useState } from 'react';

function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

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
    return () => observer.disconnect();
  }, []);

  return (
    <div className="experience-container" ref={containerRef}>
      <h1 className={`project-title ${isVisible ? 'animate' : ''} experience-title-padding`}>Experience</h1>
      <div className="experience-card">
        {/* Add your experience card content here */}
      </div>
      <hr className="experience-bottom-gradient-line" />
    </div>
  );
}

export default Experience;
