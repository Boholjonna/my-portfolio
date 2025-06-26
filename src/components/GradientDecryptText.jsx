import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import '../styles/GradientDecryptText.css';

function GradientDecryptText({ text, speed = 1, maxIterations = 5 }) {
    const [displayText, setDisplayText] = useState('');
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        let currentIteration = 0;
        let currentText = '';
        let interval;

        const randomChar = () => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
            return chars.charAt(Math.floor(Math.random() * chars.length));
        };

        const animate = () => {
            if (currentIteration >= maxIterations) {
                setDisplayText(text);
                setIsAnimating(false);
                return;
            }

            currentText = text.split('').map((char, index) => {
                if (index < currentIteration * (text.length / maxIterations)) {
                    return text[index];
                }
                return randomChar();
            }).join('');

            setDisplayText(currentText);
            currentIteration++;
        };

        interval = setInterval(animate, speed * 100);

        return () => clearInterval(interval);
    }, [text, speed, maxIterations]);

    return (
        <span className={`gradient-decrypt-text ${isAnimating ? 'animating' : ''}`}>
            {displayText}
        </span>
    );
}

GradientDecryptText.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number,
    maxIterations: PropTypes.number
};

export default GradientDecryptText; 