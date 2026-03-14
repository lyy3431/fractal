import type { CanvasState } from '../../../types';

// 辅助函数：计算最小公倍数（仅适用于整数）
function lcm(a: number, b: number): number {
  // 转换为整数
  const intA = Math.round(a);
  const intB = Math.round(b);
  if (intA === 0 || intB === 0) return 1;
  return Math.abs(intA * intB) / gcd(intA, intB);
}

function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return Math.abs(a);
}

/**
 * Lissajous 曲线（李萨如图形）- 参数曲线
 * 由两个相互垂直的简谐运动合成
 * 方程：x = A * sin(a * t + δ), y = B * sin(b * t)
 * 在示波器、音响设备中常见
 */
export function renderLissajous(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  parameters: Record<string, any>,
  _canvasState: CanvasState
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const a = parameters.a || 3;
  const b = parameters.b || 2;
  const phase = parameters.phase || Math.PI / 2;
  const lineColor = parameters.lineColor || '#00ff00';
  const bgColor = parameters.bgColor || '#010409';

  // 清空画布
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // 计算大小和中心
  const margin = 60;
  const centerX = width / 2;
  const centerY = height / 2;
  const radiusX = (width - 2 * margin) / 2;
  const radiusY = (height - 2 * margin) / 2;

  // 设置线条样式
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';

  // 绘制外框
  ctx.strokeStyle = '#30363d';
  ctx.lineWidth = 1;
  ctx.strokeRect(margin, margin, width - 2 * margin, height - 2 * margin);

  // 绘制坐标轴
  ctx.strokeStyle = '#21262d';
  ctx.beginPath();
  ctx.moveTo(centerX, margin);
  ctx.lineTo(centerX, height - margin);
  ctx.moveTo(margin, centerY);
  ctx.lineTo(width - margin, centerY);
  ctx.stroke();

  // 绘制 Lissajous 曲线
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 2.5;
  ctx.beginPath();

  // 计算周期：对于频率比 a:b，完整周期是 2π * lcm(a,b) / gcd(a,b)
  // 更简单的方法：使用足够大的范围确保曲线闭合
  const steps = 10000;
  const period = 2 * Math.PI * lcm(Math.round(a), Math.round(b));

  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * period;

    const x = centerX + radiusX * Math.sin(a * t + phase);
    const y = centerY + radiusY * Math.sin(b * t);

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.closePath();
  ctx.stroke();

  // 绘制参数信息
  ctx.fillStyle = '#8b949e';
  ctx.font = '14px monospace';
  ctx.fillText(`a = ${a}, b = ${b}, δ = ${(phase / Math.PI).toFixed(2)}π`, margin + 10, margin + 20);
}
