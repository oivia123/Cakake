import React from 'react';
import './CardFlip.css';

function CardFlip({ flipped, onClick, children, number }) {
  return (
    <div className="card-container" onClick={onClick}>
      <div className={`card-inner${flipped ? ' flipped' : ''}`}>
        <div className="card-front" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 'bold', color: '#222' }}>
          {number}
        </div>
        {children ? (
          children
        ) : (
          <div className="card-back" />
        )}
      </div>
    </div>
  );
}

export default CardFlip; 