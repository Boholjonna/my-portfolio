import React from 'react';
import '../styles/Skills.css';

function Skills() {
  const handleSkillsClick = () => {
    window.open('admin.html', '_blank');
  };
  return (
    <section className="skills-section">
      <div className="notable-skills-btn-wrapper">
        <button className="notable-skills-btn" onClick={handleSkillsClick}>
          <span className="notable-skills-gradient-text">Notable Skills</span>
        </button>
      </div>
      {/* Skills content removed as requested */}
    </section>
  );
}

export default Skills; 