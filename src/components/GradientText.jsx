import React from 'react';
import '../styles/Project.css';

const GradientText = ({ children, className = '', ...props }) => (
  <span
    className={`project-title ${className}`}
    style={{
      background: 'linear-gradient(to right, #0098D9, #E100E5, #C7F900)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontWeight: 'bold',
      fontFamily: 'Press Start 2P, cursive',
      display: 'inline-block',
      margin: 0,
      padding: 0,
      fontSize: 'clamp(2rem, 4vw, 3.5rem)'
    }}
    {...props}
  >
    {children}
  </span>
);

export default GradientText;
