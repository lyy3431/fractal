import type { CanvasState } from '../../../types';

/**
 * Sierpinski 地毯（Sierpinski Carpet）- 二维分形
 * 由波兰数学家 Wacław Sierpiński 于 1916 年提出
 * 构造方法：从正方形开始，将其分为 9 个小正方形，移除中心的，
 * 然后对其余 8 个正方形重复此过程
 */
export function renderSierpinskiCarpet(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  parameters: Record<string, any>,
  _canvasState: CanvasState
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const iterations = parameters.iterations || 5;
  const fillColor = parameters.fillColor || '#00d9ff';
  const bgColor = parameters.bgColor || '#010409';

  // 清空画布
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // 计算大小
  const margin = 40;
  const size = Math.min(width, height) - 2 * margin;
  const startX = (width - size) / 2;
  const startY = (height - size) / 2;

  ctx.fillStyle = fillColor;

  // 递归绘制地毯
  function drawCarpet(
    x: number,
    y: number,
    size: number,
    depth: number
  ) {
    if (depth === 0) {
      ctx!.fillRect(x, y, size, size);
      return;
    }

    const newSize = size / 3;

    // 绘制 8 个小正方形（跳过中心的）
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) continue; // 跳过中心

        drawCarpet(
          x + i * newSize,
          y + j * newSize,
          newSize,
          depth - 1
        );
      }
    }
  }

  drawCarpet(startX, startY, size, iterations);
}
