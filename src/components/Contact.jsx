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
        <form className={`contact-form${isVisible ? ' visible' : ''}`}>
          <div className={`contact-inputs${isVisible ? ' visible' : ''}`}>
            <span className={`contact-gradient-title${isVisible ? ' visible' : ''}`}>Send me a message</span>
            <input
              type="text"
              className={`contact-input name${isVisible ? ' visible' : ''}`}
              placeholder="Your Name"
              required
            />
            <input
              type="text"
              className={`contact-input company${isVisible ? ' visible' : ''}`}
              placeholder="Your Company"
            />
            <input
              type="email"
              className={`contact-input email${isVisible ? ' visible' : ''}`}
              placeholder="Your Email"
              required
            />
          </div>
          <textarea
            className={`contact-textarea message${isVisible ? ' visible' : ''}`}
            placeholder="Your Message"
            required
          />
        </form>
        <div className={`contact-linkedin-footer${isVisible ? ' visible' : ''}`}>
          <span>Let's connect at&nbsp;</span>
          <a href="https://www.linkedin.com/in/silver-stein-8a015529a/" target="_blank" rel="noopener noreferrer">
            <img src="images/linkedIn.png" alt="LinkedIn" style={{ height: '40px', verticalAlign: 'middle' }} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact; 