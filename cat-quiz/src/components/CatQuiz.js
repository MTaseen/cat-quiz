import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CatImage from './CatImage';
import Quiz from './Quiz';

function CatQuiz() {
  const [catData, setCatData] = useState(null);
  const [quizOptions, setQuizOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    fetchNewQuestion();
  }, [currentQuestionIndex]);

  const fetchNewQuestion = () => {
    // Fetch random cat image and breed information
    axios.get('https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1')
      .then(response => {
        const catData = response.data[0];
        setCatData(catData);

        axios.get(`https://api.thecatapi.com/v1/images/${catData.id}`)
          .then(response => {
            const breedName = response.data.breeds[0]?.name;
            setCorrectAnswer(breedName);
            setQuizOptions([]); // Clear previous quiz options
          })
          .catch(error => console.error('Error fetching breed details:', error));
      })
      .catch(error => console.error('Error fetching cat image:', error));
  };

  const handleAnswerSelect = (selectedBreed) => {
    console.log('Answer selected:', selectedBreed);
    if (selectedBreed === correctAnswer) {
      // If the answer is correct, fetch a new question
      setCurrentQuestionIndex(prevIndex => {
        console.log('Previous index:', prevIndex);
        return prevIndex + 1;
      });
      setCorrectAnswer(''); // Reset correct answer
      console.log('Correct answer selected. Fetching new question...');
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
          newQuizOptions.push(correctAnswer); // Add the correct answer as an option
          setQuizOptions(newQuizOptions);
        })
        .catch(error => console.error('Error fetching cat breeds:', error));
    }
  }, [correctAnswer]);

  return (
    <div>
      {catData && (
        <div>
          <CatImage imageUrl={catData.url} />
          <Quiz options={quizOptions} correctAnswer={correctAnswer} onAnswerSelect={handleAnswerSelect} />
        </div>
      )}
    </div>
  );
}

export default CatQuiz;
