// MainMenu.js
import React from 'react';

const MainMenu = ({ onStartClick, onQuitClick }) => {
  return (
    <div className="main-menu">
      <h1>Memory Matching Game (Animal) </h1>
      <button onClick={onStartClick}>Start</button>
      <button onClick={onQuitClick}>Quit</button>
    </div>
  );
};

export default MainMenu;
