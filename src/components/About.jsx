import PropTypes from 'prop-types';
import '../styles/About.css';
import '../styles/Circles.css';
import GradientDecryptText from './GradientDecryptText';
import BlurText from './BlurText';
import { useState, useRef } from 'react';

function About({ logo, image, intro, title, message }) {
    const [key, setKey] = useState(0);
    const containerRef = useRef(null);

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
        <div className="about-container" ref={containerRef} style={{ position: 'relative', overflow: 'hidden' }}>
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
            </div>
            <section className="about-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                {/* Removed about-image with profile image as requested */}
                <div className="about-text">
                    <h1 className="title">
                        <GradientDecryptText 
                            text={title}
                            speed={1}
                            maxIterations={3}
                        />
                    </h1>
                    <div className="skills-icons-row">
                      <div className="skills-icons-track">
                        <img src="images/intellij.png" alt="IntelliJ" />
                        <img src="images/scenebuilder.png" alt="SceneBuilder" />
                        <img src="images/figma.png" alt="Figma" />
                        <img src="images/github.png" alt="GitHub" />
                        <img src="images/git.png" alt="Git" />
                        <img src="images/java.png" alt="Java" />
                        <img src="images/mysql.png" alt="MySQL" />
                        <img src="images/vscode.png" alt="VSCode" />
                        {/* Duplicate for seamless loop */}
                        <img src="images/intellij.png" alt="IntelliJ" />
                        <img src="images/scenebuilder.png" alt="SceneBuilder" />
                        <img src="images/figma.png" alt="Figma" />
                        <img src="images/github.png" alt="GitHub" />
                        <img src="images/git.png" alt="Git" />
                        <img src="images/java.png" alt="Java" />
                        <img src="images/mysql.png" alt="MySQL" />
                        <img src="images/vscode.png" alt="VSCode" />
                      </div>
                    </div>
                    <BlurText 
                        text={message}
                        className="message"
                        delay={100}
                        direction="top"
                        stepDuration={0.4}
                        style={{ textAlign: 'center', justifyContent: 'center' }}
                    />
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