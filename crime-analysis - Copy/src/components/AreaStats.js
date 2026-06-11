import React from 'react';

function AreaStats() {
  return (
    <div className="area-stats">
      <div className="stat total-crimes">
        <h4>Total Crimes</h4>
        <div className="value">432</div>
        <div className="positive">-12% from last week</div>
      </div>
      <div className="stat Crime Severity">
        <h4>Crime Severity</h4>
        <div className="value danger">2</div>
        <div className="desc">This area is unsafe for you.</div>
      </div>
      <div className="stat Top Crime">
        <h4>Top Crime</h4>
        <div className="value critical">Theft</div>
        <div className="desc">North Campus</div>
      </div>
    </div>
  );
}

export default AreaStats; 