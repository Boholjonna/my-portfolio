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
      description: 'Overview and analytics',
      color: '#8B5CF6'
    },
    {
      id: 'about',
      title: 'About Section',
      icon: '👤',
      description: 'Personal information and bio',
      color: '#EC4899'
    },
    {
      id: 'skills',
      title: 'Skills Section',
      icon: '🛠️',
      description: 'Technical skills and expertise',
      color: '#06B6D4'
    },
    {
      id: 'projects',
      title: 'Projects Section',
      icon: '🚀',
      description: 'Portfolio projects and work',
      color: '#10B981'
    },
    {
      id: 'experience',
      title: 'Experience Section',
      icon: '💼',
      description: 'Work history and achievements',
      color: '#F59E0B'
    },
    {
      id: 'contact',
      title: 'Contact Section',
      icon: '📧',
      description: 'Contact information and form',
      color: '#EF4444'
    },
    {
      id: 'credentials',
      title: 'Credentials Section',
      icon: '🎓',
      description: 'Education and certifications',
      color: '#8B5CF6'
    },
    {
      id: 'media',
      title: 'Media Management',
      icon: '🖼️',
      description: 'Images, videos, and files',
      color: '#EC4899'
    }
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="section-content">
            <div className="welcome-header">
              <h2>Welcome back, Admin! 👋</h2>
              <p>Here's what's happening with your portfolio today</p>
            </div>
            
            <div className="dashboard-stats">
              <div className="stat-card" style={{ borderLeft: `4px solid ${adminSections[0].color}` }}>
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <h4>Total Sections</h4>
                  <p>{adminSections.length}</p>
                </div>
              </div>
              <div className="stat-card" style={{ borderLeft: `4px solid ${adminSections[1].color}` }}>
                <div className="stat-icon">👁️</div>
                <div className="stat-info">
                  <h4>Portfolio Views</h4>
                  <p>1,247</p>
                </div>
              </div>
              <div className="stat-card" style={{ borderLeft: `4px solid ${adminSections[2].color}` }}>
                <div className="stat-icon">⭐</div>
                <div className="stat-info">
                  <h4>Last Updated</h4>
                  <p>{new Date().toLocaleDateString()}</p>
                </div>
              </div>
              <div className="stat-card" style={{ borderLeft: `4px solid ${adminSections[3].color}` }}>
                <div className="stat-icon">🟢</div>
                <div className="stat-info">
                  <h4>Status</h4>
                  <p className="status-active">Live</p>
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button className="action-btn" onClick={() => setActiveSection('about')}>
                  <span className="action-icon">✏️</span>
                  Edit About
                </button>
                <button className="action-btn" onClick={() => setActiveSection('projects')}>
                  <span className="action-icon">➕</span>
                  Add Project
                </button>
                <button className="action-btn" onClick={() => setActiveSection('skills')}>
                  <span className="action-icon">🔄</span>
                  Update Skills
                </button>
                <button className="action-btn" onClick={() => setActiveSection('media')}>
                  <span className="action-icon">📁</span>
                  Manage Media
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'about':
        return (
          <div className="section-content">
            <div className="section-header">
              <h3>About Section Management</h3>
              <p>Update your personal information and bio</p>
            </div>
            
            <div className="form-grid">
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
                <label>Full Name</label>
                <input type="text" placeholder="Your full name" className="admin-input" />
              </div>
              
              <div className="form-group">
                <label>Professional Title</label>
                <input type="text" placeholder="e.g., Software Engineer" className="admin-input" />
              </div>
              
              <div className="form-group full-width">
                <label>Professional Bio</label>
                <textarea placeholder="Tell visitors about yourself, your passion, and what drives you..." className="admin-textarea" rows="4"></textarea>
              </div>
              
              <div className="form-group">
                <label>Location</label>
                <input type="text" placeholder="City, Country" className="admin-input" />
              </div>
              
              <div className="form-group">
                <label>Years of Experience</label>
                <input type="number" placeholder="5" className="admin-input" min="0" max="50" />
              </div>
            </div>
            
            <div className="form-actions">
              <button className="save-btn">💾 Save Changes</button>
              <button className="cancel-btn">❌ Cancel</button>
            </div>
          </div>
        );
      
      case 'skills':
        return (
          <div className="section-content">
            <div className="section-header">
              <h3>Skills Section Management</h3>
              <p>Manage your technical skills and expertise levels</p>
            </div>
            
            <div className="skills-container">
              <div className="skill-category">
                <h4>💻 Programming Languages</h4>
                <div className="skill-inputs">
                  <input type="text" placeholder="Skill name" className="admin-input" />
                  <input type="number" placeholder="Proficiency %" className="admin-input" min="0" max="100" />
                  <button className="add-btn">+</button>
                </div>
                <div className="existing-skills">
                  <div className="skill-tag">JavaScript (90%) <button className="remove-btn">×</button></div>
                  <div className="skill-tag">Python (85%) <button className="remove-btn">×</button></div>
                  <div className="skill-tag">Java (80%) <button className="remove-btn">×</button></div>
                </div>
              </div>
              
              <div className="skill-category">
                <h4>🛠️ Frameworks & Tools</h4>
                <div className="skill-inputs">
                  <input type="text" placeholder="Tool name" className="admin-input" />
                  <input type="number" placeholder="Proficiency %" className="admin-input" min="0" max="100" />
                  <button className="add-btn">+</button>
                </div>
                <div className="existing-skills">
                  <div className="skill-tag">React (88%) <button className="remove-btn">×</button></div>
                  <div className="skill-tag">Node.js (82%) <button className="remove-btn">×</button></div>
                  <div className="skill-tag">Git (95%) <button className="remove-btn">×</button></div>
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <button className="save-btn">💾 Save Skills</button>
            </div>
          </div>
        );
      
      case 'projects':
        return (
          <div className="section-content">
            <div className="section-header">
              <h3>Projects Section Management</h3>
              <p>Add and manage your portfolio projects</p>
            </div>
            
            <div className="project-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Project Title</label>
                  <input type="text" placeholder="e.g., E-commerce Platform" className="admin-input" />
                </div>
                
                <div className="form-group">
                  <label>Category</label>
                  <select className="admin-input">
                    <option value="">Select category</option>
                    <option value="web">Web Application</option>
                    <option value="mobile">Mobile App</option>
                    <option value="desktop">Desktop Application</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group full-width">
                  <label>Project Description</label>
                  <textarea placeholder="Describe your project, its features, and your role..." className="admin-textarea" rows="3"></textarea>
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
                
                <div className="form-group">
                  <label>Completion Date</label>
                  <input type="month" className="admin-input" />
                </div>
              </div>
              
              <div className="form-actions">
                <button className="save-btn">🚀 Add Project</button>
                <button className="cancel-btn">❌ Cancel</button>
              </div>
            </div>
          </div>
        );
      
      case 'experience':
        return (
          <div className="section-content">
            <div className="section-header">
              <h3>Experience Section Management</h3>
              <p>Manage your work history and professional achievements</p>
            </div>
            
            <div className="experience-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Company Name</label>
                  <input type="text" placeholder="e.g., Tech Solutions Inc." className="admin-input" />
                </div>
                
                <div className="form-group">
                  <label>Position</label>
                  <input type="text" placeholder="e.g., Senior Software Engineer" className="admin-input" />
                </div>
                
                <div className="form-group">
                  <label>Start Date</label>
                  <input type="month" className="admin-input" />
                </div>
                
                <div className="form-group">
                  <label>End Date</label>
                  <input type="month" className="admin-input" />
                  <small className="form-help">Leave empty if current position</small>
                </div>
                
                <div className="form-group full-width">
                  <label>Job Description</label>
                  <textarea placeholder="Describe your responsibilities, achievements, and technologies used..." className="admin-textarea" rows="4"></textarea>
                </div>
                
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" placeholder="City, Country (or Remote)" className="admin-input" />
                </div>
                
                <div className="form-group">
                  <label>Employment Type</label>
                  <select className="admin-input">
                    <option value="">Select type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="freelance">Freelance</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>
              
              <div className="form-actions">
                <button className="save-btn">💼 Add Experience</button>
                <button className="cancel-btn">❌ Cancel</button>
              </div>
            </div>
          </div>
        );
      
      case 'contact':
        return (
          <div className="section-content">
            <div className="section-header">
              <h3>Contact Section Management</h3>
              <p>Update your contact information and social media links</p>
            </div>
            
            <div className="contact-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="your@email.com" className="admin-input" />
                </div>
                
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+1 (555) 123-4567" className="admin-input" />
                </div>
                
                <div className="form-group">
                  <label>LinkedIn Profile</label>
                  <input type="url" placeholder="https://linkedin.com/in/..." className="admin-input" />
                </div>
                
                <div className="form-group">
                  <label>GitHub Profile</label>
                  <input type="url" placeholder="https://github.com/..." className="admin-input" />
                </div>
                
                <div className="form-group">
                  <label>Twitter/X Profile</label>
                  <input type="url" placeholder="https://twitter.com/..." className="admin-input" />
                </div>
                
                <div className="form-group">
                  <label>Portfolio Website</label>
                  <input type="url" placeholder="https://yourwebsite.com" className="admin-input" />
                </div>
                
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" placeholder="City, Country" className="admin-input" />
                </div>
                
                <div className="form-group">
                  <label>Timezone</label>
                  <select className="admin-input">
                    <option value="">Select timezone</option>
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC+0">UTC</option>
                    <option value="UTC+1">Central European Time (UTC+1)</option>
                    <option value="UTC+8">China Standard Time (UTC+8)</option>
                  </select>
                </div>
              </div>
              
              <div className="form-actions">
                <button className="save-btn">📧 Update Contact Info</button>
                <button className="cancel-btn">❌ Cancel</button>
              </div>
            </div>
          </div>
        );
      
      case 'credentials':
        return (
          <div className="section-content">
            <div className="section-header">
              <h3>Credentials Section Management</h3>
              <p>Manage your education, certifications, and achievements</p>
            </div>
            
            <div className="credentials-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Degree/Certification</label>
                  <input type="text" placeholder="e.g., Bachelor of Science in Computer Science" className="admin-input" />
                </div>
                
                <div className="form-group">
                  <label>Institution</label>
                  <input type="text" placeholder="University/Organization name" className="admin-input" />
                </div>
                
                <div className="form-group">
                  <label>Year Obtained</label>
                  <input type="number" placeholder="2024" className="admin-input" min="1900" max="2030" />
                </div>
                
                <div className="form-group">
                  <label>Type</label>
                  <select className="admin-input">
                    <option value="">Select type</option>
                    <option value="degree">University Degree</option>
                    <option value="certification">Professional Certification</option>
                    <option value="diploma">Diploma</option>
                    <option value="course">Online Course</option>
                    <option value="bootcamp">Coding Bootcamp</option>
                  </select>
                </div>
                
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea placeholder="Additional details about the credential, achievements, or relevant coursework..." className="admin-textarea" rows="3"></textarea>
                </div>
                
                <div className="form-group">
                  <label>Credential URL</label>
                  <input type="url" placeholder="https://..." className="admin-input" />
                  <small className="form-help">Link to verify the credential (optional)</small>
                </div>
                
                <div className="form-group">
                  <label>GPA/Score</label>
                  <input type="text" placeholder="e.g., 3.8/4.0 or 95%" className="admin-input" />
                </div>
              </div>
              
              <div className="form-actions">
                <button className="save-btn">🎓 Add Credential</button>
                <button className="cancel-btn">❌ Cancel</button>
              </div>
            </div>
          </div>
        );
      
      case 'media':
        return (
          <div className="section-content">
            <div className="section-header">
              <h3>Media Management</h3>
              <p>Upload and organize images, videos, and other media files</p>
            </div>
            
            <div className="media-upload">
              <div className="upload-zone">
                <div className="upload-icon">📁</div>
                <h4>Drag & Drop Files Here</h4>
                <p>or click to browse</p>
                <input type="file" accept="image/*,video/*" multiple className="file-input" />
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Media Category</label>
                  <select className="admin-input">
                    <option value="">Select category</option>
                    <option value="profile">Profile Images</option>
                    <option value="projects">Project Screenshots</option>
                    <option value="backgrounds">Background Images</option>
                    <option value="icons">Icons & Logos</option>
                    <option value="gallery">Portfolio Gallery</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Tags</label>
                  <input type="text" placeholder="e.g., web, mobile, ui, design" className="admin-input" />
                  <small className="form-help">Separate tags with commas</small>
                </div>
                
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea placeholder="Brief description of the media file..." className="admin-textarea" rows="2"></textarea>
                </div>
              </div>
              
              <div className="form-actions">
                <button className="save-btn">📤 Upload Media</button>
                <button className="cancel-btn">❌ Cancel</button>
              </div>
            </div>
            
            <div className="media-gallery">
              <h4>Recent Uploads</h4>
              <div className="gallery-grid">
                <div className="media-item">
                  <img src="/images/msJ.png" alt="Profile" className="gallery-image" />
                  <div className="media-overlay">
                    <button className="edit-btn">✏️</button>
                    <button className="delete-btn">🗑️</button>
                  </div>
                </div>
                <div className="media-item">
                  <img src="/images/nightme.png" alt="Background" className="gallery-image" />
                  <div className="media-overlay">
                    <button className="edit-btn">✏️</button>
                    <button className="delete-btn">🗑️</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="section-content">
            <div className="section-header">
              <h3>Select a section to manage</h3>
              <p>Choose from the sidebar to start managing your portfolio</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="header-content">
          <div className="welcome-message">
            <h1 className="admin-title">🎯 Admin Dashboard</h1>
            <p className="admin-subtitle">Welcome back! Ready to make your portfolio amazing?</p>
          </div>
          <div className="header-actions">
            <button className="notification-btn">🔔</button>
            <button className="profile-btn">👤</button>
          </div>
        </div>
      </div>
      
      <div className="admin-layout">
        <div className="admin-sidebar">
          <nav className="admin-nav">
            {adminSections.map((section) => (
              <button
                key={section.id}
                className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
                style={{
                  borderLeft: activeSection === section.id ? `4px solid ${section.color}` : '4px solid transparent'
                }}
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
        <div className="footer-content">
          <p>&copy; 2024 Portfolio Admin Panel | Built with ❤️</p>
          <div className="footer-actions">
            <button className="help-btn">❓ Help</button>
            <button className="logout-btn">🚪 Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
