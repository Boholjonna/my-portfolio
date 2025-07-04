import React from "react";
import "../styles/Contact.css";

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
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
    </section>
  );
};

export default Contact; 