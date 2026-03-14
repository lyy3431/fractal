import type { CanvasState } from '../../../types';

/**
 * 黄金螺旋（Golden Spiral）- 对数螺旋的一种
 * 基于黄金比例 φ = (1 + √5) / 2 ≈ 1.618
 * 螺旋每旋转 90 度，半径增加 φ 倍
 * 在自然界中广泛存在：鹦鹉螺壳、向日葵种子排列等
 */
export function renderGoldenSpiral(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  parameters: Record<string, any>,
  _canvasState: CanvasState
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const turns = parameters.turns || 8;
  const lineColor = parameters.lineColor || '#ffd700';
  const bgColor = parameters.bgColor || '#010409';
  const showRectangles = parameters.showRectangles === 'true' || parameters.showRectangles === true;

  // 清空画布
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // 计算大小和中心
  const margin = 40;
  const size = Math.min(width, height) - 2 * margin;
  const centerX = width / 2;
  const centerY = height / 2;

  // 黄金比例
  const phi = (1 + Math.sqrt(5)) / 2;

  // 计算合适的初始半径，使得螺旋能填满整个区域
  // 黄金螺旋每转 2π 半径增加 phi^4 ≈ 6.85 倍
  // 要让螺旋从中心扩展到边缘，需要计算合适的起始半径
  const maxRadius = size / 2;
  const totalAngle = turns * 2 * Math.PI;
  const b = 2 * Math.log(phi) / Math.PI;
  const initialRadius = maxRadius / Math.exp(b * totalAngle);

  // 设置线条样式
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';

  // 绘制黄金矩形（可选）
  if (showRectangles) {
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
    ctx.lineWidth = 1;

    // 从最大的矩形开始
    let rectSize = maxRadius * 2;
    let x = centerX - rectSize / 2;
    let y = centerY - rectSize / 2;

    for (let i = 0; i < Math.floor(turns * 4) && rectSize > 2; i++) {
      ctx.strokeRect(x, y, rectSize, rectSize);

      // 计算下一个矩形
      rectSize = rectSize / phi;

      // 根据旋转方向调整位置
      const direction = i % 4;
      if (direction === 0) {
        x = x + rectSize;
      } else if (direction === 1) {
        y = y + rectSize;
      } else if (direction === 2) {
        // 位置和大小已经在上面调整
      } else {
        // 位置已经在上面调整
      }
    }
  }

  // 绘制黄金螺旋
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 2.5;
  ctx.beginPath();

  // 对数螺旋方程：r = a * e^(b * θ)
  // 对于黄金螺旋，b = 2 * ln(φ) / π
  const spiralB = 2 * Math.log(phi) / Math.PI;

  const startAngle = 0;
  const endAngle = turns * 2 * Math.PI;
  const step = 0.02;

  for (let theta = startAngle; theta <= endAngle; theta += step) {
    const r = initialRadius * Math.exp(spiralB * theta);
    const x = centerX + r * Math.cos(theta);
    const y = centerY + r * Math.sin(theta);

    if (theta === startAngle) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();

  // 绘制中心点
  ctx.fillStyle = lineColor;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI);
  ctx.fill();
}
