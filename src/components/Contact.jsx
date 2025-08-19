import React, { useEffect, useRef, useState } from "react";
import "../styles/Contact.css";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      <div className={`contact-container-inner${isVisible ? ' visible' : ''}`}>
        <div className={`contact-form${isVisible ? ' visible' : ''}`}>
          <span className={`contact-gradient-title${isVisible ? ' visible' : ''}`}>Keep in touch with me @</span>
        </div>
        <div className={`contact-media${isVisible ? ' visible' : ''}`}>
          
        </div>
      </div>
    </section>
  );
};

export default Contact; 