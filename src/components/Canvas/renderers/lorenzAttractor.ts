import type { CanvasState } from '../../../types';

/**
 * Lorenz Attractor - 洛伦兹吸引子
 * 由美国气象学家 Edward Lorenz 在 1963 年发现
 * 是混沌理论的标志性图形，展示了"蝴蝶效应"
 *
 * 微分方程组：
 * dx/dt = σ(y - x)
 * dy/dt = x(ρ - z) - y
 * dz/dt = xy - βz
 *
 * 经典参数：σ=10, β=8/3, ρ=28
 */
export function renderLorenzAttractor(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  parameters: Record<string, any>,
  _canvasState: CanvasState
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const sigma = parameters.sigma !== undefined ? parameters.sigma : 10;
  const rho = parameters.rho !== undefined ? parameters.rho : 28;
  const beta = parameters.beta !== undefined ? parameters.beta : 8 / 3;
  const steps = parameters.steps || 10000;
  const dt = parameters.dt || 0.01;
  const lineColor = parameters.lineColor || '#ff6600';
  const bgColor = parameters.bgColor || '#010409';

  // 清空画布
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // 计算中心和缩放
  const margin = 60;
  const centerX = width / 2;
  const centerY = height / 2;

  // 设置线条样式
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 0.5;
  ctx.lineCap = 'round';

  // 初始值（从 (1, 1, 1) 开始，避免奇点）
  let x = 1;
  let y = 1;
  let z = 1;

  // 使用欧拉法积分（更简单，适合可视化）
  // 洛伦兹吸引子的经典范围：x,y 大约在 [-20, 20], z 大约在 [0, 50]
  const scale = Math.min(width, height) / 50;

  // 跳过初始的瞬态过程，让轨迹稳定
  const transient = 100;
  for (let i = 0; i < transient; i++) {
    const dx = sigma * (y - x) * dt;
    const dy = (x * (rho - z) - y) * dt;
    const dz = (x * y - beta * z) * dt;
    x += dx;
    y += dy;
    z += dz;
  }

  // 开始绘制
  ctx.beginPath();

  // 使用 xz 平面投影（从侧面看），这是最经典的视角
  // x 轴水平，z 轴垂直
  let plotX = centerX + x * scale;
  let plotY = centerY - (z - 25) * scale;
  ctx.moveTo(plotX, plotY);

  for (let i = 0; i < steps; i++) {
    // 欧拉法积分
    const dx = sigma * (y - x) * dt;
    const dy = (x * (rho - z) - y) * dt;
    const dz = (x * y - beta * z) * dt;

    x += dx;
    y += dy;
    z += dz;

    // 投影到 2D：使用 x 和 z 坐标
    plotX = centerX + x * scale;
    plotY = centerY - (z - 25) * scale;

    ctx.lineTo(plotX, plotY);
  }

  ctx.stroke();

  // 绘制参数信息
  ctx.fillStyle = '#8b949e';
  ctx.font = '12px monospace';
  ctx.fillText(`σ=${sigma}, ρ=${rho}, β=${beta.toFixed(2)}`, margin, height - margin + 25);
}
