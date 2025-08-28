import React, { useEffect, useState, useRef } from "react";
import { supabase } from "../supabaseClient";
import '../styles/Skills.css';

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSkills, setVisibleSkills] = useState(new Set());
  const sectionRef = useRef(null);
  const skillRefs = useRef([]);

  useEffect(() => {
    async function fetchSkills() {
      const { data, error } = await supabase
        .from("Skills")
        .select("image-url, skill");
      if (error) {
        setError(error.message);
        setSkills([]);
      } else if (data && data.length > 0) {
        setSkills(data);
        setError(null);
      } else {
        setSkills([]);
        setError(null);
      }
      setLoading(false);
    }
    fetchSkills();
  }, []);

  // Section visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Individual skill animation observer
  useEffect(() => {
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const skillIndex = parseInt(entry.target.dataset.skillIndex);
          if (entry.isIntersecting && isVisible) {
            setTimeout(() => {
              setVisibleSkills(prev => new Set([...prev, skillIndex]));
            }, skillIndex * 100); // Stagger the animations
          }
        });
      },
      { threshold: 0.5 }
    );

    skillRefs.current.forEach((skill) => {
      if (skill) skillObserver.observe(skill);
    });

    return () => {
      skillRefs.current.forEach((skill) => {
        if (skill) skillObserver.unobserve(skill);
      });
    };
  }, [skills, isVisible]);

  return (
  <section className="skills-section" ref={sectionRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "50px 0" }}>
  <div className="notable-skills-btn-wrapper" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <button className="notable-skills-btn">
          <span className="notable-skills-gradient-text">Notable Skills</span>
        </button>
      </div>
      <div style={{ width: "100%", marginTop: "0.8rem" }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: "25px",
          background: "transparent",
          borderRadius: "24px",
          padding: "18px 32px",
          boxShadow: "none",
          height: "auto"
        }}>
          {loading ? (
            <span style={{ color: "#a259ff" }}>Loading...</span>
          ) : error ? (
            <span style={{ color: "#dc2626" }}>Error: {error}</span>
          ) : skills.length === 0 ? (
            <span style={{ color: "#a259ff" }}>No skills found in database.</span>
          ) : (
            skills.map((skill, idx) => (
              <div 
                key={skill.skill + idx} 
                data-skill-index={idx}
                ref={el => skillRefs.current[idx] = el}
                className={`skill-item ${visibleSkills.has(idx) ? 'skill-visible' : 'skill-hidden'}`}
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <div
                  className="skill-round-container"
                  style={{
                    background: "000000",
                    borderRadius: "50%",
                    width: "70px",
                    height: "70px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    transition: "transform 0.3s, box-shadow 0.3s"
                  }}
                >
                  <img
                    src={skill["image-url"]}
                    alt={skill.skill}
                    style={{ width: "28px", height: "28px", filter: "drop-shadow(0 0 4px rgb(175, 114, 255))" }}
                  />
                </div>
                <span style={{ color: "#a259ff", fontSize: "0.85rem", fontWeight: "500", marginTop: "8px" }}>{skill.skill}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Skills;