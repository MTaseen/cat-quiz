import React from 'react';
import { Box } from '@mui/material';

function CatImage({ imageUrl }) {
  return (
    <Box
      sx={{
        width: '20rem',
        height: '20rem',
      }}
    >
      <img
        src={imageUrl}
        alt="Cat"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
        }}
      />
    </Box>

  );
}

export default CatImage;
