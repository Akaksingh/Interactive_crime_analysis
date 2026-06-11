import React from 'react';

function Settings() {
  return (
    <div className="page-content">
      <h2 style={{ textAlign: 'center', marginBottom: 32, color: '#fff' }}>Settings</h2>
      <div className="card" style={{ maxWidth: 400, margin: '0 auto' }}>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input type="checkbox" defaultChecked />
            Enable notifications
          </label>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input type="checkbox" />
            Dark mode
          </label>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input type="checkbox" defaultChecked />
            Receive email alerts
          </label>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input type="checkbox" />
            Auto-update dashboard
          </label>
        </div>
      </div>
    </div>
  );
}

export default Settings; 