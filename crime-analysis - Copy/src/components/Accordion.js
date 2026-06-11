import React from 'react';

function Accordion({ title, children, open, onClick }) {
  return (
    <div className="accordion-section">
      <button className="accordion-title" onClick={onClick}>
        <span>{title}</span>
        <span style={{ float: 'right', fontWeight: 'bold' }}>{open ? '-' : '+'}</span>
      </button>
      {open && <div className="accordion-content">{children}</div>}
    </div>
  );
}

export default Accordion; 