import React, { useRef } from 'react';
import '../styles/Admin.css';

function Admin() {
  const fileInputRef = useRef(null);

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="admin-container">
      <div>
        <h2 className="admin-title">WELCOME ADMIN !</h2>
        <div className="admin-subtitle">add your skills</div>
      </div>
      <form className="admin-form" autoComplete="off">
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <button type="button" className="admin-btn" onClick={handleImageUpload}>
          Upload Image
        </button>
        <input
          type="text"
          className="admin-input"
          placeholder="Enter text"
        />
      </form>
      <button className="admin-arrow" type="button">
        <span style={{fontSize: '2rem', fontWeight: 'bold'}}>&uarr;</span>
      </button>
    </div>
  );
}

export default Admin;
