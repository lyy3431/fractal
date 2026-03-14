import type { CanvasState } from '../../../types';

export function renderSierpinski(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  parameters: Record<string, any>,
  _canvasState: CanvasState
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const iterations = parameters.iterations || 6;

  // 清空画布
  ctx.fillStyle = '#010409';
  ctx.fillRect(0, 0, width, height);

  // 计算三角形顶点（等边三角形）
  const margin = 40;
  const size = Math.min(width, height) - 2 * margin;

  // 等边三角形的三个顶点
  const points = [
    { x: width / 2, y: margin }, // 顶部顶点
    { x: margin, y: margin + size }, // 左下顶点
    { x: width - margin, y: margin + size } // 右下顶点
  ];

  // Sierpinski 三角形颜色
  const colors = [
    '#00d9ff', // 青色
    '#ff00ff', // 品红
    '#ffff00', // 黄色
    '#00ff00', // 绿色
    '#ff6600', // 橙色
    '#ff0066', // 粉红
    '#6600ff', // 紫色
    '#0066ff'  // 蓝色
  ];

  function drawTriangle(p1: {x: number, y: number},
                        p2: {x: number, y: number},
                        p3: {x: number, y: number},
                        depth: number) {
    if (depth === 0) {
      // 使用渐变颜色
      const colorIndex = depth % colors.length;
      ctx!.fillStyle = colors[colorIndex];

      ctx!.beginPath();
      ctx!.moveTo(p1.x, p1.y);
      ctx!.lineTo(p2.x, p2.y);
      ctx!.lineTo(p3.x, p3.y);
      ctx!.closePath();
      ctx!.fill();
      return;
    }

    // 计算各边中点
    const mid1 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
    const mid2 = { x: (p2.x + p3.x) / 2, y: (p2.y + p3.y) / 2 };
    const mid3 = { x: (p3.x + p1.x) / 2, y: (p3.y + p1.y) / 2 };

    // 递归绘制三个子三角形
    drawTriangle(p1, mid1, mid3, depth - 1);
    drawTriangle(mid1, p2, mid2, depth - 1);
    drawTriangle(mid3, mid2, p3, depth - 1);
  }

  // 从最大的三角形开始绘制
  drawTriangle(points[0], points[1], points[2], iterations);
}
