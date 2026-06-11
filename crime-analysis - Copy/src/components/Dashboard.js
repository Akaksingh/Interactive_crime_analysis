import React, { useState } from 'react';
import AreaStats from './AreaStats';
import MapAnalytics from './MapAnalytics';
import Accordion from './Accordion';

const MapAnalyticsContent = () => (
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
);

const RecentCasesContent = () => (
  <ul style={{ color: '#fff', paddingLeft: 0, listStyle: 'none' }}>
    <li style={{ marginBottom: 12 }}><b>Robbery</b> at Camden Market <span style={{ color: '#ff5e5e' }}>[Open]</span></li>
    <li style={{ marginBottom: 12 }}><b>Burglary</b> at Baker St <span style={{ color: '#ffb300' }}>[Investigating]</span></li>
    <li style={{ marginBottom: 12 }}><b>Vandalism</b> at Primrose Hill <span style={{ color: '#1ed760' }}>[Closed]</span></li>
  </ul>
);

const WorldAnalyticsContent = () => (
  <div style={{ color: '#fff' }}>
    <div style={{ marginBottom: 10 }}><b>London:</b> 432 crimes/100k</div>
    <div style={{ marginBottom: 10 }}><b>New York:</b> 510 crimes/100k</div>
    <div style={{ marginBottom: 10 }}><b>Tokyo:</b> 120 crimes/100k</div>
    <div style={{ marginBottom: 10 }}><b>Paris:</b> 340 crimes/100k</div>
  </div>
);

const CrimeADTContent = () => (
  <table style={{ width: '100%', color: '#fff', background: 'transparent', borderCollapse: 'collapse' }}>
    <thead>
      <tr style={{ background: '#232b3e' }}>
        <th style={{ padding: '8px' }}>Crime Type</th>
        <th style={{ padding: '8px' }}>Avg. Detection Time</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style={{ padding: '8px' }}>Robbery</td><td style={{ padding: '8px' }}>2 days</td></tr>
      <tr><td style={{ padding: '8px' }}>Burglary</td><td style={{ padding: '8px' }}>5 days</td></tr>
      <tr><td style={{ padding: '8px' }}>Vandalism</td><td style={{ padding: '8px' }}>1 day</td></tr>
      <tr><td style={{ padding: '8px' }}>Assault</td><td style={{ padding: '8px' }}>3 days</td></tr>
    </tbody>
  </table>
);

const ComparingSetsContent = () => (
  <div style={{ color: '#fff', display: 'flex', gap: 32, flexWrap: 'wrap' }}>
    <div>
      <b>Camden</b>
      <ul style={{ paddingLeft: 18 }}>
        <li>Total Crimes: 432</li>
        <li>Robberies: 120</li>
        <li>Vandalism: 80</li>
      </ul>
    </div>
    <div>
      <b>Westminster</b>
      <ul style={{ paddingLeft: 18 }}>
        <li>Total Crimes: 389</li>
        <li>Robberies: 98</li>
        <li>Vandalism: 60</li>
      </ul>
    </div>
  </div>
);

const SafetyGuideContent = () => (
  <ul style={{ color: '#fff', paddingLeft: 18 }}>
    <li>Stay alert in crowded places.</li>
    <li>Avoid dark alleys at night.</li>
    <li>Keep emergency numbers handy.</li>
    <li>Report suspicious activity immediately.</li>
  </ul>
);

const sections = [
  { key: 'map', title: 'Map Analytics', content: <MapAnalyticsContent /> },
  { key: 'recent', title: 'Recent cases', content: <RecentCasesContent /> },
  { key: 'world', title: 'World analytics', content: <WorldAnalyticsContent /> },
  { key: 'adt', title: 'Crime ADT', content: <CrimeADTContent /> },
  { key: 'compare', title: 'Comparing Sets', content: <ComparingSetsContent /> },
  { key: 'guide', title: 'Safety Guide', content: <SafetyGuideContent /> },
];

function Dashboard() {
  const [openSection, setOpenSection] = useState('map');

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        {/* <input type="text" placeholder="London, Camden" style={{ padding: '6px', borderRadius: '6px', border: 'none', marginRight: '10px' }} /> */}
        <span>Last updated: 20/04/2025, 14:10</span>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <b style={{ fontSize: '1.2rem', background: '#bfc7d5', color: '#232b3e', padding: '4px 16px', borderRadius: '8px' }}>Your area</b>
        <AreaStats />
      </div>
      {sections.map(section => (
        <Accordion
          key={section.key}
          title={section.title}
          open={openSection === section.key}
          onClick={() => setOpenSection(openSection === section.key ? null : section.key)}
        >
          {section.content}
        </Accordion>
      ))}
    </div>
  );
}

export default Dashboard; 