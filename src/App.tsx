import React, { useState, useEffect, useRef } from 'react';

import './App.css';
import ImageCropFeedback from './components/imageCropper';

function App() {
  const tempCanvas = useRef<HTMLCanvasElement>(null);
  const [selectedArea, setSelectedArea] = useState({
    top: 200,
    left: 200,
    right: 300,
    bottom: 300,
  });
  const [croppedImgSrc, setCroppedImgSrc] = useState('');

  function onAreaSelect(top: number, left: number, right: number, bottom: number) {
    setSelectedArea({ top, left, right, bottom });
  }
  function cropSelect() {
    if (tempCanvas && tempCanvas.current) {
      const orgImg = new Image();
      orgImg.src = 'kitty.jpeg';
      const ctx = tempCanvas.current.getContext('2d');
      const selectedWidth = Math.abs(selectedArea.left - selectedArea.right);
      const selectedHeight = Math.abs(selectedArea.top - selectedArea.bottom);
      tempCanvas.current.width = selectedWidth;
      tempCanvas.current.height = selectedHeight;
      ctx?.drawImage(
        orgImg,
        selectedArea.left,
        selectedArea.top,
        selectedWidth,
        selectedHeight,
        0,
        0,
        selectedWidth,
        selectedHeight
      );
      setCroppedImgSrc(tempCanvas.current.toDataURL());
    }
  }
  useEffect(cropSelect, [!croppedImgSrc, selectedArea]);

  return (
    <div className="App">
      <ImageCropFeedback
        imageURL={'kitty.jpeg'}
        top={selectedArea.top}
        left={selectedArea.left}
        right={selectedArea.right}
        bottom={selectedArea.bottom}
        onAreaSelect={onAreaSelect}
      />
      <canvas ref={tempCanvas} className="hidden"></canvas>
      <div className="result">
        <p>
          <b>Result:</b>
        </p>
        <img src={croppedImgSrc}></img>
      </div>
    </div>
  );
}

export default App;
