const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.beginPath();
    context.arc(width / 2.30, height / 2, width * 0.1, 200, 0, Math.PI * 2, false);
    context.fillStyle = 'blue';
    context.fill();
    context.lineWidth = width * 0.05;
    context.strokeStyle = 'blue';
    context.stroke();

    context.beginPath();
    context.arc(width / 2, height / 2, width * 0.1, 200, 0, Math.PI * 2, false);
    context.fillStyle = 'yellow';
    context.fill();
    context.lineWidth = width * 0.05;
    context.strokeStyle = 'yellow';
    context.stroke();

    context.beginPath();
    context.arc(width / 1.75, height / 2, width * 0.1, 200, 0, Math.PI * 2, false);
    context.fillStyle = 'blue';
    context.fill()
    context.lineWidth = width * 0.05;
    context.strokeStyle = 'blue';
    context.stroke();
  };
};

canvasSketch(sketch, settings);
