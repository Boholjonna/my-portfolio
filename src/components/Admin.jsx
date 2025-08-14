import React, { useRef, useState } from 'react';
import '../styles/Admin.css';

function Admin() {
  const fileInputRef = useRef(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const adminSections = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: '📊',
      description: 'Overview and analytics'
    },
    {
      id: 'about',
      title: 'About Section',
      icon: '👤',
      description: 'Personal information and bio'
    },
    {
      id: 'skills',
      title: 'Skills Section',
      icon: '🛠️',
      description: 'Technical skills and expertise'
    },
    {
      id: 'projects',
      title: 'Projects Section',
      icon: '🚀',
      description: 'Portfolio projects and work'
    },
    {
      id: 'experience',
      title: 'Experience Section',
      icon: '💼',
      description: 'Work history and achievements'
    },
    {
      id: 'contact',
      title: 'Contact Section',
      icon: '📧',
      description: 'Contact information and form'
    },
    {
      id: 'credentials',
      title: 'Credentials Section',
      icon: '🎓',
      description: 'Education and certifications'
    },
    {
      id: 'media',
      title: 'Media Management',
      icon: '🖼️',
      description: 'Images, videos, and files'
    }
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="section-content">
            <h3>Welcome to Admin Dashboard</h3>
            <div className="dashboard-stats">
              <div className="stat-card">
                <h4>Total Sections</h4>
                <p>{adminSections.length}</p>
              </div>
              <div className="stat-card">
                <h4>Last Updated</h4>
                <p>{new Date().toLocaleDateString()}</p>
              </div>
              <div className="stat-card">
                <h4>Status</h4>
                <p className="status-active">Active</p>
              </div>
            </div>
          </div>
        );
      
      case 'about':
        return (
          <div className="section-content">
            <h3>About Section Management</h3>
            <div className="form-group">
              <label>Profile Image</label>
              <div className="image-upload-area">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <button type="button" className="upload-btn" onClick={handleImageUpload}>
                  {selectedImage ? 'Change Image' : 'Upload Image'}
                </button>
                {selectedImage && (
                  <img src={selectedImage} alt="Preview" className="image-preview" />
                )}
              </div>
            </div>
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your full name" className="admin-input" />
            </div>
            <div className="form-group">
              <label>Title</label>
              <input type="text" placeholder="Professional title" className="admin-input" />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea placeholder="Your professional bio" className="admin-textarea" rows="4"></textarea>
            </div>
            <button className="save-btn">Save Changes</button>
          </div>
        );
      
      case 'skills':
        return (
          <div className="section-content">
            <h3>Skills Section Management</h3>
            <div className="skills-container">
              <div className="skill-category">
                <h4>Programming Languages</h4>
                <div className="skill-inputs">
                  <input type="text" placeholder="Skill name" className="admin-input" />
                  <input type="number" placeholder="Proficiency %" className="admin-input" min="0" max="100" />
                  <button className="add-btn">+</button>
                </div>
              </div>
              <div className="skill-category">
                <h4>Frameworks & Tools</h4>
                <div className="skill-inputs">
                  <input type="text" placeholder="Tool name" className="admin-input" />
                  <input type="number" placeholder="Proficiency %" className="admin-input" min="0" max="100" />
                  <button className="add-btn">+</button>
                </div>
              </div>
            </div>
            <button className="save-btn">Save Skills</button>
          </div>
        );
      
      case 'projects':
        return (
          <div className="section-content">
            <h3>Projects Section Management</h3>
            <div className="project-form">
              <div className="form-group">
                <label>Project Title</label>
                <input type="text" placeholder="Project name" className="admin-input" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Project description" className="admin-textarea" rows="3"></textarea>
              </div>
              <div className="form-group">
                <label>Technologies Used</label>
                <input type="text" placeholder="e.g., React, Node.js, MongoDB" className="admin-input" />
              </div>
              <div className="form-group">
                <label>Project Image</label>
                <input type="file" accept="image/*" className="admin-input" />
              </div>
              <div className="form-group">
                <label>Live Demo URL</label>
                <input type="url" placeholder="https://..." className="admin-input" />
              </div>
              <div className="form-group">
                <label>GitHub URL</label>
                <input type="url" placeholder="https://github.com/..." className="admin-input" />
              </div>
              <button className="save-btn">Add Project</button>
            </div>
          </div>
        );
      
      case 'experience':
        return (
          <div className="section-content">
            <h3>Experience Section Management</h3>
            <div className="experience-form">
              <div className="form-group">
                <label>Company Name</label>
                <input type="text" placeholder="Company name" className="admin-input" />
              </div>
              <div className="form-group">
                <label>Position</label>
                <input type="text" placeholder="Job title" className="admin-input" />
              </div>
              <div className="form-group">
                <label>Duration</label>
                <div className="date-inputs">
                  <input type="month" className="admin-input" />
                  <span>to</span>
                  <input type="month" className="admin-input" />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Job responsibilities and achievements" className="admin-textarea" rows="4"></textarea>
              </div>
              <button className="save-btn">Add Experience</button>
            </div>
          </div>
        );
      
      case 'contact':
        return (
          <div className="section-content">
            <h3>Contact Section Management</h3>
            <div className="contact-form">
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="your@email.com" className="admin-input" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" placeholder="+1 (555) 123-4567" className="admin-input" />
              </div>
              <div className="form-group">
                <label>LinkedIn</label>
                <input type="url" placeholder="https://linkedin.com/in/..." className="admin-input" />
              </div>
              <div className="form-group">
                <label>GitHub</label>
                <input type="url" placeholder="https://github.com/..." className="admin-input" />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" placeholder="City, Country" className="admin-input" />
              </div>
              <button className="save-btn">Update Contact Info</button>
            </div>
          </div>
        );
      
      case 'credentials':
        return (
          <div className="section-content">
            <h3>Credentials Section Management</h3>
            <div className="credentials-form">
              <div className="form-group">
                <label>Degree/Certification</label>
                <input type="text" placeholder="e.g., Bachelor of Science in Computer Science" className="admin-input" />
              </div>
              <div className="form-group">
                <label>Institution</label>
                <input type="text" placeholder="University/Organization name" className="admin-input" />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input type="number" placeholder="2024" className="admin-input" min="1900" max="2030" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Additional details about the credential" className="admin-textarea" rows="3"></textarea>
              </div>
              <button className="save-btn">Add Credential</button>
            </div>
          </div>
        );
      
      case 'media':
        return (
          <div className="section-content">
            <h3>Media Management</h3>
            <div className="media-upload">
              <div className="form-group">
                <label>Upload New Media</label>
                <input type="file" accept="image/*,video/*" multiple className="admin-input" />
              </div>
              <div className="form-group">
                <label>Media Category</label>
                <select className="admin-input">
                  <option value="">Select category</option>
                  <option value="profile">Profile Images</option>
                  <option value="projects">Project Screenshots</option>
                  <option value="backgrounds">Background Images</option>
                  <option value="icons">Icons & Logos</option>
                </select>
              </div>
              <button className="save-btn">Upload Media</button>
            </div>
          </div>
        );
      
      default:
        return <div className="section-content"><h3>Select a section to manage</h3></div>;
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">🚀 Admin Dashboard</h1>
        <p className="admin-subtitle">Manage your portfolio website</p>
      </div>
      
      <div className="admin-layout">
        <div className="admin-sidebar">
          <nav className="admin-nav">
            {adminSections.map((section) => (
              <button
                key={section.id}
                className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="nav-icon">{section.icon}</span>
                <div className="nav-content">
                  <span className="nav-title">{section.title}</span>
                  <span className="nav-description">{section.description}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="admin-main">
          <div className="admin-content">
            {renderSectionContent()}
          </div>
        </div>
      </div>
      
      <div className="admin-footer">
        <p>&copy; 2024 Portfolio Admin Panel</p>
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default Admin;
