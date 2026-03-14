# 数学图形展示框架 (Fractal Viewer)

一个基于 React + TypeScript 的数学分形图形可视化框架。

## 技术栈

- **React 18** - 组件化开发
- **TypeScript** - 类型安全
- **Canvas API** - 高性能图形渲染
- **Vite** - 快速构建工具

## 项目结构

```
fractal/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── MainLayoutTabs.tsx   # 主布局组件（Tab 页形式）
│   │   │   └── MainLayout.tsx       # 旧三分区布局（保留）
│   │   ├── Tree/
│   │   │   └── ShapeTree.tsx        # 树形结构导航
│   │   ├── Info/
│   │   │   └── ShapeInfo.tsx        # 图形信息展示（支持 Markdown）
│   │   └── Canvas/
│   │       ├── FractalCanvas.tsx    # 画布容器
│   │       └── renderers/           # 渲染器（每个图形独立文件）
│   │           ├── mandelbrot.ts    # Mandelbrot 集
│   │           ├── julia.ts         # Julia 集
│   │           ├── sierpinski.ts    # Sierpinski 三角形
│   │           ├── newton.ts        # Newton 分形
│   │           ├── burningShip.ts   # Burning Ship 分形
│   │           ├── phoenix.ts       # Phoenix 分形
│   │           ├── sierpinskiCarpet.ts  # Sierpinski 地毯
│   │           ├── kochSnowflake.ts     # Koch 雪花
│   │           ├── cantorSet.ts         # Cantor 集
│   │           ├── apollonian.ts        # Apollonian 垫片
│   │           ├── hilbertCurve.ts      # Hilbert 曲线
│   │           ├── dragonCurve.ts       # Dragon 曲线
│   │           ├── goldenSpiral.ts      # 黄金螺旋
│   │           ├── lissajous.ts         # Lissajous 曲线
│   │           └── hTree.ts             # H 树
│   ├── data/
│   │   └── shapes.ts                # 图形数据和配置（所有图形）
│   ├── types/
│   │   └── index.ts                 # 类型定义
│   ├── hooks/
│   │   └── useFractalRender.ts      # 渲染逻辑 Hook
│   ├── App.tsx
│   └── main.tsx
├── index.html
└── package.json
```

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 已实现的 14 种图形

### 分形图形 (8 种)

| 图形 | 描述 | 交互 |
|------|------|------|
| **Mandelbrot 集** | 最著名的分形，复平面上的点集 | 缩放/平移 |
| **Julia 集** | 与 Mandelbrot 集相关，参数 c 可变 | 缩放/平移，参数调节 |
| **Newton 分形** | 牛顿法求 zⁿ=1 的根的分形可视化 | 缩放/平移，次数调节 |
| **Burning Ship** | 形似燃烧船只的分形 | 缩放/平移 |
| **Phoenix** | 凤凰羽翼状分形，p 参数可变 | 缩放/平移，参数调节 |
| **Sierpinski 地毯** | 正方形分形，面积为 0 周长无限 | 迭代次数 |
| **Koch 雪花** | 雪花状分形曲线 | 迭代次数，填充选项 |
| **Cantor 集** | 一维分形，测度为 0 的不可数集 | 迭代次数 |
| **Apollonian 垫片** | 圆填充分形，基于笛卡尔定理 | 迭代次数 |

### 曲线图形 (4 种)

| 图形 | 描述 | 交互 |
|------|------|------|
| **Hilbert 曲线** | 空间填充曲线，填满二维平面 | 迭代次数 |
| **Dragon 曲线** | 纸折龙形曲线，不自交 | 迭代次数 |
| **黄金螺旋** | 基于黄金比例φ的对数螺旋 | 圈数，显示矩形 |
| **Lissajous 曲线** | 两个垂直简谐运动的合成 | 频率 a/b，相位差 |

### 几何图形 (2 种)

| 图形 | 描述 | 交互 |
|------|------|------|
| **Sierpinski 三角形** | 经典三角形分形 | 迭代次数 |
| **H 树** | 芯片时钟分配网络用的分形树 | 迭代次数 |

## 功能特性

- **两栏布局**：左侧图形导航 + 右侧 Tab 页（图形显示/图形介绍）
- **树形导航**：三级分类结构，支持展开/折叠
- **Tab 切换**：图形显示和图形介绍独立展示，每部分内容有充足空间
- **Markdown 支持**：图形介绍支持 Markdown 格式（标题、列表、粗体、代码）
- **交互功能**：
  - 缩放和平移（针对复平面分形）
  - 参数调节面板（迭代次数、颜色、数学参数等）
  - 视图重置
- **多种颜色方案**：rainbow、fire、blue、grayscale 等
- **响应式设计**：自适应窗口大小
- **深色主题**：护眼深色界面

## 图形分类结构

```
数学图形库
├── 分形图形
│   ├── Mandelbrot 集
│   ├── Julia 集
│   ├── Newton 分形
│   ├── Burning Ship 分形
│   ├── Phoenix 分形
│   ├── Sierpinski 地毯
│   ├── Koch 雪花
│   ├── Cantor 集
│   └── Apollonian 垫片
├── 曲线图形
│   ├── Hilbert 曲线
│   ├── Dragon 曲线
│   ├── 黄金螺旋
│   └── Lissajous 曲线
└── 几何图形
    ├── Sierpinski 三角形
    └── H 树
```

## 扩展新图形

### 步骤

1. **创建渲染器**：在 `src/components/Canvas/renderers/` 创建新文件
   ```typescript
   import type { CanvasState } from '../../types';

   export function renderYourFractal(
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

2. **导出渲染器**：在 `renderers/index.ts` 中导出

3. **添加图形数据**：在 `src/data/shapes.ts` 的 `shapesData` 中添加节点

4. **添加参数配置**：在 `src/data/shapes.ts` 的 `parameterConfigs` 中添加配置

5. **集成到画布**：在 `FractalCanvas.tsx` 的 switch 语句中添加 case

6. **设置是否需要缩放**：如不需要缩放/平移，将图形 ID 添加到 `NO_ZOOM_PAN_IDS` 数组

## 键盘/鼠标操作

| 操作 | 复平面分形 | 几何/曲线图形 |
|------|-----------|--------------|
| 鼠标拖拽 | 平移视图 | 不支持 |
| 滚轮 | 缩放 | 不支持 |
| 参数调节 | 支持 | 支持 |

## 界面说明

- **左侧导航区** (280px) - 树形结构浏览图形分类
- **右侧主内容区** - Tab 页形式展示：
  - 📊 图形显示：渲染分形图形，支持交互（缩放、平移、参数调节）
  - 📖 图形介绍：显示图形的详细介绍和数学背景（支持 Markdown）
