import PropTypes from 'prop-types';
import '../styles/Project.css';

function Project({ projects = [] }) {
    return (
        <div className="project-container">
            <div className="project-content">
                <h1 className="project-title">Projects</h1>
                <div className="project-grid">
                    {projects.length > 0 ? (
                        projects.map((project, index) => (
                            <div key={index} className="project-card">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                            </div>
                        ))
                    ) : (
                        <>
                            <div className="project-card">
                                <h3>Project 1</h3>
                                <p>Project description goes here...</p>
                            </div>
                            <div className="project-card">
                                <h3>Project 2</h3>
                                <p>Project description goes here...</p>
                            </div>
                            <div className="project-card">
                                <h3>Project 3</h3>
                                <p>Project description goes here...</p>
                            </div>
                        </>
                    )}
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