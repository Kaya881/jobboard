import React from 'react';

function Navbar() {
  const token = localStorage.getItem('access');

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    window.location.href = '/';
  };

  return (
    <nav style={{ background: '#007bff', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }}>JobBoard</a>
      <div>
        {token ? (
          <>
            <a href="/post-job" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>Post Job</a>
            <a href="/dashboard" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>Dashboard</a>
            <a href="/profile" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>Profile</a>
            <button onClick={handleLogout} style={{ background: 'white', color: '#007bff', border: 'none', padding: '6px 16px', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <>
            <a href="/login" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>Login</a>
            <a href="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</a>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;