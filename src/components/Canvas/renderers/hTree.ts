import type { CanvasState } from '../../../types';

/**
 * H 树（H-Tree）- 分形树结构
 * 由重复的 H 形图案组成，每次迭代在四个端点添加更小的 H
 * 在集成电路设计中用于时钟分配网络
 */
export function renderHTree(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  parameters: Record<string, any>,
  _canvasState: CanvasState
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const iterations = parameters.iterations || 5;
  const lineColor = parameters.lineColor || '#00ff88';
  const bgColor = parameters.bgColor || '#010409';

  // 清空画布
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // 计算大小和中心
  const margin = 40;
  const size = Math.min(width, height) - 2 * margin;
  const centerX = width / 2;
  const centerY = height / 2;

  // 设置线条样式
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';

  // 绘制 H
  function drawH(x: number, y: number, size: number, depth: number) {
    if (depth === 0 || size < 2) {
      // 绘制当前的 H
      const h = size / 2;
      const w = size / 2;

      ctx!.beginPath();
      // 左边竖线
      ctx!.moveTo(x - w / 2, y - h / 2);
      ctx!.lineTo(x - w / 2, y + h / 2);
      // 右边竖线
      ctx!.moveTo(x + w / 2, y - h / 2);
      ctx!.lineTo(x + w / 2, y + h / 2);
      // 中间横线
      ctx!.moveTo(x - w / 2, y);
      ctx!.lineTo(x + w / 2, y);
      ctx!.stroke();
      return;
    }

    // 绘制当前的 H
    const h = size / 2;
    const w = size / 2;

    ctx!.beginPath();
    // 左边竖线
    ctx!.moveTo(x - w / 2, y - h / 2);
    ctx!.lineTo(x - w / 2, y + h / 2);
    // 右边竖线
    ctx!.moveTo(x + w / 2, y - h / 2);
    ctx!.lineTo(x + w / 2, y + h / 2);
    // 中间横线
    ctx!.moveTo(x - w / 2, y);
    ctx!.lineTo(x + w / 2, y);
    ctx!.stroke();

    // 递归在四个端点绘制更小的 H
    const newSize = size / 2;
    drawH(x - w / 2, y - h / 2, newSize, depth - 1);
    drawH(x - w / 2, y + h / 2, newSize, depth - 1);
    drawH(x + w / 2, y - h / 2, newSize, depth - 1);
    drawH(x + w / 2, y + h / 2, newSize, depth - 1);
  }

  drawH(centerX, centerY, size, iterations);
}
