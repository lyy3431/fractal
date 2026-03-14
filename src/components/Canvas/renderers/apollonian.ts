import type { CanvasState } from '../../../types';

/**
 * Apollonian 垫片（Apollonian Gasket）- 圆填充分形
 * 基于笛卡尔定理：四个相互外切的圆的曲率满足特定关系
 * 从三个相互外切的圆开始，不断填充新的内切圆
 */
export function renderApollonian(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  parameters: Record<string, any>,
  _canvasState: CanvasState
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const iterations = parameters.iterations || 4;
  const bgColor = parameters.bgColor || '#010409';

  // 清空画布
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // 计算大小和中心
  const margin = 20;
  const size = Math.min(width, height) - 2 * margin;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = size / 2;

  // 颜色方案
  const colors = [
    '#ff6b6b',
    '#4ecdc4',
    '#ffe66d',
    '#95e1d3',
    '#f38181',
    '#aa96da',
    '#fcbad3',
    '#a8d8ea'
  ];

  // 圆的类型
  interface Circle {
    x: number;
    y: number;
    r: number;
    curvature: number; // 1/r
  }

  // 初始三个圆（相互外切，内切于大圆）
  const r0 = radius * (2 * Math.sqrt(3) - 3) / 3; // 小圆半径
  const d = r0 + r0; // 小圆中心到中心的距离

  const initialCircles: Circle[] = [
    { x: centerX, y: centerY - d, r: r0, curvature: 1 / r0 },
    { x: centerX - d * Math.sin(Math.PI / 3), y: centerY + d * Math.cos(Math.PI / 3), r: r0, curvature: 1 / r0 },
    { x: centerX + d * Math.sin(Math.PI / 3), y: centerY + d * Math.cos(Math.PI / 3), r: r0, curvature: 1 / r0 }
  ];

  // 外边界圆（内切）
  const boundaryCircle: Circle = {
    x: centerX,
    y: centerY,
    r: radius,
    curvature: -1 / radius // 负曲率表示外切圆
  };

  const allCircles: Circle[] = [];

  // 笛卡尔定理：给定三个相互外切的圆，求第四个切圆的曲率
  // (k1 + k2 + k3 + k4)² = 2(k1² + k2² + k3² + k4²)
  function findFourthCurvature(k1: number, k2: number, k3: number): [number, number] {
    const sum = k1 + k2 + k3;
    const discriminant = 2 * (k1 * k1 + k2 * k2 + k3 * k3) - sum * sum;
    if (discriminant < 0) return [0, 0];
    const sqrtDisc = Math.sqrt(discriminant);
    return [sum + sqrtDisc, sum - sqrtDisc];
  }

  // 简化的递归填充
  function fillCircle(
    c1: Circle,
    c2: Circle,
    c3: Circle,
    depth: number
  ) {
    if (depth > iterations) return;

    const [k4a, k4b] = findFourthCurvature(c1.curvature, c2.curvature, c3.curvature);

    // 选择新的圆（不是已有的那个）
    const k4 = Math.max(k4a, k4b);
    if (k4 <= 0) return;

    const r4 = 1 / k4;
    if (r4 < 2) return; // 太小的圆跳过

    // 简化：使用三个圆的质心作为新圆心的近似
    const weight1 = c1.curvature / (c1.curvature + c2.curvature + c3.curvature);
    const weight2 = c2.curvature / (c1.curvature + c2.curvature + c3.curvature);
    const weight3 = c3.curvature / (c1.curvature + c2.curvature + c3.curvature);

    const x = weight1 * c1.x + weight2 * c2.x + weight3 * c3.x;
    const y = weight1 * c1.y + weight2 * c2.y + weight3 * c3.y;

    const newCircle: Circle = { x, y, r: r4, curvature: k4 };

    // 检查是否已经存在
    for (const c of allCircles) {
      const dist = Math.sqrt((c.x - x) ** 2 + (c.y - y) ** 2);
      if (dist < Math.abs(c.r - r4) * 0.5) return;
    }

    allCircles.push(newCircle);

    // 递归填充
    fillCircle(c1, c2, newCircle, depth + 1);
    fillCircle(c2, c3, newCircle, depth + 1);
    fillCircle(c3, c1, newCircle, depth + 1);
  }

  // 添加初始圆
  initialCircles.forEach(c => allCircles.push(c));

  // 开始填充
  fillCircle(initialCircles[0], initialCircles[1], initialCircles[2], 2);

  // 绘制所有圆
  for (let i = 0; i < allCircles.length; i++) {
    const circle = allCircles[i];
    ctx!.strokeStyle = colors[i % colors.length];
    ctx!.lineWidth = Math.max(1, 2 - iterations * 0.2);

    ctx!.beginPath();
    ctx!.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
    ctx!.stroke();
  }

  // 绘制外边界
  ctx!.strokeStyle = '#ffffff';
  ctx!.lineWidth = 2;
  ctx!.beginPath();
  ctx!.arc(boundaryCircle.x, boundaryCircle.y, radius, 0, 2 * Math.PI);
  ctx!.stroke();
}
