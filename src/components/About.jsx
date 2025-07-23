import PropTypes from 'prop-types';
import '../styles/About.css';
import '../styles/Circles.css';
import GradientDecryptText from './GradientDecryptText';
import BlurText from './BlurText';
import { useState, useRef, useEffect } from 'react';

function About({ logo, image, intro, title, message }) {
    const [key, setKey] = useState(0);
    const containerRef = useRef(null);
    // Typing animation state
    const professions = [
      'Software Engineer',
      'Web Developer',
      'Software Developer'
    ];
    const [currentProfession, setCurrentProfession] = useState(0);
    const [typedText, setTypedText] = useState('');
    const [typing, setTyping] = useState(true);
    const typingSpeed = 70;
    const pauseTime = 1200;

    useEffect(() => {
      let timeout;
      if (typing) {
        if (typedText.length < professions[currentProfession].length) {
          // Add next character from right to left (actually, always add at the end)
          timeout = setTimeout(() => {
            setTypedText(professions[currentProfession].slice(0, typedText.length + 1));
          }, typingSpeed);
        } else {
          timeout = setTimeout(() => setTyping(false), pauseTime);
        }
      } else {
        if (typedText.length > 0) {
          // Erase from right to left (remove last character)
          timeout = setTimeout(() => {
            setTypedText(professions[currentProfession].slice(0, typedText.length - 1));
          }, 30);
        } else {
          setTyping(true);
          setCurrentProfession((prev) => (prev + 1) % professions.length);
        }
      }
      return () => clearTimeout(timeout);
    }, [typedText, typing, currentProfession]);

    const handleImageLoad = (type) => () => {
        console.log(`${type} loaded successfully`);
    };

    const handleImageError = (type) => (e) => {
        console.error(`${type} failed to load:`, e.target.src);
        // Try to reload with a different path
        const imgPath = e.target.src.split('/').pop();
        e.target.src = `./images/${imgPath}`;
    };

    return (
        <div className="about-container" ref={containerRef} style={{ position: 'relative' }}>
            <header className="about-header">
                <img 
                    src={logo} 
                    alt="Logo" 
                    className="logo" 
                    loading="eager"
                    onLoad={handleImageLoad('Logo')}
                    onError={handleImageError('Logo')}
                />
                <div className="circles-container">
                    <div className="circle circle-1"></div>
                    <div className="circle circle-2"></div>
                    <div className="circle circle-3"></div>
                </div>
            </header>
            <div className="portfolio-header">
              <h1 className="portfolio-title">WELCOME TO MY PORTFOLIO</h1>
              <hr className="portfolio-hr" />
              <div className="jonna-gradient-text">
                <span className="jonna-i-am">I am </span>
                <span className="jonna-j">J</span>
                <span className="jonna-o-img-wrapper">
                  <img src="images/nightme.png" alt="Jonna" className="jonna-o-img" />
                </span>
                <span className="jonna-nna">nna</span>
              </div>
              <div className="jonna-type-btn-wrapper">
                <button className="jonna-type-btn">
                  <span className="jonna-type-static">A&nbsp;</span>
                  <span className="jonna-type-animated">{typedText}</span>
                </button>
              </div>
            </div>
            <section className="about-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                {/* Removed about-image with profile image as requested */}
                <div className="about-text">
                    {/* Removed the <h1 className='title'> and GradientDecryptText as requested */}
                    {/* Removed skills-icons-row and skills-icons-track with images as requested */}
                    <div className="message-bg">
                      <BlurText 
                          text={message}
                          className="message"
                          delay={40}
                          direction="top"
                          stepDuration={0.3}
                          animateBy="words"
                          style={{ textAlign: 'center', justifyContent: 'center' }}
                      />
                    </div>
                </div>
            </section>
        </div>
    );
}

About.propTypes = {
    logo: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};

export default About;