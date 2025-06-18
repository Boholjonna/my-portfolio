import PropTypes from 'prop-types';
import '../styles/Project.css';

function Project({ projects = [] }) {
    return (
        <div className="project-container">
            <h1 className="project-title">Projects</h1>
            <div className="project-grid">
                <div className="project-card project-card-1">
                    <h3>Project 1</h3>
                    <p>Project description goes here...</p>
                </div>
                <div className="project-card project-card-2">
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