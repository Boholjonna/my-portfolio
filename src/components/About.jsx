import PropTypes from 'prop-types';
import '../styles/About.css';
import '../styles/Circles.css';

function About({ logo, image, intro, title, message }) {
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
        <div className="about-container">
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
            <div className="about-content">
                <h2 className="intro">{intro}</h2>
                <div className="about-image">
                    <img 
                        src={image} 
                        alt="Profile" 
                        loading="eager"
                        onLoad={handleImageLoad('Profile')}
                        onError={handleImageError('Profile')}
                    />
                </div>
                <div className="about-text">
                    <h1 className="title">{title}</h1>
                    <p className="message">{message}</p>
                </div>
            </div>
        </div>
    );
}

About.propTypes = {
    logo: PropTypes.any.isRequired,
    image: PropTypes.any.isRequired,
    intro: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};

export default About;