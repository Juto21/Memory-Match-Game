import React from 'react';

const RestartButton = ({ onClick }) => {
  return (
    <button className="restart-button" onClick={onClick}>
      <img src="/images/reset-button.png" alt="Restart Button" />
    </button>
  );
};

export default RestartButton;
