import React, { useState } from 'react';

function PostJob() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    skills_required: ''
  });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('access');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      window.location.href = '/login';
      return;
    }
    const response = await fetch('http://127.0.0.1:8000/api/jobs/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      setMessage('Job successfully post ho gayi!');
      setFormData({ title: '', description: '', budget: '', deadline: '', skills_required: '' });
      setTimeout(() => window.location.href = '/', 2000);
    } else {
      const data = await response.json();
      setMessage('Error: ' + JSON.stringify(data));
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 1rem' }}>
      <h2>Post a Job</h2>
      {message && <p style={{ color: message.includes('successfully') ? 'green' : 'red' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Job Title</label>
          <input name="title" value={formData.title} onChange={handleChange} required style={{ display: 'block', width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ddd' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} style={{ display: 'block', width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ddd' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Budget ($)</label>
          <input name="budget" type="number" value={formData.budget} onChange={handleChange} required style={{ display: 'block', width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ddd' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Deadline</label>
          <input name="deadline" type="date" value={formData.deadline} onChange={handleChange} required style={{ display: 'block', width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ddd' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Skills Required</label>
          <input name="skills_required" value={formData.skills_required} onChange={handleChange} placeholder="React, Django, Python..." style={{ display: 'block', width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ddd' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Post Job</button>
      </form>
    </div>
  );
}

export default PostJob;