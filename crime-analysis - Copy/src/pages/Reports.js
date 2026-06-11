import React from 'react';

function Reports() {
  return (
    <div className="page-content">
      <h2 style={{ textAlign: 'center', marginBottom: 32, color: '#fff' }}>Reports</h2>
      <div className="card">
        <table style={{ width: '100%', background: 'transparent', color: '#fff', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#232b3e' }}>
              <th style={{ padding: '12px' }}>ID</th>
              <th style={{ padding: '12px' }}>Title</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px' }}>101</td>
              <td style={{ padding: '10px' }}>Burglary in Camden</td>
              <td style={{ padding: '10px' }}>Open</td>
              <td style={{ padding: '10px' }}>2025-04-20</td>
            </tr>
            <tr>
              <td style={{ padding: '10px' }}>102</td>
              <td style={{ padding: '10px' }}>Vandalism at Park</td>
              <td style={{ padding: '10px' }}>Closed</td>
              <td style={{ padding: '10px' }}>2025-04-18</td>
            </tr>
            <tr>
              <td style={{ padding: '10px' }}>103</td>
              <td style={{ padding: '10px' }}>Robbery on High St</td>
              <td style={{ padding: '10px' }}>Investigating</td>
              <td style={{ padding: '10px' }}>2025-04-15</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports; 