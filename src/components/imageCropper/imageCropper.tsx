import React, { useRef, useEffect, useState } from 'react';

interface ImageCropFeedbackProps {
  imageURL: string;
  top: number;
  left: number;
  right: number;
  bottom: number;
  onAreaSelect: (top: number, left: number, right: number, bottom: number) => void;
}

function ImageCropFeedback({ imageURL, top, left, right, bottom, onAreaSelect }: ImageCropFeedbackProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const myCanvas = useRef<HTMLCanvasElement>(null);
  const myImg = new Image();
  myImg.src = imageURL;

  myImg.onload = () => {
    setImgLoaded(true);
  };

  function drawPicture() {
    if (myCanvas && myCanvas.current && myImg.src) {
      myCanvas.current.width = myImg.width;
      myCanvas.current.height = myImg.height;
      const ctx = myCanvas.current.getContext('2d')!;
      ctx.drawImage(myImg, 0, 0);
      ctx.strokeStyle = 'white';
      ctx.strokeRect(left, top, Math.abs(right - left), Math.abs(bottom - top));
    }
  }
  useEffect(drawPicture, [imgLoaded, myImg]);

  let count = 0;
  function handleClick(e: React.MouseEvent<HTMLCanvasElement>) {
    if (myCanvas && myCanvas.current) {
      const offset = { x: myCanvas.current.offsetLeft, y: myCanvas.current.offsetTop };
      if (count === 0) {
        top = e.pageY - offset.y;
        left = e.pageX - offset.x;
        count++;
      } else {
        right = e.pageX - offset.x;
        bottom = e.pageY - offset.y;
        onAreaSelect(top, left, right, bottom);
        count = 0;
      }
    }
  }

  return <canvas ref={myCanvas} onClick={handleClick}></canvas>;
}

export default ImageCropFeedback;
