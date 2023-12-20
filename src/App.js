import React, { useState, useEffect } from 'react';
import './App.css';
import RestartButton from './RestartButton.js';

const generateCards = () => {
  const symbols = ['banteng', 'burung', 'harimau', 'kudanil', 'ular', 'zebra'];
  const cards = symbols.concat(symbols); // Duplikat simbol untuk membuat pasangan
  return cards.sort(() => Math.random() - 0.5); // Acak urutan kartu
};

const App = () => {
  const [cards, setCards] = useState(generateCards());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  
  const handleRestart = () => {
    // Logika untuk mengacak ulang posisi kartu
    const newCards = generateCards();
    setCards(newCards);
    setFlippedIndices([]);
    setMatchedPairs([]);
  };

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedPairs([...matchedPairs, cards[firstIndex]]);
      }
      setTimeout(() => setFlippedIndices([]), 1000); // Reset kartu yang dibalik setelah 1 detik
    }
  }, [flippedIndices, cards, matchedPairs]);


  const handleCardClick = (index) => {
    if (flippedIndices.length < 5 && !flippedIndices.includes(index) && !matchedPairs.includes(cards[index])) {
      setFlippedIndices([...flippedIndices, index]);
    }
  };



  return (
    
<div className="App">
      <h1 className="game-title">Memory Matching Game</h1>
      <RestartButton onClick={handleRestart} />
      <div className="card-container">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${flippedIndices.includes(index) || matchedPairs.includes(card) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}>

   {flippedIndices.includes(index) || matchedPairs.includes(card) ? (
  <div className="card">
    <img
      src={`images/${card}.png`}
      alt={`Kartu ${card}`}
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  </div>
) : (
  <div className="card back">
    {/* Warna latar belakang ungu dan simbol "?" */}
    <div style={{ width: '100%', height: '100%', backgroundColor: 'purple', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>?</span>
    </div>
  </div>
)}

          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
