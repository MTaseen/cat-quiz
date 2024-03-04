import React, { useState } from 'react';

function Quiz({ options, correctAnswer, onAnswerSelect, questionNumber }) {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedAnswer(option);
    setShowFeedback(true);

    //5 Seconds delay to show result
    setTimeout(() => {
      onAnswerSelect(option);
      setSelectedAnswer('');
      setShowFeedback(false);
    }, 2000);
  };

  return (
    <div>
      <h2> Q{questionNumber} What breed is this cat?</h2>
      <ul>
        {options.map((option, index) => (
          <li key={index} onClick={() => handleOptionClick(option)}>
            {option}
          </li>
        ))}
      </ul>
      {showFeedback && (
        <p>{selectedAnswer === correctAnswer ? 'Correct!' : 'Incorrect!'}</p>
      )}
    </div>
  );
}

export default Quiz;
