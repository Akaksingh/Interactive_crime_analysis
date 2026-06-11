import React from 'react';

function CrimeMap() {
  return (
    <div className="page-content">
      <div className="map-analytics-card">
        <div className="map-analytics-header">Map Analytics</div>
        <div className="map-analytics-body">
          <div className="map-analytics-map">
            <img src="/map-analytics-demo.png" alt="Map Analytics" style={{ width: '100%', borderRadius: 8, border: '2px solid #3399ff' }} />
          </div>
          <div className="map-analytics-filters">
            <div className="filters-header">FILTERS</div>
            <div className="filters-list">
              <div className="filter-title">Types of Crime</div>
              <div className="filter-options">
                <label><input type="checkbox" /> Violent crimes and offenders</label>
                <label><input type="checkbox" /> Sexual assault and sex trafficking</label>
                <label><input type="checkbox" /> Domestic violence</label>
                <label><input type="checkbox" /> Child abuse</label>
                <label><input type="checkbox" /> Vulnerable adults</label>
                <label><input type="checkbox" /> Gang offenders</label>
                <label><input type="checkbox" /> Drug cases</label>
                <label><input type="checkbox" /> Complex financial crimes</label>
                <label><input type="checkbox" /> Career criminals</label>
                <label><input type="checkbox" /> First time offenders</label>
                <label><input type="checkbox" /> Mentally ill and dangerous people</label>
              </div>
              <div className="filter-title" style={{ marginTop: 12 }}>Date Range</div>
              <select style={{ width: '100%', padding: 4, borderRadius: 4, border: '1px solid #bbb', marginTop: 4 }}>
                <option>Within 30 Days</option>
                <option>Within 90 Days</option>
                <option>Within 1 Year</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrimeMap; 