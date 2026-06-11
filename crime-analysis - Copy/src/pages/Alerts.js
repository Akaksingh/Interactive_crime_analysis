import React from 'react';
import { FaExclamationTriangle, FaUserSecret } from 'react-icons/fa';
import { WiStormShowers } from 'react-icons/wi';

function Alerts() {
  return (
    <div className="page-content">
      <h2 style={{ textAlign: 'center', marginBottom: 32, color: '#fff' }}>Recent alerts</h2>
      <div style={{ maxWidth: 500, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="alert-card">
          <div className="alert-icon critical"><FaExclamationTriangle size={36} /></div>
          <div>
            <div className="alert-title">Critical- Multiple robberies reported</div>
            <div className="alert-desc">Three armed robberies reported in Cambden within three hours</div>
          </div>
        </div>
        <div className="alert-card">
          <div className="alert-icon info"><FaUserSecret size={36} /></div>
          <div>
            <div className="alert-title">Potential gang activity - bach ke bahar niklo</div>
            <div className="alert-desc">Political rivalry groups seen instigating violence on people peacefully eating icecreams</div>
          </div>
        </div>
        <div className="alert-card">
          <div className="alert-icon weather"><WiStormShowers size={40} /></div>
          <div>
            <div className="alert-title">Extreme Andhi-Toofan near you.</div>
            <div className="alert-desc">Aj no icecream would be preferable as too much hawa and barish is coming aur gang ke log alg ghoom rahe hain bahar.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alerts; 