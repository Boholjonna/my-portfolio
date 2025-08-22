import React, { useEffect, useRef, useState } from "react";
import "../styles/Contact.css";
import { supabase } from "../supabaseClient";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [contactMedia, setContactMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [message, setMessage] = useState('');
  const sectionRef = useRef(null);

  // Handle media click with error handling
  const handleMediaClick = (siteUrl) => {
    if (siteUrl && siteUrl.trim() !== '') {
      window.open(siteUrl, '_blank');
    } else {
      setMessage('No link available for this item');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Fetch contact media data from Supabase
  useEffect(() => {
    const fetchContactMedia = async () => {
      try {
        const { data, error } = await supabase
          .from('ContactMedia')
          .select('image-url, title, site-url');
        
        if (error) {
          console.error('Error fetching contact media:', error);
        } else {
          setContactMedia(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactMedia();
  }, []);

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
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              {message && (
                <div style={{
                  color: '#ff6b6b',
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  marginBottom: '1rem',
                  padding: '0.5rem',
                  backgroundColor: 'rgba(255, 107, 107, 0.1)',
                  borderRadius: '4px',
                  border: '1px solid rgba(255, 107, 107, 0.3)'
                }}>
                  {message}
                </div>
              )}
              <div className="contact-media-grid">
              {contactMedia.map((item, index) => (
                <div
                  key={index}
                  className="contact-media-item"
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => handleMediaClick(item['site-url'])}
                  style={{ cursor: 'pointer' }}
                >
                  <img 
                    src={item['image-url']} 
                    alt={item.title}
                    className="contact-media-image"
                  />
                  {hoveredItem === index && (
                    <div className="contact-media-tooltip">
                      {item.title}
                    </div>
                  )}
                </div>
              ))}
              </div>
            </>
          )}
          <div className="contact-message-button-container">
            <button 
              className="contact-message-button"
              onClick={() => window.open('mailto:jonnabohol43@gmail.com', '_blank')}
            >
              or send me a message!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 