import React from 'react';
import './App.css';
import CatQuiz from './components/CatQuiz';
import { Box, Typography } from '@mui/material'

function App() {
  return (
    <Box className="App">
      <Typography variant="h2">Cat Quiz App</Typography>
      <CatQuiz />
    </Box>
  );
}

export default App;

