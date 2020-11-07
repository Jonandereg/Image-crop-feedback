import React, { useRef, useEffect } from 'react';

interface ImageCropFeedbackProps {
  imageURL: string;
  top: number;
  left: number;
  right: number;
  bottom: number;
  onAreaSelect: (top: number, left: number, right: number, bottom: number) => void;
}

function ImageCropFeedback({ imageURL, top, left, right, bottom, onAreaSelect }: ImageCropFeedbackProps) {
  const myCanvas = useRef(null);

  const myImg = new Image();
  myImg.src = imageURL;

  function drawPicture() {
    if (myCanvas && myCanvas.current && myImg) {
      // @ts-ignore: Object is possibly 'null'.
      myCanvas.current.width = myImg.width;
      // @ts-ignore: Object is possibly 'null'.
      myCanvas.current.height = myImg.height;
      // @ts-ignore: Object is possibly 'null'.
      const ctx = myCanvas.current.getContext('2d');
      ctx.drawImage(myImg, 10, 10);
      ctx.strokeStyle = 'white';
      ctx.strokeRect(left, top, Math.abs(right - left), Math.abs(bottom - top));
    }
  }

  useEffect(drawPicture, [onAreaSelect]);
  let count = 0;

  return (
    <canvas
      ref={myCanvas}
      onClick={(e) => {
        if (myCanvas && myCanvas.current) {
          // @ts-ignore: Object is possibly 'null'.
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
      }}
    ></canvas>
  );
}

export default ImageCropFeedback;
