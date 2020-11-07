import React from 'react';

import './App.css';
import ImageCropFeedback from './components/imageCropper';

function App() {
  return (
    <div className="App">
      <ImageCropFeedback imageURL={'https://placekitten.com/600/600'} top={100} left={100} right={400} bottom={400} />
    </div>
  );
}

export default App;
