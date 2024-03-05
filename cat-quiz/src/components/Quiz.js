import React, { useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';

function Quiz({ options, correctAnswer, onAnswerSelect, questionNumber }) {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedAnswer(option);
    setShowFeedback(true);

    //2 Seconds delay to show result
    setTimeout(() => {
      onAnswerSelect(option);
      setSelectedAnswer('');
      setShowFeedback(false);
    }, 2000);
  };

  return (
    <Box>
      <Typography variant="h2">Q{questionNumber} What breed is this cat?</Typography>
      <Grid container spacing={2} direction="column" alignItems="center">
        {options.map((option, index) => (
          <Grid item key={index}>
            <Button
              variant="outlined"
              sx={{
                width: '20rem',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '1.2rem',
                cursor: 'pointer',
              }}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </Button>
          </Grid>
        ))}
      </Grid>
      {showFeedback && (
        <Typography variant="body1">
          {selectedAnswer === correctAnswer ? 'Correct!' : 'Incorrect!'}
        </Typography>
      )}
    </Box>
  );
}

export default Quiz;
