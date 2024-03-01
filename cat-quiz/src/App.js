import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CatQuiz() {
  const [catImageUrl, setCatImageUrl] = useState('');
  const [quizOptions, setQuizOptions] = useState([]);

  useEffect(() => {
    // Fetch cat image and breed information
    axios.get('https://api.thecatapi.com/v1/images/search', {
      headers: {
        'x-api-key': 'live_m7TgIOUiD4HrmB2kR8CBTHHeOKEZjpjYlQH7X3Dr3TdK5VlexVIuoDa5mr4yn8vF'
      }
    })
    .then(response => {
      const catData = response.data[0];
      setCatImageUrl(catData.url);

      // Fetch cat breeds
      axios.get('https://api.thecatapi.com/v1/breeds', {
        headers: {
          'x-api-key': 'live_m7TgIOUiD4HrmB2kR8CBTHHeOKEZjpjYlQH7X3Dr3TdK5VlexVIuoDa5mr4yn8vF'
        }
      })
      .then(response => {
        const breeds = response.data.map(breed => breed.name);
        setQuizOptions(breeds);
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
      {/* Display cat image */}
      <img src={catImageUrl} alt="Cat" />

      {/* Render quiz options */}
      <ul>
        {quizOptions.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    </div>
  );
}

export default CatQuiz;
