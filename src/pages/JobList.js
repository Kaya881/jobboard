import React, { useState, useEffect } from 'react';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const url = search
      ? `http://127.0.0.1:8000/api/jobs/?search=${search}`
      : `http://127.0.0.1:8000/api/jobs/`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [search]);

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Available Jobs</h2>
        <div>
          <a href="/login" style={{ marginRight: '1rem', color: '#007bff' }}>Login</a>
          <a href="/register" style={{ color: '#28a745' }}>Register</a>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search jobs by title, skills..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '1.5rem', borderRadius: '4px', border: '1px solid #ddd', fontSize: '15px' }}
      />

      {loading ? (
        <p>Loading...</p>
      ) : jobs.length === 0 ? (
        <p>Koi job nahi mili.</p>
      ) : (
        jobs.map(job => (
          <div key={job.id} onClick={() => window.location.href = `/jobs/${job.id}`} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem', cursor: 'pointer' }}>
            <h3 style={{ margin: '0 0 8px' }}>{job.title}</h3>
            <p style={{ color: '#666', margin: '0 0 8px' }}>{job.description}</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ background: '#e7f3ff', color: '#007bff', padding: '4px 10px', borderRadius: '20px', fontSize: '13px' }}>Budget: ${job.budget}</span>
              <span style={{ background: '#f0fff4', color: '#28a745', padding: '4px 10px', borderRadius: '20px', fontSize: '13px' }}>Deadline: {job.deadline}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default JobList;