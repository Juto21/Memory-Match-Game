// MainMenu.js
import React from 'react';

const MainMenu = ({ onStartClick, onQuitClick }) => {
  return (
    <div className="main-menu">
      <h1>Memory Matching Game (Animal) </h1>
      <h2> 7C / Kelompok 1: Anggun Jevian ( 20670077) , Bagas Hary S ( 20670017) , Juanda Santoso Eka P (20670010) </h2>
      <button onClick={onStartClick}>Start</button>
      <button onClick={onQuitClick}>Quit</button>
    </div>
  );
};

export default MainMenu;
