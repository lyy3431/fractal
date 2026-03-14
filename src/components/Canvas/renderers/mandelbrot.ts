import type { CanvasState } from '../../../types';

// 颜色方案
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
  }
};

export function renderMandelbrot(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  parameters: Record<string, any>,
  canvasState: CanvasState
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const maxIterations = parameters.maxIterations || 100;
  const colorSchemeName = parameters.colorScheme || 'rainbow';
  const colorScheme = colorSchemes[colorSchemeName] || colorSchemes.rainbow;

  // 计算视图范围
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
      const x0 = minX + (px / width) * viewWidth;
      const y0 = minY + (py / height) * viewHeight;

      let x = 0;
      let y = 0;
      let iteration = 0;

      // Mandelbrot 迭代：z = z² + c
      while (x * x + y * y <= 4 && iteration < maxIterations) {
        const xTemp = x * x - y * y + x0;
        y = 2 * x * y + y0;
        x = xTemp;
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
