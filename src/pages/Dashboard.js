import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [myJobs, setMyJobs] = useState([]);
  const [myProposals, setMyProposals] = useState([]);
  const [activeTab, setActiveTab] = useState('jobs');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('access');

  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
      return;
    }

    fetch('http://127.0.0.1:8000/api/jobs/', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setMyJobs(data));

    fetch('http://127.0.0.1:8000/api/proposals/', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setMyProposals(data);
        setLoading(false);
      });
  }, [token]);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 1rem' }}>
      <h2>Dashboard</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button
          onClick={() => setActiveTab('jobs')}
          style={{ padding: '10px 24px', borderRadius: '4px', border: 'none', cursor: 'pointer', background: activeTab === 'jobs' ? '#007bff' : '#f0f0f0', color: activeTab === 'jobs' ? 'white' : 'black' }}>
          My Jobs ({myJobs.length})
        </button>
        <button
          onClick={() => setActiveTab('proposals')}
          style={{ padding: '10px 24px', borderRadius: '4px', border: 'none', cursor: 'pointer', background: activeTab === 'proposals' ? '#007bff' : '#f0f0f0', color: activeTab === 'proposals' ? 'white' : 'black' }}>
          My Proposals ({myProposals.length})
        </button>
      </div>

      {activeTab === 'jobs' && (
        <div>
          {myJobs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed #ddd', borderRadius: '8px' }}>
              <p style={{ color: '#666' }}>Abhi koi job post nahi ki</p>
              <a href="/post-job" style={{ color: '#007bff' }}>Post a Job</a>
            </div>
          ) : (
            myJobs.map(job => (
              <div key={job.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <h3 style={{ margin: '0 0 8px' }}>{job.title}</h3>
                  <span style={{ background: job.status === 'open' ? '#f0fff4' : '#fff3cd', color: job.status === 'open' ? '#28a745' : '#856404', padding: '4px 10px', borderRadius: '20px', fontSize: '13px' }}>
                    {job.status}
                  </span>
                </div>
                <p style={{ color: '#666', margin: '0 0 8px' }}>{job.description}</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <span style={{ background: '#e7f3ff', color: '#007bff', padding: '4px 10px', borderRadius: '20px', fontSize: '13px' }}>Budget: ${job.budget}</span>
                  <span style={{ background: '#f8f9fa', color: '#666', padding: '4px 10px', borderRadius: '20px', fontSize: '13px' }}>Deadline: {job.deadline}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'proposals' && (
        <div>
          {myProposals.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed #ddd', borderRadius: '8px' }}>
              <p style={{ color: '#666' }}>Abhi koi proposal nahi bheja</p>
              <a href="/" style={{ color: '#007bff' }}>Jobs Browse Karo</a>
            </div>
          ) : (
            myProposals.map(proposal => (
              <div key={proposal.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <h3 style={{ margin: '0 0 8px' }}>{proposal.job_title}</h3>
                  <span style={{
                    background: proposal.status === 'accepted' ? '#f0fff4' : proposal.status === 'rejected' ? '#fff5f5' : '#fff3cd',
                    color: proposal.status === 'accepted' ? '#28a745' : proposal.status === 'rejected' ? '#dc3545' : '#856404',
                    padding: '4px 10px', borderRadius: '20px', fontSize: '13px'
                  }}>
                    {proposal.status}
                  </span>
                </div>
                <p style={{ color: '#666', margin: '0 0 8px' }}>{proposal.cover_letter}</p>
                <span style={{ background: '#e7f3ff', color: '#007bff', padding: '4px 10px', borderRadius: '20px', fontSize: '13px' }}>
                  Bid: ${proposal.bid_amount}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;