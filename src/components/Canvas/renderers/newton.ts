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
  },
  roots: (t) => {
    // 根据 t 值返回不同的根颜色
    const colors: [number, number, number][] = [
      [255, 0, 0],    // 红
      [0, 255, 0],    // 绿
      [0, 0, 255],    // 蓝
      [255, 255, 0],  // 黄
    ];
    const idx = Math.floor(t * colors.length) % colors.length;
    return colors[idx];
  }
};

/**
 * Newton 分形 - 使用牛顿法求复数方程 z^n = 1 的根
 * 牛顿迭代公式：zₙ₊₁ = zₙ - f(zₙ)/f'(zₙ)
 * 对于 z^degree - 1 = 0，迭代公式为：zₙ₊₁ = zₙ - (zₙ^degree - 1)/(degree * zₙ^(degree-1))
 */
export function renderNewton(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  parameters: Record<string, any>,
  canvasState: CanvasState
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const degree = parameters.degree || 3;
  const maxIterations = parameters.maxIterations || 50;
  const tolerance = parameters.tolerance || 0.0001;
  const colorSchemeName = parameters.colorScheme || 'roots';
  const colorScheme = colorSchemes[colorSchemeName] || colorSchemes.roots;

  const aspectRatio = width / height;
  const viewHeight = 3 / canvasState.zoom;
  const viewWidth = viewHeight * aspectRatio;
  const minX = canvasState.offsetX - viewWidth / 2;
  const minY = canvasState.offsetY - viewHeight / 2;

  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  // 计算 degree 次单位根
  const roots: { re: number; im: number; color: [number, number, number] }[] = [];
  for (let k = 0; k < degree; k++) {
    const angle = (2 * Math.PI * k) / degree;
    roots.push({
      re: Math.cos(angle),
      im: Math.sin(angle),
      color: colorScheme(k / degree)
    });
  }

  for (let px = 0; px < width; px++) {
    for (let py = 0; py < height; py++) {
      // 映射像素到复平面
      let zRe = minX + (px / width) * viewWidth;
      let zIm = minY + (py / height) * viewHeight;

      let iteration = 0;
      let converged = false;

      // 牛顿迭代
      while (iteration < maxIterations) {
        // 计算 z^degree
        let powRe = 1;
        let powIm = 0;
        for (let i = 0; i < degree; i++) {
          const tempRe = powRe * zRe - powIm * zIm;
          const tempIm = powRe * zIm + powIm * zRe;
          powRe = tempRe;
          powIm = tempIm;
        }

        // f(z) = z^degree - 1
        const fRe = powRe - 1;
        const fIm = powIm;

        // f'(z) = degree * z^(degree-1)
        let derivRe = 1;
        let derivIm = 0;
        for (let i = 0; i < degree - 1; i++) {
          const tempRe = derivRe * zRe - derivIm * zIm;
          const tempIm = derivRe * zIm + derivIm * zRe;
          derivRe = tempRe;
          derivIm = tempIm;
        }
        derivRe *= degree;
        derivIm *= degree;

        // 牛顿迭代：z = z - f(z)/f'(z)
        const denom = derivRe * derivRe + derivIm * derivIm;
        if (denom < 1e-10) break;

        const deltaRe = (fRe * derivRe + fIm * derivIm) / denom;
        const deltaIm = (fIm * derivRe - fRe * derivIm) / denom;

        zRe -= deltaRe;
        zIm -= deltaIm;

        // 检查收敛
        if (zRe * zRe + zIm * zIm < 1e-10) break;

        // 检查是否收敛到某个根
        let minDist = Infinity;
        for (const root of roots) {
          const dist = (zRe - root.re) ** 2 + (zIm - root.im) ** 2;
          if (dist < tolerance) {
            converged = true;
            const t = iteration / maxIterations;
            const [r, g, b] = root.color;
            const idx = (py * width + px) * 4;
            data[idx] = Math.floor(r * t + 50 * (1 - t));
            data[idx + 1] = Math.floor(g * t + 50 * (1 - t));
            data[idx + 2] = Math.floor(b * t + 50 * (1 - t));
            data[idx + 3] = 255;
            break;
          }
          minDist = Math.min(minDist, dist);
        }

        if (converged) break;
        iteration++;
      }

      if (!converged) {
        const idx = (py * width + px) * 4;
        data[idx] = 20;
        data[idx + 1] = 20;
        data[idx + 2] = 30;
        data[idx + 3] = 255;
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
}
