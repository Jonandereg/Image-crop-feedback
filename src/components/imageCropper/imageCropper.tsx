import React, { useRef, useEffect } from 'react';

interface ImageCropFeedbackProps {
  imageURL: string;
  top: number;
  left: number;
  right: number;
  bottom: number;
}

function ImageCropFeedback({ imageURL, top, left, right, bottom }: ImageCropFeedbackProps) {
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
      ctx.strokeRect(top, left, right - left, bottom - top);
    }
  }
  useEffect(drawPicture, []);

  return <canvas ref={myCanvas}></canvas>;
}

export default ImageCropFeedback;
