# 教训与解决方案总结

## 1. 颜色方案回退问题（colorScheme fallback）

### 问题现象
显示完 Phoenix 或 Newton 分形后，再点击其他图形时窗口全黑。

### 根本原因
1. 当从一个图形切换到另一个图形时，`parameters.colorScheme` 保留了旧值（如 `'phoenix'`）
2. 目标渲染器的 `colorSchemes` 对象中没有定义该颜色方案
3. `colorSchemes['phoenix']` 返回 `undefined`，调用 `undefined(t)` 抛出错误，渲染失败

### 解决方案
在所有使用 colorSchemes 的渲染器中，添加安全回退：

```typescript
// 错误写法
const colorScheme = colorSchemes[parameters.colorScheme || 'default'];

// 正确写法
const colorSchemeName = parameters.colorScheme || 'default';
const colorScheme = colorSchemes[colorSchemeName] || colorSchemes.default;
```

### 涉及文件
- `mandelbrot.ts`
- `julia.ts`
- `newton.ts`
- `burningShip.ts`
- `phoenix.ts`

### 核心原则
**永远不要假设参数值一定存在于预定义集合中，始终提供安全回退。**

---

## 2. 图形切换时参数状态不同步问题

### 问题现象
切换图形后渲染使用的是旧图形的参数。

### 根本原因
React 的 `setState` 是异步的，当 `shape` 改变时：
1. `setParameters(shape.parameters)` 被调用
2. 但 `render()` 在 state 更新前就执行了
3. 此时 `parameters` 还是旧值

### 解决方案
修改 `FractalCanvas.tsx`：
1. `render` 函数接受可选参数：`render(renderParams?: Record<string, any>)`
2. 在 `useEffect` 中直接使用 `shape.parameters` 渲染：
```typescript
useEffect(() => {
  if (shape?.parameters) {
    render(shape.parameters);  // 立即使用新参数渲染
  } else {
    render();
  }
}, [shape, render]);
```

### 核心原则
**当 state 更新与渲染需要同步时，可以直接将值作为参数传递，避免等待异步 state 更新。**

---

## 3. 使用 `||` 运算符处理可能为 0 的参数值

### 问题现象
某些参数值为 0 时，默认值被错误应用。

### 根本原因
```typescript
// 错误：当 realC = 0 时，0 || -0.7 返回 -0.7
const cReal = parameters.realC || -0.7;
```

### 解决方案
```typescript
// 正确：显式检查 undefined
const cReal = parameters.realC !== undefined ? parameters.realC : -0.7;
```

### 核心原则
**对于可能为 0、false、空字符串的参数，永远不要用 `||` 做默认值检查，要用 `!== undefined`。**

---

## 4. Hilbert 曲线生成算法错误

### 问题现象
- 显示结果中有许多飞线（不连续的跳跃线）
- 或只显示在左下角一小部分

### 错误尝试
1. 第一次修复：递归划分四个象限，但方向逻辑错误，导致点序不连续
2. 第二次修复：使用互递归 A/B 函数，但旋转角度和起始位置计算错误

### 最终解决方案
使用 L-system 标准算法：
```typescript
// 公理：A
// 规则：A → -BF+AFA+FB-, B → +AF-BFB-FA+
// F=向前，+=右转 90 度，-=左转 90 度
```
生成路径后计算边界，然后居中显示。

### 核心原则
**分形曲线使用 L-system 算法最可靠，不要自己发明递归逻辑。**

---

## 5. Dragon 曲线生成算法错误

### 问题现象
显示的图形不是 Dragon 曲线的形状。

### 错误尝试
使用位运算生成转向序列，逻辑复杂且容易出错。

### 最终解决方案
使用 L-system 标准算法：
```typescript
// 初始：FX
// 规则：X → X+YF+, Y → -FX-Y
```

### 核心原则
**Dragon 曲线的标准生成方法是 L-system，不要使用复杂的位运算或递归旋转。**

---

## 6. Lissajous 曲线 lcm 函数问题

### 问题现象
当频率参数为小数时，曲线不闭合或显示异常。

### 根本原因
```typescript
// lcm 函数对小数会返回错误结果
function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}
```

### 解决方案
```typescript
function lcm(a: number, b: number): number {
  const intA = Math.round(a);
  const intB = Math.round(b);
  if (intA === 0 || intB === 0) return 1;
  return Math.abs(intA * intB) / gcd(intA, intB);
}
```

### 核心原则
**数学函数要考虑输入类型边界，lcm/gcd 只适用于整数。**

---

## 7. 黄金螺旋初始半径计算错误

### 问题现象
螺旋要么太小看不清，要么一出生就超出画布。

### 根本原因
使用固定初始半径 `size / 4`，没有根据圈数动态计算。

### 解决方案
根据黄金螺旋的对数特性反向计算：
```typescript
const b = 2 * Math.log(phi) / Math.PI;
const maxRadius = size / 2;
const totalAngle = turns * 2 * Math.PI;
const initialRadius = maxRadius / Math.exp(b * totalAngle);
```

### 核心原则
**对于指数增长的曲线，要从最终大小反推初始值。**

---

## 8. 参数改变后图形不更新问题

### 问题现象
用户修改背景颜色、线条颜色等参数后，图形显示没有发生变化。

### 根本原因
1. `handleParameterChange` 更新了 `parameters` state
2. 但 `useEffect` 的依赖项是 `[shape, render]`，只有 `shape` 改变时才触发渲染
3. 参数改变后没有触发重新渲染

### 解决方案
修改 `FractalCanvas.tsx`：
1. 将第一个 `useEffect` 的依赖项从 `[shape, render]` 改为 `[shape]`
2. 添加新的 `useEffect` 监听 `parameters` 变化：
```typescript
// shape 改变时重置参数并渲染
useEffect(() => {
  if (shape?.parameters) {
    setParameters(shape.parameters);
    render(shape.parameters);
  } else {
    render();
  }
}, [shape]);

// 参数改变时触发渲染
useEffect(() => {
  if (shape) {
    render();
  }
}, [parameters, shape]);
```

### 核心原则
**当用户可修改参数时，必须监听参数变化并触发重新渲染。**

---

## 9. 新增图形实现清单

### 已实现的新图形

1. **Barnsley Fern** - 巴恩斯利蕨类植物
   - 使用迭代函数系统 (IFS) 生成
   - 四个仿射变换按概率选择应用
   - 参数：迭代次数、点颜色、背景颜色

2. **Lorenz Attractor** - 洛伦兹吸引子
   - 混沌理论的标志性图形
   - 使用 RK4 方法积分三个微分方程
   - 参数：σ、ρ、β、步数、步长、颜色

3. **Butterfly Curve** - 蝴蝶曲线
   - 极坐标方程生成的美丽曲线
   - 形似展开翅膀的蝴蝶
   - 参数：圈数、颜色、填充

### 实现步骤
1. 在 `src/components/Canvas/renderers/` 创建新的渲染器文件
2. 在 `src/components/Canvas/renderers/index.ts` 导出新渲染器
3. 在 `FractalCanvas.tsx` 中导入并添加 switch case
4. 在 `shapes.ts` 添加图形数据和参数配置
5. 将新图形 ID 添加到 `NO_ZOOM_PAN_IDS` 数组

---

## 通用设计原则

### 1. 参数验证原则
```typescript
// 永远不要信任传入的参数
const validColorScheme = colorSchemes[params.colorScheme]
  ? params.colorScheme
  : 'default';
```

### 2. 状态同步原则
当 UI state 和渲染需要同步时：
- 优先使用直接传参
- 或者使用 `useEffect` 依赖触发

### 3. 数学算法原则
- 使用标准的、经过验证的算法（如 L-system）
- 不要自己发明复杂逻辑
- 对于分形曲线，L-system 是最可靠的选择

### 4. 边界处理原则
- 考虑参数为 0、负数、小数的情况
- 考虑除数为 0 的情况
- 考虑空数组/空字符串的情况

### 5. 居中显示原则
绘制任何图形时：
```typescript
// 1. 先生成原始坐标
// 2. 计算边界 (minX, maxX, minY, maxY)
// 3. 计算中心偏移
const offsetX = canvasCenterX - (minX + maxX) / 2;
const offsetY = canvasCenterY - (minY + maxY) / 2;
// 4. 应用偏移绘制
```

---

## 检查清单（新增图形时）

- [ ] 所有参数是否有默认值检查（考虑 0、false、空字符串）
- [ ] colorScheme 是否有安全回退
- [ ] 图形是否需要居中显示
- [ ] 数学计算是否有除零风险
- [ ] 是否使用了标准算法（而非自创逻辑）
- [ ] 切换图形时参数是否正确重置
