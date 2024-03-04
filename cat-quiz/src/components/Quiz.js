import React, { useState, useEffect } from 'react';

function Quiz({ options, correctAnswer, onAnswerSelect }) {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleOptionClick = (option) => {
    setSelectedAnswer(option);
    onAnswerSelect(option);
  };

  useEffect(() => {
    // Trigger a re-render when the selected answer changes
  }, [selectedAnswer]);

  return (
    <div>
      <h2>What breed is this cat?</h2>
      <ul>
        {options.map((option, index) => (
          <li key={index} onClick={() => handleOptionClick(option)}>
            {option}
          </li>
        ))}
      </ul>
      {selectedAnswer && (
        <p>{selectedAnswer === correctAnswer ? 'Correct!' : 'Incorrect!'}</p>
      )}
    </div>
  );
}

export default Quiz;
