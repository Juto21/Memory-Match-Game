import React, { useState, useEffect } from 'react';
import './App.css';

const generateCards = () => {
  const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cards = symbols.concat(symbols); // Duplicate symbols to create pairs
  return cards.sort(() => Math.random() - 0.5); // Shuffle the cards
};

const App = () => {
  const [cards, setCards] = useState(generateCards());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedPairs([...matchedPairs, cards[firstIndex]]);
      }
      setTimeout(() => setFlippedIndices([]), 1000); // Reset flipped cards after 1 second
    }
  }, [flippedIndices, cards, matchedPairs]);

  const handleCardClick = (index) => {
    if (flippedIndices.length < 2 && !flippedIndices.includes(index) && !matchedPairs.includes(cards[index])) {
      setFlippedIndices([...flippedIndices, index]);
    }
  };

  return (
    <div className="App">
      <h1>Memory Matching Game</h1>
      <div className="card-container">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${flippedIndices.includes(index) || matchedPairs.includes(card) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            {flippedIndices.includes(index) || matchedPairs.includes(card) ? card : '?'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

