import React, { useState, useEffect } from 'react';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ bio: '', skills: '', location: '' });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('access');

  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
      return;
    }
    fetch('http://127.0.0.1:8000/api/accounts/profile/', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setFormData({ bio: data.bio || '', skills: data.skills || '', location: data.location || '' });
      });
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/api/accounts/profile/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      setMessage('Profile update ho gaya!');
    } else {
      setMessage('Kuch error aa gaya!');
    }
  };

  if (!profile) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 1rem' }}>
      <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#007bff', color: 'white', fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
          {profile.username[0].toUpperCase()}
        </div>
        <h2 style={{ margin: '0 0 4px' }}>{profile.username}</h2>
        <p style={{ color: '#666', margin: '0' }}>{profile.email}</p>
        <span style={{ background: '#e7f3ff', color: '#007bff', padding: '4px 12px', borderRadius: '20px', fontSize: '13px' }}>{profile.role}</span>
      </div>

      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '2rem' }}>
        <h3>Profile Edit Karo</h3>
        {message && <p style={{ color: message.includes('update') ? 'green' : 'red' }}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Bio</label>
            <textarea
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
              style={{ display: 'block', width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ddd' }}
              placeholder="Apne baare mein likho..."
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Skills</label>
            <input
              value={formData.skills}
              onChange={e => setFormData({ ...formData, skills: e.target.value })}
              style={{ display: 'block', width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ddd' }}
              placeholder="React, Django, Python..."
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Location</label>
            <input
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
              style={{ display: 'block', width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ddd' }}
              placeholder="Lahore, Pakistan"
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;