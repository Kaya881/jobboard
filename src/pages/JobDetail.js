import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [proposal, setProposal] = useState({ cover_letter: '', bid_amount: '' });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('access');

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/jobs/${id}/`)
      .then(res => res.json())
      .then(data => setJob(data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      window.location.href = '/login';
      return;
    }
    const response = await fetch('http://127.0.0.1:8000/api/proposals/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...proposal, job: id })
    });
    if (response.ok) {
      setMessage('Proposal sent successfully!');
      setProposal({ cover_letter: '', bid_amount: '' });
    } else {
      setMessage('An error occurred while sending the proposal. Please try again.');
    }
  };

  if (!job) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 1rem' }}>
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '2rem', marginBottom: '2rem' }}>
        <h2>{job.title}</h2>
        <p style={{ color: '#666' }}>{job.description}</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ background: '#e7f3ff', color: '#007bff', padding: '4px 10px', borderRadius: '20px' }}>Budget: ${job.budget}</span>
          <span style={{ background: '#f0fff4', color: '#28a745', padding: '4px 10px', borderRadius: '20px' }}>Deadline: {job.deadline}</span>
          <span style={{ background: '#fff3cd', color: '#856404', padding: '4px 10px', borderRadius: '20px' }}>Status: {job.status}</span>
        </div>
        {job.skills_required && <p style={{ marginTop: '1rem' }}><strong>Skills:</strong> {job.skills_required}</p>}
      </div>

      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '2rem' }}>
        <h3>Send Proposal</h3>
        {message && <p style={{ color: message.includes('successfully') ? 'green' : 'red' }}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Cover Letter</label>
            <textarea
              value={proposal.cover_letter}
              onChange={e => setProposal({ ...proposal, cover_letter: e.target.value })}
              rows={4}
              style={{ display: 'block', width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ddd' }}
              placeholder="Describe why you're the best fit for this job..."
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Bid Amount ($)</label>
            <input
              type="number"
              value={proposal.bid_amount}
              onChange={e => setProposal({ ...proposal, bid_amount: e.target.value })}
              style={{ display: 'block', width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ddd' }}
              placeholder="450"
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {token ? 'Send Proposal' : 'Login to Send Proposal'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default JobDetail;
