import type { CanvasState } from '../../../types';

const colorSchemes: Record<string, (t: number) => [number, number, number]> = {
  rainbow: (t) => {
    const r = Math.floor(128 + 127 * Math.sin(2 * Math.PI * t));
    const g = Math.floor(128 + 127 * Math.sin(2 * Math.PI * t + 2));
    const b = Math.floor(128 + 127 * Math.sin(2 * Math.PI * t + 4));
    return [r, g, b];
  },
  grayscale: (t) => {
    const v = Math.floor(255 * t);
    return [v, v, v];
  },
  blue: (t) => {
    return [Math.floor(50 * t), Math.floor(100 * t), Math.floor(255 * t)];
  },
  fire: (t) => {
    return [Math.floor(255 * t), Math.floor(100 * t), Math.floor(50 * t * t)];
  },
  ship: (t) => {
    return [Math.floor(255 * t * t), Math.floor(100 * t), Math.floor(200 * (1 - t))];
  }
};

/**
 * Burning Ship（燃烧船）分形
 * 类似于 Mandelbrot 集，但在迭代前对实部和虚部取绝对值
 * 迭代公式：zₙ₊₁ = zₙ² + c，其中 z 和 c 都是复数
 * 特殊之处：|Re(z)| 和 |Im(z)| 在平方前取绝对值
 */
export function renderBurningShip(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  parameters: Record<string, any>,
  canvasState: CanvasState
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const maxIterations = parameters.maxIterations || 200;
  const colorSchemeName = parameters.colorScheme || 'ship';
  const colorScheme = colorSchemes[colorSchemeName] || colorSchemes.ship;

  const aspectRatio = width / height;
  const viewHeight = 2.5 / canvasState.zoom;
  const viewWidth = viewHeight * aspectRatio;

  // 使用 canvasState 中的偏移量（不设置默认值，由组件管理）
  const minX = canvasState.offsetX - viewWidth / 2;
  const minY = canvasState.offsetY - viewHeight / 2;

  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  for (let px = 0; px < width; px++) {
    for (let py = 0; py < height; py++) {
      // 映射像素到复平面
      const cRe = minX + (px / width) * viewWidth;
      const cIm = minY + (py / height) * viewHeight;

      let zRe = 0;
      let zIm = 0;
      let iteration = 0;

      // Burning Ship 迭代
      while (zRe * zRe + zIm * zIm <= 4 && iteration < maxIterations) {
        // 取绝对值（这是与普通 Mandelbrot 的区别）
        const absRe = Math.abs(zRe);
        const absIm = Math.abs(zIm);

        // z² + c
        const newRe = absRe * absRe - absIm * absIm + cRe;
        const newIm = 2 * absRe * absIm + cIm;

        zRe = newRe;
        zIm = newIm;
        iteration++;
      }

      const idx = (py * width + px) * 4;

      if (iteration === maxIterations) {
        // 在集合内，显示黑色
        data[idx] = 0;
        data[idx + 1] = 0;
        data[idx + 2] = 0;
        data[idx + 3] = 255;
      } else {
        // 在集合外，根据迭代次数着色
        const t = iteration / maxIterations;
        const [r, g, b] = colorScheme(t);
        data[idx] = r;
        data[idx + 1] = g;
        data[idx + 2] = b;
        data[idx + 3] = 255;
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
}
