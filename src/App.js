import React, { useState, useEffect } from 'react';
import './App.css';
import RestartButton from './RestartButton.js';
import MainMenu from './MainMenu';

const generateCards = () => {
  const symbols = ['banteng', 'burung', 'harimau', 'kudanil', 'ular', 'zebra'];
  const cards = symbols.concat(symbols);
  return cards.sort(() => Math.random() - 0.5);
};

const App = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [cards, setCards] = useState(generateCards());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);

  const handleStartClick = () => {
    setIsGameStarted(true);
  };

  const handleQuitClick = () => {
    console.log('Quit button clicked');
  };

  const handleBackToMainMenu = () => {
    setIsGameStarted(false);
    setScore(0);
  };

  const handleRestart = () => {
    const newCards = generateCards();
    setCards(newCards);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setScore(0);
  };

  const handleCardClick = (index) => {
    if (flippedIndices.length < 2 && !flippedIndices.includes(index) && !matchedPairs.includes(cards[index])) {
      setFlippedIndices([...flippedIndices, index]);
    }
  };

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard === secondCard) {
        setMatchedPairs([...matchedPairs, firstCard]);
        setScore(score + 1);
      }

      // Reset flippedIndices setelah sedikit penundaan untuk memberikan waktu bagi animasi
      setTimeout(() => setFlippedIndices([]), 1000);
    }
  }, [flippedIndices, cards, matchedPairs, score]);

  if (isGameStarted) {
    return (
      <div className="App">
        <h1 className="game-title">Memory Matching Game</h1>
        <p>Score: {score}</p>
        <RestartButton onClick={handleRestart} />
        <button className="back-button" onClick={handleBackToMainMenu}>
          <img src="/images/mainmenu-button.png" alt="Back to Main Menu" />
        </button>
        <div className="card-container">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`card ${flippedIndices.includes(index) || matchedPairs.includes(card) ? 'flipped' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              <div className="card-inner">
                {flippedIndices.includes(index) || matchedPairs.includes(card) ? (
                  <img
                    src={`images/${card}.png`}
                    alt={`Kartu ${card}`}
                    style={{ width: '75%', height: '75%', objectFit: 'contain' }}
                  />
                ) : (
                  <div className="card back">
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span>?</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <MainMenu
        onStartClick={handleStartClick}
        onQuitClick={handleQuitClick}
      />
    );
  }
};

export default App;
