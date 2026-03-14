import type { CanvasState } from '../../../types';

/**
 * Koch 雪花（Koch Snowflake）- 经典分形曲线
 * 由瑞典数学家 Helge von Koch 于 1904 年提出
 * 构造方法：从等边三角形开始，每条边中间 1/3 处向外突出一个等边三角形
 * 无限迭代后形成雪花状的分形边界
 */
export function renderKochSnowflake(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  parameters: Record<string, any>,
  _canvasState: CanvasState
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const iterations = parameters.iterations || 4;
  const lineColor = parameters.lineColor || '#00ffff';
  const bgColor = parameters.bgColor || '#010409';
  const filled = parameters.filled || false;

  // 清空画布
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // 计算大小
  const margin = 40;
  const size = Math.min(width, height) - 2 * margin;

  // 等边三角形的顶点
  const centerX = width / 2;
  const topY = margin + size / 4;
  const bottomY = margin + size * 3 / 4;
  const halfWidth = size / 2;

  // 初始三角形的三个顶点（逆时针）
  const p1 = { x: centerX, y: topY };
  const p2 = { x: centerX - halfWidth, y: bottomY };
  const p3 = { x: centerX + halfWidth, y: bottomY };

  // Koch 曲线生成函数
  function kochCurve(
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    depth: number
  ): { x: number; y: number }[] {
    if (depth === 0) {
      return [p1, p2];
    }

    // 计算三等分点
    const dx = (p2.x - p1.x) / 3;
    const dy = (p2.y - p1.y) / 3;

    const q1 = { x: p1.x + dx, y: p1.y + dy };
    const q3 = { x: p1.x + 2 * dx, y: p1.y + 2 * dy };

    // 计算突出点 q2（将中间段旋转 60 度）
    const angle = -Math.PI / 3; // -60 度
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    const midDx = dx;
    const midDy = dy;

    const q2 = {
      x: q1.x + midDx * cosA - midDy * sinA,
      y: q1.y + midDx * sinA + midDy * cosA
    };

    // 递归生成四段
    const segments: { x: number; y: number }[] = [];
    segments.push(...kochCurve(p1, q1, depth - 1).slice(0, -1));
    segments.push(...kochCurve(q1, q2, depth - 1).slice(0, -1));
    segments.push(...kochCurve(q2, q3, depth - 1).slice(0, -1));
    segments.push(...kochCurve(q3, p2, depth - 1));

    return segments;
  }

  // 生成三条边的点
  const points1 = kochCurve(p1, p2, iterations);
  const points2 = kochCurve(p2, p3, iterations);
  const points3 = kochCurve(p3, p1, iterations);

  // 合并所有点
  const allPoints = [...points1.slice(0, -1), ...points2.slice(0, -1), ...points3];

  // 绘制
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 1.5;
  ctx.lineJoin = 'miter';

  if (filled) {
    ctx.fillStyle = lineColor + '33'; // 添加透明度
    ctx.beginPath();
    ctx.moveTo(allPoints[0].x, allPoints[0].y);
    for (let i = 1; i < allPoints.length; i++) {
      ctx.lineTo(allPoints[i].x, allPoints[i].y);
    }
    ctx.closePath();
    ctx.fill();
  }

  ctx.beginPath();
  ctx.moveTo(allPoints[0].x, allPoints[0].y);
  for (let i = 1; i < allPoints.length; i++) {
    ctx.lineTo(allPoints[i].x, allPoints[i].y);
  }
  ctx.closePath();
  ctx.stroke();
}
