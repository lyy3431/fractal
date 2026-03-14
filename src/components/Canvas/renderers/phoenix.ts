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
  phoenix: (t) => {
    return [Math.floor(255 * t), Math.floor(50 + 200 * t), Math.floor(200 + 55 * (1 - t))];
  }
};

/**
 * Phoenix 分形
 * 类似于 Mandelbrot 集，但添加了一个额外的参数 p
 * 迭代公式：zₙ₊₁ = zₙ² + c + p * zₙ₋₁
 * 这个额外的项使得分形呈现出类似凤凰翅膀的复杂结构
 */
export function renderPhoenix(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  parameters: Record<string, any>,
  canvasState: CanvasState
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const maxIterations = parameters.maxIterations || 150;
  const colorSchemeName = parameters.colorScheme || 'phoenix';
  const colorScheme = colorSchemes[colorSchemeName] || colorSchemes.phoenix;
  const pReal = parameters.pReal !== undefined ? parameters.pReal : -0.5;
  const pImag = parameters.pImag !== undefined ? parameters.pImag : 0.5;

  const aspectRatio = width / height;
  const viewHeight = 3 / canvasState.zoom;
  const viewWidth = viewHeight * aspectRatio;
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
      let prevRe = 0;
      let prevIm = 0;
      let iteration = 0;

      // Phoenix 迭代：zₙ₊₁ = zₙ² + c + p * zₙ₋₁
      while (zRe * zRe + zIm * zIm <= 4 && iteration < maxIterations) {
        const newRe = zRe * zRe - zIm * zIm + cRe + pReal * prevRe - pImag * prevIm;
        const newIm = 2 * zRe * zIm + cIm + pReal * prevIm + pImag * prevRe;

        prevRe = zRe;
        prevIm = zIm;
        zRe = newRe;
        zIm = newIm;
        iteration++;
      }

      const idx = (py * width + px) * 4;

      if (iteration === maxIterations) {
        data[idx] = 0;
        data[idx + 1] = 0;
        data[idx + 2] = 0;
        data[idx + 3] = 255;
      } else {
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
