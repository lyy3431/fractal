# Fractal - 数学图形展示框架

一个用于可视化和探索数学图形的 React 应用，支持多种分形和曲线图形的交互式展示。

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![React](https://img.shields.io/badge/React-18.x-61dafb)
![Vite](https://img.shields.io/badge/Vite-6.x-646cff)

## 功能特点

- **14 种数学图形**：涵盖分形、曲线、几何三大类
- **交互式探索**：支持缩放、平移、参数调节
- **响应式设计**：自适应不同屏幕尺寸
- **深色主题**：舒适的视觉体验
- **类型安全**：完整的 TypeScript 类型定义

## 图形分类

### 分形图形 (Fractals)
- Mandelbrot 集 - 经典的分形图形
- Julia 集 - 可调节复数参数
- Burning Ship - 船形分形
- Newton - 牛顿法分形
- Phoenix - 凤凰分形
- Sierpinski - 谢尔宾斯基三角形
- Sierpinski Carpet - 谢尔宾斯基地毯
- Sierpinski Pyramid - 谢尔宾斯基金字塔

### 曲线图形 (Curves)
- Hilbert Curve - 希尔伯特空间填充曲线
- Dragon Curve - 龙形曲线
- Lissajous - 李萨如图形
- Golden Spiral - 黄金螺旋

### 几何图形 (Geometry)
- Koch Snowflake - 科赫雪花
- Pythagoras Tree - 毕达哥拉斯树

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 查看效果。

### 构建生产版本

```bash
npm run build
```

## 技术栈

- **React 18** - 组件化架构
- **TypeScript** - 类型安全
- **Canvas API** - 高性能 2D 渲染
- **Vite** - 快速构建工具

## 架构设计

```
src/
├── components/
│   ├── Layout/
│   │   └── MainLayout.tsx       # 三分区布局
│   ├── Tree/
│   │   └── ShapeTree.tsx        # 树形导航
│   ├── Info/
│   │   └── ShapeInfo.tsx        # 图形介绍
│   └── Canvas/
│       ├── FractalCanvas.tsx    # 画布组件
│       └── renderers/           # 渲染器目录
├── data/
│   └── shapes.ts                # 图形配置
├── types/
│   └── index.ts                 # 类型定义
└── hooks/
    └── useFractalRender.ts      # 渲染 Hook
```

## 添加新图形

1. 在 `src/components/Canvas/renderers/` 创建新的渲染器文件
2. 在 `src/data/shapes.ts` 添加图形配置
3. 在 `src/types/index.ts` 添加类型定义（如需要）

示例渲染器：

```typescript
export function renderMyShape(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  parameters: Record<string, any>,
  canvasState: CanvasState
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 实现渲染逻辑
}
```

## 经验总结

本项目在开发过程中遇到并解决了多个典型问题，包括：
- 颜色方案回退问题
- React 状态同步问题
- 参数默认值处理陷阱
- 分形曲线算法选择

详细的经验总结请参阅 [memory/lessons-learned.md](memory/lessons-learned.md)

## License

MIT
