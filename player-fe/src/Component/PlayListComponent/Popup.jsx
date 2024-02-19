import React from 'react';

const Popup = ({ title, content, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <div className="popup-header">
          <h2>{title}</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="popup-body">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
