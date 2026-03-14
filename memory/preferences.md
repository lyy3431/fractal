# 用户偏好设置

## GitHub 推送

- **不要自动推送**：每次修改完代码后，不要自动推送到 GitHub
- **等待命令**：只有当用户明确下达推送命令后，才执行推送操作

## GitHub 账户信息

- 用户名：lyy3431
- 仓库：fractal
- 认证方式：gh CLI（已通过浏览器登录）
- 代理：http://localhost:7897（如需要）

---

# 推荐图形列表

## 分形类 (Fractals)

| 图形 | 描述 | 难度 |
|------|------|------|
| **Barnsley Fern** | 蕨类植物分形，用仿射变换生成，形态逼真 | ⭐ |
| **Pythagoras Tree** | 毕达哥拉斯树，基于正方形的递归分形 | ⭐⭐ |
| **Apollonian Gasket** | 阿波罗尼奥斯垫片，圆形填充分形 | ⭐⭐ |
| **Sierpinski Arrowhead** | 谢尔宾斯基箭头曲线，用 L-system 生成 | ⭐⭐ |
| **Menger Sponge** | 门格海绵，3D 版谢尔宾斯基地毯 | ⭐⭐⭐ |
| **Buddhabrot** | 佛系曼德勃罗，显示逃逸轨迹的密度 | ⭐⭐⭐ |

## 曲线类 (Curves)

| 图形 | 描述 | 难度 |
|------|------|------|
| **Peano Curve** | 皮亚诺曲线，最早的空间填充曲线 | ⭐⭐ |
| **Moser's Circle** | 莫瑟圆，圆上连线产生的意外分形 | ⭐⭐ |
| **Fibonacci Spiral** | 斐波那契螺旋，基于黄金矩形的螺旋 | ⭐ |
| **Villarceau Circles** | 维拉索圆环，环面切割产生的圆 | ⭐⭐ |
| **Butterfly Curve** | 蝴蝶曲线，参数方程生成的美丽曲线 | ⭐ |

## 混沌与吸引子 (Chaos & Attractors)

| 图形 | 描述 | 难度 |
|------|------|------|
| **Lorenz Attractor** | 洛伦兹吸引子，著名的蝴蝶效应 | ⭐⭐ |
| **Rössler Attractor** | 罗斯勒吸引子，简单而优美的混沌系统 | ⭐⭐ |
| **Hénon Map** | 埃农映射，二维离散混沌系统 | ⭐⭐ |
| **Barnsley Fern IFS** | 使用迭代函数系统生成的蕨类 | ⭐⭐ |

## 几何与镶嵌 (Geometry & Tessellation)

| 图形 | 描述 | 难度 |
|------|------|------|
| **Penrose Tiling** | 彭罗斯镶嵌，非周期性平面镶嵌 | ⭐⭐⭐ |
| **Voronoi Diagram** | 维诺图，空间划分的美丽图案 | ⭐⭐ |
| **Delaunay Triangulation** | 德劳内三角剖分，与维诺图对偶 | ⭐⭐ |
| **Spirograph** | 万花尺曲线，经典的儿童玩具 | ⭐ |

## 优先级推荐

### 最推荐先实现的 3 个（已完成）：
1. **Barnsley Fern** - 代码简单，效果惊艳，能很好地展示分形与自然的联系 ✅
2. **Lorenz Attractor** - 混沌理论的经典，动态效果非常迷人 ✅
3. **Butterfly Curve** - 参数方程简单，但可以调节很多参数，互动性强 ✅

### 挑战更复杂的：
- **Buddhabrot** - 需要大量采样，但效果比 Mandelbrot 更震撼
- **Penrose Tiling** - 数学深度很高，可以展示非周期性镶嵌的奥秘

---

# 已实现图形

## 分形图形
- Barnsley Fern (巴恩斯利蕨类) - IFS 迭代函数系统
- Butterfly Curve (蝴蝶曲线) - 极坐标方程
- Lorenz Attractor (洛伦兹吸引子) - 混沌系统，三体问题
