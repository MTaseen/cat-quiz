import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CatImage from './CatImage'; // Importing CatImage component
import Quiz from './Quiz'; // Importing Quiz component

function CatQuiz() {
  const [catData, setCatData] = useState(null);
  const [quizOptions, setQuizOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');

  useEffect(() => {
    // Fetch random cat image and breed information
    axios.get('https://api.thecatapi.com/v1/images/search?limit=1', {
      headers: {
        'x-api-key': 'live_m7TgIOUiD4HrmB2kR8CBTHHeOKEZjpjYlQH7X3Dr3TdK5VlexVIuoDa5mr4yn8vF'
      }
    })
    .then(response => {
      const catData = response.data[0];
      setCatData(catData);
      // Fetch cat breeds
      axios.get('https://api.thecatapi.com/v1/breeds', {
        headers: {
          'x-api-key': 'live_m7TgIOUiD4HrmB2kR8CBTHHeOKEZjpjYlQH7X3Dr3TdK5VlexVIuoDa5mr4yn8vF'
        }
      })
      .then(response => {
        const breeds = response.data.map(breed => breed.name);
        // Shuffle the breeds array
        const shuffledBreeds = breeds.sort(() => Math.random() - 0.5);
        // Select the first four breeds as quiz options
        const quizOptions = shuffledBreeds.slice(0, 4);
        // Set the correct answer
        const correctAnswer = catData.breeds[0]?.name || '';
        setQuizOptions(quizOptions);
        setCorrectAnswer(correctAnswer);
      })
      .catch(error => {
        console.error('Error fetching cat breeds:', error);
      });
    })
    .catch(error => {
      console.error('Error fetching cat image:', error);
    });
  }, []);

  return (
    <div>
      {catData && (
        <div>
          {/* Render CatImage component */}
          <CatImage imageUrl={catData.url} />
          {/* Render Quiz component with options */}
          <Quiz options={quizOptions} correctAnswer={correctAnswer} />
        </div>
      )}
    </div>
  );
}

export default CatQuiz;
