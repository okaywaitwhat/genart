const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const hexCount = random.rangeFloor(1, 6);
  const palette = random.shuffle(random.pick(palettes).slice(0, hexCount));

  const createGrid = () => {
    const points = [];
    const count = 40;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count - 1);
        const v = y / (count - 1);
        points.push({
          hex: random.pick(palette),
          rad: Math.abs(0.01 + random.gaussian() * 0.01),
          pos: [u, v],
        });
      }
    }
    return points;
  };

  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 300;

  console.log(points);
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach(({ rad, hex, pos: [u, v] }) => {
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, width - margin, v);

      context.beginPath();
      context.arc(x, y, rad * width, 0, Math.PI * 2, false);
      context.strokeStyle = 'black';
      context.lineWidth = 20;
      context.fillStyle = hex;
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
