const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.beginPath();
    context.arc(width / 2, height / 2, 200, 0, Math.PI * 2, false);
    context.fillStyle = 'black';
    context.fill();
    context.stroke();

    context.beginPath();
    context.arc(width / 1.70, height / 2, 200, 0, Math.PI * 2, false);
    context.fillStyle = 'white';
    context.fill()
  };
};

canvasSketch(sketch, settings);
