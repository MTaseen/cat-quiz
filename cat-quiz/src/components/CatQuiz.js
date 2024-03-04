import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CatImage from './CatImage';
import Quiz from './Quiz';

function CatQuiz() {
  const [catData, setCatData] = useState(null);
  const [quizOptions, setQuizOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');

  useEffect(() => {
    console.log('Effect hook triggered');
    axios.get('https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1', {
      headers: {
        'x-api-key': 'live_m7TgIOUiD4HrmB2kR8CBTHHeOKEZjpjYlQH7X3Dr3TdK5VlexVIuoDa5mr4yn8vF'
      }
    })
    .then(response => {
      const catData = response.data[0];
      console.log(catData.id);
      setCatData(catData);

      axios.get(`https://api.thecatapi.com/v1/images/${catData.id}`, {
        headers: {
          'x-api-key': 'live_m7TgIOUiD4HrmB2kR8CBTHHeOKEZjpjYlQH7X3Dr3TdK5VlexVIuoDa5mr4yn8vF'
        }
      })
      .then(response => {
        const breedName = response.data.breeds[0]?.name;
        console.log(breedName)

        axios.get('https://api.thecatapi.com/v1/breeds', {
          headers: {
            'x-api-key': 'live_m7TgIOUiD4HrmB2kR8CBTHHeOKEZjpjYlQH7X3Dr3TdK5VlexVIuoDa5mr4yn8vF'
          }
        })
        .then(response => {
          const breeds = response.data.map(breed => breed.name);
          const shuffledBreeds = breeds.sort(() => Math.random() - 0.5);
          const quizOptions = shuffledBreeds.slice(0, 3);
          quizOptions.push(breedName);

          const shuffledOptions = quizOptions.sort(() => Math.random() - 0.5);

          setQuizOptions(shuffledOptions);
          setCorrectAnswer(breedName);
          console.log('Breed of the cat:', breedName);
        })
        .catch(error => {
          console.error('Error fetching cat breeds:', error);
        });
      })
      .catch(error => {
        console.error('Error fetching cat image:', error);
      });
    })
    .catch(error => {
      console.error('Error fetching cat image:', error);
    });

    return () => {
      console.log('Component is unmounting');
    };

  }, []);

  return (
    <div>
      {catData && (
        <div>
          <CatImage imageUrl={catData.url} />
          <Quiz options={quizOptions} correctAnswer={correctAnswer} />
        </div>
      )}
    </div>
  );
}

export default CatQuiz;
