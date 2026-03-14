import type { CanvasState } from '../../../types';

/**
 * Butterfly Curve - 蝴蝶曲线
 * 由 Temple H. Fay 在 1989 年发现
 * 使用极坐标方程绘制的美丽曲线
 *
 * 极坐标方程：
 * r = e^(sin θ) - 2cos(4θ) + sin⁵((2θ-π)/24)
 */
export function renderButterflyCurve(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  parameters: Record<string, any>,
  _canvasState: CanvasState
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const loops = parameters.loops || 5;
  const lineColor = parameters.lineColor || '#ff00ff';
  const bgColor = parameters.bgColor || '#010409';
  const filled = parameters.filled === 'true' || parameters.filled === true;

  // 清空画布
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // 计算中心和缩放
  const margin = 60;
  const centerX = width / 2;
  const centerY = height / 2;
  const size = Math.min(width, height) - 2 * margin;
  const scale = size / 12;

  // 设置线条样式
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';

  // 生成蝴蝶曲线
  const steps = 10000;
  const maxTheta = loops * 2 * Math.PI;

  ctx.beginPath();

  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * maxTheta;

    // 蝴蝶曲线方程
    const r = Math.exp(Math.sin(theta))
            - 2 * Math.cos(4 * theta)
            + Math.pow(Math.sin((2 * theta - Math.PI) / 24), 5);

    // 转换为直角坐标
    const x = centerX + r * scale * Math.cos(theta);
    const y = centerY + r * scale * Math.sin(theta);

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  if (filled) {
    ctx.fillStyle = lineColor + '33';
    ctx.closePath();
    ctx.fill();
  }

  ctx.stroke();

  // 绘制中心点
  ctx.fillStyle = lineColor;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI);
  ctx.fill();

  // 绘制参数信息
  ctx.fillStyle = '#8b949e';
  ctx.font = '12px monospace';
  ctx.fillText(`圈数：${loops}`, margin, height - margin + 25);
}
