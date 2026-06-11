import React from 'react';

function MapAnalytics() {
  return (
    <div className="map-analytics">
      <h3>Map Analytics</h3>
      <div className="map-placeholder">
        {/* Replace with react-leaflet map for real data */}
        <img src="https://via.placeholder.com/600x300?text=Map+Analytics" alt="Map" style={{ width: '100%', borderRadius: '8px' }} />
      </div>
      <div className="filters" style={{ background: '#232b3e', padding: '10px', borderRadius: '8px', marginTop: '10px' }}>
        <h4>Filters</h4>
        <div>
          <input type="checkbox" id="violent" /> <label htmlFor="violent">Violent crimes and offenders</label><br />
          <input type="checkbox" id="sexual" /> <label htmlFor="sexual">Sexual assault and sex trafficking</label><br />
          <input type="checkbox" id="domestic" /> <label htmlFor="domestic">Domestic violence</label><br />
          <input type="checkbox" id="vulnerable" /> <label htmlFor="vulnerable">Vulnerable adults</label><br />
          <input type="checkbox" id="gang" /> <label htmlFor="gang">Gang offenders</label><br />
          <input type="checkbox" id="drug" /> <label htmlFor="drug">Drug crimes</label><br />
          <input type="checkbox" id="complex" /> <label htmlFor="complex">Complex financial crimes</label><br />
          <input type="checkbox" id="career" /> <label htmlFor="career">Career criminals</label><br />
          <input type="checkbox" id="firsttime" /> <label htmlFor="firsttime">First time offenders</label><br />
          <input type="checkbox" id="mentallyill" /> <label htmlFor="mentallyill">Mentally ill and dangerous people</label><br />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Date Range: </label>
          <select>
            <option>Within 30 Days</option>
            <option>Within 90 Days</option>
            <option>Within 1 Year</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default MapAnalytics; 