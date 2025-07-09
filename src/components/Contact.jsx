import React from "react";
import "../styles/Contact.css";

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container-inner">
        <form className="contact-form">
          <div className="contact-inputs">
            <span className="contact-gradient-title">Send me a message</span>
            <input
              type="text"
              className="contact-input"
              placeholder="Your Name"
              required
            />
            <input
              type="text"
              className="contact-input"
              placeholder="Your Company"
            />
            <input
              type="email"
              className="contact-input"
              placeholder="Your Email"
              required
            />
          </div>
          <textarea
            className="contact-textarea"
            placeholder="Your Message"
            required
          />
        </form>
        <div className="contact-linkedin-footer">
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