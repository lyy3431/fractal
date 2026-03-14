import type { CanvasState } from '../../../types';

/**
 * Barnsley Fern - 巴恩斯利蕨类植物
 * 使用迭代函数系统 (IFS) 生成的分形蕨类植物
 * 由英国数学家 Michael Barnsley 提出
 *
 * 变换公式（概率选择）：
 * 1. f₁(x,y) = (0, 0.16y)                           概率 1%
 * 2. f₂(x,y) = (0.85x+0.04y, -0.04x+0.85y+1.6)     概率 85%
 * 3. f₃(x,y) = (0.2x-0.26y, 0.23x+0.22y+1.6)       概率 7%
 * 4. f₄(x,y) = (-0.15x+0.28y, 0.26x+0.24y+0.44)    概率 7%
 */
export function renderBarnsleyFern(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  parameters: Record<string, any>,
  _canvasState: CanvasState
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const iterations = parameters.iterations || 50000;
  const pointColor = parameters.pointColor || '#00ff00';
  const bgColor = parameters.bgColor || '#010409';

  // 清空画布
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // 计算中心和缩放
  const margin = 40;
  const centerX = width / 2;
  const centerY = height - margin;
  const scale = Math.min(width, height) / 11;

  // 设置像素颜色
  ctx.fillStyle = pointColor;

  // 初始点
  let x = 0;
  let y = 0;

  // 生成点
  for (let i = 0; i < iterations; i++) {
    const random = Math.random();
    let newX: number, newY: number;

    if (random < 0.01) {
      // 变换 1：茎
      newX = 0;
      newY = 0.16 * y;
    } else if (random < 0.86) {
      // 变换 2：主叶
      newX = 0.85 * x + 0.04 * y;
      newY = -0.04 * x + 0.85 * y + 1.6;
    } else if (random < 0.93) {
      // 变换 3：左下叶
      newX = 0.2 * x - 0.26 * y;
      newY = 0.23 * x + 0.22 * y + 1.6;
    } else {
      // 变换 4：右下叶
      newX = -0.15 * x + 0.28 * y;
      newY = 0.26 * x + 0.24 * y + 0.44;
    }

    x = newX;
    y = newY;

    // 映射到画布坐标（y 轴翻转）
    const plotX = centerX + x * scale;
    const plotY = centerY - y * scale;

    // 绘制点
    ctx.fillRect(plotX, plotY, 1, 1);
  }
}
