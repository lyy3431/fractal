import type { CanvasState } from '../../../types';

/**
 * Hilbert 曲线 - 空间填充曲线
 * 一种连续的分形曲线，可以填充整个二维平面
 * 由德国数学家 David Hilbert 于 1891 年发现
 */
export function renderHilbertCurve(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  parameters: Record<string, any>,
  _canvasState: CanvasState
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const iterations = parameters.iterations || 5;
  const lineColor = parameters.lineColor || '#00d9ff';
  const bgColor = parameters.bgColor || '#010409';

  // 清空画布
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // 计算大小
  const margin = 40;
  const size = Math.min(width, height) - 2 * margin;

  // 设置线条样式
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // 使用 Lindenmayer 系统（L-system）生成 Hilbert 曲线
  // 公理：A
  // 规则：A → -BF+AFA+FB-, B → +AF-BFB-FA+
  // F=向前，+=右转 90 度，-=左转 90 度

  let axiom = "A";
  let str = axiom;

  for (let i = 0; i < iterations; i++) {
    let next = "";
    for (let j = 0; j < str.length; j++) {
      const ch = str[j];
      if (ch === 'A') {
        next += '-BF+AFA+FB-';
      } else if (ch === 'B') {
        next += '+AF-BFB-FA+';
      } else {
        next += ch;
      }
    }
    str = next;
  }

  // 计算步长
  const steps = Math.pow(2, iterations);
  const segmentLength = size / steps;

  // 解析字符串并生成路径
  const points: { x: number; y: number }[] = [];
  let x = 0;
  let y = 0;
  let dir = 0; // 0=右，1=上，2=左，3=下

  // 方向向量
  const dirs = [
    { dx: 1, dy: 0 },   // 右
    { dx: 0, dy: -1 },  // 上
    { dx: -1, dy: 0 },  // 左
    { dx: 0, dy: 1 }    // 下
  ];

  points.push({ x, y });

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch === 'F') {
      x += dirs[dir].dx * segmentLength;
      y += dirs[dir].dy * segmentLength;
      points.push({ x, y });
    } else if (ch === '+') {
      dir = (dir + 1) % 4; // 右转 90 度
    } else if (ch === '-') {
      dir = (dir + 3) % 4; // 左转 90 度（相当于 -1 mod 4 = 3）
    }
    // A 和 B 只是占位符，跳过
  }

  // 计算边界
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const p of points) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  }

  // 居中显示
  const plotCenterX = width / 2 - (minX + maxX) / 2;
  const plotCenterY = height / 2 - (minY + maxY) / 2;

  // 绘制曲线
  ctx.beginPath();
  for (let i = 0; i < points.length; i++) {
    const px = plotCenterX + points[i].x;
    const py = plotCenterY + points[i].y;

    if (i === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }

  ctx.stroke();
}
