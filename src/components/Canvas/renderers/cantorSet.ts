import type { CanvasState } from '../../../types';

/**
 * Cantor 集（Cantor Set）- 一维分形
 * 由德国数学家 Georg Cantor 于 1883 年提出
 * 构造方法：从一条线段开始，移除中间 1/3，然后对剩余的两段重复此过程
 * 是一个不可数的无穷集，但测度为 0
 */
export function renderCantorSet(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  parameters: Record<string, any>,
  _canvasState: CanvasState
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const iterations = parameters.iterations || 6;
  const lineColor = parameters.lineColor || '#ff66ff';
  const bgColor = parameters.bgColor || '#010409';

  // 清空画布
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // 计算大小
  const margin = 40;
  const lineWidth = width - 2 * margin;
  const lineHeight = (height - 2 * margin) / iterations;

  ctx.fillStyle = lineColor;

  // 递归绘制 Cantor 集
  function drawCantor(
    x: number,
    y: number,
    width: number,
    height: number,
    depth: number
  ) {
    if (depth === 0) {
      ctx!.fillRect(x, y, width, height);
      return;
    }

    const newWidth = width / 3;

    // 绘制左右两段
    drawCantor(x, y, newWidth, height, depth - 1);
    drawCantor(x + 2 * newWidth, y, newWidth, height, depth - 1);
  }

  // 从顶部开始绘制每一层
  for (let i = 0; i <= iterations; i++) {
    const y = margin + i * lineHeight;
    const h = Math.min(lineHeight * 0.8, 20);

    if (i === 0) {
      // 初始线段
      ctx.fillRect(margin, y, lineWidth, h);
    } else {
      drawCantor(margin, y, lineWidth, h, i);
    }
  }
}
