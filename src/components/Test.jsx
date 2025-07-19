import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  container: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    minWidth: '320px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginBottom: '1rem',
    width: '100%',
  },
  button: {
    padding: '0.5rem 1.5rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: 'none',
    background: '#4f46e5',
    color: '#fff',
    cursor: 'pointer',
    marginBottom: '1rem',
  },
  message: {
    marginTop: '1rem',
    fontSize: '1rem',
    color: '#16a34a',
  },
  error: {
    marginTop: '1rem',
    fontSize: '1rem',
    color: '#dc2626',
  },
};

const Test = ({ onClose }) => {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    const { error } = await supabase.from('Projects').insert([{ title: text }]);
    setLoading(false);
    if (error) {
      setError('Failed to insert: ' + error.message);
    } else {
      setMessage('Inserted successfully!');
      setText('');
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input
            type="text"
            placeholder="Enter title for Projects table"
            value={text}
            onChange={e => setText(e.target.value)}
            style={styles.input}
            required
            disabled={loading}
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Inserting...' : 'Insert'}
          </button>
        </form>
        {message && <div style={styles.message}>{message}</div>}
        {error && <div style={styles.error}>{error}</div>}
        <button onClick={onClose} style={{...styles.button, background: '#aaa'}}>Close</button>
      </div>
    </div>
  );
};

export default Test; 