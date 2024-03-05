import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CatImage from './CatImage';
import Quiz from './Quiz';
import { Box, Typography, Grid } from '@mui/material';


function CatQuiz() {
  const [catData, setCatData] = useState(null);
  const [quizOptions, setQuizOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const fetchNewQuestion = useCallback(() => {
    // Fetch random cat image and breed information
    axios.get('https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1')
      .then(response => {
        const catData = response.data[0];

        setCatData(catData);

        axios.get(`https://api.thecatapi.com/v1/images/${catData.id}`)
          .then(response => {

            const catDataBreed = response.data;
            if (catDataBreed.breeds.length !== 1) {
              
              fetchNewQuestion();
              return;
            } else {
            const breedName = response.data.breeds[0]?.name;
            setCorrectAnswer(breedName);
            setQuizOptions([]);
            }
          })
          .catch(error => console.error('Error fetching breed details:', error));
      })
      .catch(error => console.error('Error fetching cat image:', error));
  }, []);

  useEffect(() => {
    fetchNewQuestion();
    const savedQuestionNumber = parseInt(localStorage.getItem('currentQuestionIndex'));
    if (!isNaN(savedQuestionNumber)) {
      setCurrentQuestionIndex(savedQuestionNumber);
    }
    const savedCorrectCount = parseInt(localStorage.getItem('correctCount'));
    if (!isNaN(savedCorrectCount)) {
      setCorrectCount(savedCorrectCount);
    }
        window.addEventListener('storage', handleStorageChange);

        return () => {
          window.removeEventListener('storage', handleStorageChange);
        };
  }, [currentQuestionIndex, fetchNewQuestion]);

  const handleAnswerSelect = (selectedBreed) => {
    const isCorrect = selectedBreed === correctAnswer;
    setCorrectCount(prevCount => prevCount + (selectedBreed === correctAnswer ? 1 : 0));
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setCorrectAnswer('');
    localStorage.setItem('correctCount', correctCount + (isCorrect ? 1 : 0));
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex + 1);
  };
  
  const handleStorageChange = (event) => {
    if (event.key === 'currentQuestionIndex') {
      // Retrieve and parse the updated question number from localStorage
      const updatedQuestionIndex = parseInt(event.newValue);
      if (!isNaN(updatedQuestionIndex)) {
        // Update the component state with the updated question number
        setCurrentQuestionIndex(updatedQuestionIndex);
      }
    } else if (event.key === 'correctCount') {
      // Retrieve and parse the updated correct count from localStorage
      const updatedCorrectCount = parseInt(event.newValue);
      if (!isNaN(updatedCorrectCount)) {
        // Update the component state with the updated correct count
        setCorrectCount(updatedCorrectCount);
      }
    }
  };

  useEffect(() => {
    // Fetch cat breeds and set quiz options when correctAnswer changes
    if (correctAnswer) {
      axios.get('https://api.thecatapi.com/v1/breeds')
        .then(response => {
          const breeds = response.data.map(breed => breed.name);
          const shuffledBreeds = breeds.sort(() => Math.random() - 0.5);
          const newQuizOptions = shuffledBreeds.slice(0, 3);
          
          newQuizOptions.push(correctAnswer);
          const shuffledOptions = newQuizOptions.sort(() => Math.random() - 0.5);
          
          setQuizOptions(shuffledOptions);
        })
        .catch(error => console.error('Error fetching cat breeds:', error));
    }
  }, [correctAnswer]);

  return (
    <Box sx={{ flexDirection: 'down', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {catData && (
        <Box sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Grid item xs={12}>
          <Typography variant="h6">Score: {correctCount} of {currentQuestionIndex} ({((correctCount / currentQuestionIndex) * 100).toFixed(2)}% correct)</Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ borderRadius: '8px', border: '1px solid #ccc'}}>
              <CatImage imageUrl={catData.url} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <div className="answers-list">
              <Quiz options={quizOptions} correctAnswer={correctAnswer} onAnswerSelect={handleAnswerSelect} questionNumber={currentQuestionIndex + 1} />
            </div>
          </Grid>
        </Box>
      )}
    </Box>

  );
}

export default CatQuiz;
