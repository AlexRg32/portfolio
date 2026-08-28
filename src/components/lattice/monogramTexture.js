import { AR_PATHS } from '../../data/monogram';

/**
 * Rasterises the real AR monogram into a tiling texture. The lattice is not a
 * generic pattern: it is the studio signature, repeated as a printing plate.
 */
export function drawMonogramTile(size = 512, cells = 4) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const cell = size / cells;
  const glyphWidth = cell * 0.52;
  const scale = glyphWidth / 120;
  const glyphHeight = 100 * scale;

  ctx.clearRect(0, 0, size, size);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = Math.max(1, size / 340);
  ctx.lineCap = 'butt';
  ctx.lineJoin = 'miter';

  const paths = AR_PATHS.map((d) => new Path2D(d));

  for (let row = 0; row < cells; row += 1) {
    for (let column = 0; column < cells; column += 1) {
      // Offset alternate rows: a typesetter's stagger, not a plain grid.
      const offset = row % 2 === 0 ? 0 : cell / 2;
      const x = column * cell + (cell - glyphWidth) / 2 + offset;
      const y = row * cell + (cell - glyphHeight) / 2;
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      paths.forEach((path) => ctx.stroke(path));
      ctx.restore();

      // Registration tick between glyphs.
      ctx.save();
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      const tx = column * cell + offset;
      const ty = row * cell;
      ctx.moveTo(tx - 4, ty);
      ctx.lineTo(tx + 4, ty);
      ctx.moveTo(tx, ty - 4);
      ctx.lineTo(tx, ty + 4);
      ctx.stroke();
      ctx.restore();
    }
  }

  return canvas;
}
