import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import '../styles/Skills.css';

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
  <section className="skills-section" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 0" }}>
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
          gap: "18px",
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
              <div key={skill.skill + idx} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div
                  className="skill-round-container"
                  style={{
                    background: "#181818",
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
                    style={{ width: "28px", height: "28px", filter: "drop-shadow(0 0 4px #a259ff)" }}
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