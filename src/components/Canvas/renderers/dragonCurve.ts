import type { CanvasState } from '../../../types';

/**
 * Dragon 曲线（龙形曲线）- Heighway Dragon
 * 一种自相似分形曲线，由两个正交的线段迭代生成
 * 形状像一条盘绕的龙，因此得名
 *
 * 构造方法：使用 L-系统
 * 初始：FX
 * 规则：X → X+YF+, Y → -FX-Y
 * 其中 F=向前，+=右转 90 度，-=左转 90 度
 */
export function renderDragonCurve(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  parameters: Record<string, any>,
  _canvasState: CanvasState
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const iterations = parameters.iterations || 10;
  const lineColor = parameters.lineColor || '#ff6600';
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
  ctx.lineJoin = 'round';

  // 使用 L-系统生成 Dragon 曲线
  // 初始字符串
  let axiom = "FX";
  let str = axiom;

  // 迭代生成
  for (let i = 0; i < iterations; i++) {
    let next = "";
    for (let j = 0; j < str.length; j++) {
      const ch = str[j];
      if (ch === 'X') {
        next += 'X+YF+';
      } else if (ch === 'Y') {
        next += '-FX-Y';
      } else {
        next += ch;
      }
    }
    str = next;
  }

  // 计算步长：每次迭代曲线长度增加约 sqrt(2) 倍
  // 初始长度为 1，迭代 n 次后长度约为 2^(n/2)
  const segmentLength = size / Math.pow(1.5, iterations);

  // 解析字符串并记录路径
  const path: { x: number; y: number }[] = [{ x: 0, y: 0 }];
  let x = 0, y = 0;
  let dir = 0; // 0=右，1=上，2=左，3=下

  const dirs = [
    { dx: 1, dy: 0 },  // 右
    { dx: 0, dy: -1 }, // 上
    { dx: -1, dy: 0 }, // 左
    { dx: 0, dy: 1 }   // 下
  ];

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch === 'F') {
      x += dirs[dir].dx * segmentLength;
      y += dirs[dir].dy * segmentLength;
      path.push({ x, y });
    } else if (ch === '+') {
      dir = (dir + 1) % 4; // 右转 90 度
    } else if (ch === '-') {
      dir = (dir + 3) % 4; // 左转 90 度
    }
    // X 和 Y 只是占位符，跳过
  }

  // 计算边界
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const p of path) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  }

  // 计算缩放和平移，使曲线居中
  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;
  const scaleX = size / rangeX;
  const scaleY = size / rangeY;
  const scale = Math.min(scaleX, scaleY);

  const plotCenterX = (minX + maxX) / 2;
  const plotCenterY = (minY + maxY) / 2;

  // 绘制曲线
  ctx.beginPath();
  for (let i = 0; i < path.length; i++) {
    const px = centerX + (path[i].x - plotCenterX) * scale;
    const py = centerY + (path[i].y - plotCenterY) * scale;

    if (i === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }

  ctx.stroke();
}
