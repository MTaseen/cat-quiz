import React from 'react';

function CatImage({ imageUrl }) {
  return <img src={imageUrl} alt="Cat" className='cat-image'/>;
}

export default CatImage;
