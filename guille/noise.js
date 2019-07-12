const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [2048, 2048],
};

random.setSeed(random.getRandomSeed());
console.log(random.getSeed());

const sketch = () => {
  const colorCount = random.rangeFloor(1, 7);
  const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);

  const createGrid = () => {
    const points = [];
    const count = 30;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.1;
        points.push({
          color: random.pick(palette),
          rotation: random.noise2D(u, v),
          radius,
          position: [u, v],
        });
      }
    }
    return points;
  };

  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 400;

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach((data) => {
      const { color, position, radius, rotation } = data;

      const [u, v] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.save();
      if (radius > 0.045) {
        // dibujo un circulo
        context.beginPath();
        context.arc(x, y, (radius * width) / 3, 0, Math.PI * 2, false); // trazo el circulo
        if (random.gaussian() < 0.75) {
          // circulo vacio
          context.strokeStyle = color;
          context.lineWidth = 2;
          context.stroke();
        } else {
          // circulo lleno
          context.fillStyle = color;
          context.fill();
        }
      } else {
        // dibujo un cuadrado
        context.fillStyle = color;
        context.font = `${radius * width}px "Helvetica"`;
        context.translate(x, y);
        context.text = 10;
        context.rotate(rotation);
        context.fillText('😌', 0, 0);
      }
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
