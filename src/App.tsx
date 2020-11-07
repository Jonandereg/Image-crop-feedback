import React, { useState, useEffect } from 'react';

import './App.css';
import ImageCropFeedback from './components/imageCropper';

function App() {
  const [selectedArea, setSelectedArea] = useState({
    selected: false,
    top: 0,
    left: 100,
    right: 400,
    bottom: 400,
  });
  function onAreaSelect(top: number, left: number, right: number, bottom: number) {
    setSelectedArea({ selected: true, top, left, right, bottom });
  }
  function testSelect() {
    if (selectedArea.selected) {
      console.log(selectedArea);
    }
  }
  useEffect(testSelect, [selectedArea]);

  return (
    <div className="App">
      <ImageCropFeedback
        imageURL={'https://placekitten.com/600/600'}
        top={selectedArea.top}
        left={selectedArea.left}
        right={selectedArea.right}
        bottom={selectedArea.bottom}
        onAreaSelect={onAreaSelect}
      />
    </div>
  );
}

export default App;
