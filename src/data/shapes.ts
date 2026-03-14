import type { ShapeNode, ParameterConfig } from '../types';

// 图形数据配置
export const shapesData: ShapeNode = {
  id: 'root',
  name: '数学图形库',
  description: '探索数学世界中的美丽图形',
  children: [
    {
      id: 'fractals',
      name: '分形图形',
      description: '具有自相似性的复杂几何图形',
      children: [
        {
          id: 'mandelbrot',
          name: 'Mandelbrot 集',
          description: `## Mandelbrot 集 - 分形之王

### 历史背景

Mandelbrot 集是最著名、最美丽的分形图形，由法国裔美国数学家 **Benoit Mandelbrot** 在 1980 年代初期发现并命名。Mandelbrot 被称为"分形几何之父"，他在 IBM 工作期间使用计算机首次可视化了这个神奇的图形。

### 数学定义

Mandelbrot 集是在复平面上定义的点集。对于每个复数 c，我们从 z = 0 开始进行如下迭代：

**zₙ₊₁ = zₙ² + c**

如果迭代过程中 z 的模（绝对值）始终保持有界（不会趋向无穷大），则复数 c 属于 Mandelbrot 集。

### 视觉特征

Mandelbrot 集的形状像一个心脏线（主心形体）周围环绕着无数个大小不一的圆形"气泡"。其主要特征包括：

- **主心形体**：中心的大型心脏形状区域
- **周期气泡**：沿着边界分布的圆形区域
- **丝状结构**：从主形体延伸出的细长丝线
- **微型 Mandelbrot**：在边界处存在无数个缩小版的完整 Mandelbrot 集

### 自相似性

Mandelbrot 集最迷人的特性是**自相似性**：放大边界的任何部分，都会发现新的、复杂的结构。理论上，放大可以无限进行，永远有新的细节出现。

### 探索提示

- 滚动鼠标滚轮可以放大/缩小
- 拖拽鼠标可以平移视图
- 增加"最大迭代次数"可以看到更精细的结构`,
          parameters: {
            maxIterations: 100,
            colorScheme: 'rainbow'
          }
        },
        {
          id: 'julia',
          name: 'Julia 集',
          description: `## Julia 集 - 复平面上的艺术

### 历史背景

Julia 集以法国数学家 **Gaston Julia** 的名字命名，他在 1918 年首次研究这类分形图形。Julia 在一战期间（1914-1918）就开始研究这个课题，当时他在法国军队服役并失去了鼻子。尽管身受重伤，他仍然坚持数学研究。

### 数学定义

Julia 集与 Mandelbrot 集密切相关，都基于相同的迭代公式：

**zₙ₊₁ = zₙ² + c**

但两者的定义方式不同：
- **Mandelbrot 集**：c 是变量，z 从 0 开始
- **Julia 集**：c 是固定参数，z 是变量

对于给定的复数参数 c，Julia 集定义为：所有使得迭代保持有界的初始值 z₀ 的集合。

### 与 Mandelbrot 集的关系

Mandelbrot 集实际上可以看作是"所有 Julia 集的索引"：
- 当 c 在 Mandelbrot 集内部时，对应的 Julia 集是连通的
- 当 c 在 Mandelbrot 集外部时，对应的 Julia 集是不连通的"尘埃"
- 当 c 在 Mandelbrot 集边界上时，Julia 集呈现出最复杂的分形结构

### 探索提示

- 调节"实部 (Re)"和"虚部 (Im)"来改变参数 c
- 尝试 c = 0（产生完美的圆形）
- 尝试较大的 c 值（产生尘埃状结构）`,
          parameters: {
            realC: -0.7,
            imagC: 0.27015,
            maxIterations: 100,
            colorScheme: 'fire'
          }
        },
        {
          id: 'newton',
          name: 'Newton 分形',
          description: `## Newton 分形 - 方程求根的可视化

### 历史背景

Newton 分形基于**牛顿迭代法**，这是由艾萨克·牛顿在 17 世纪提出的求解方程近似根的方法。当将牛顿法应用于复数多项式方程时，产生的收敛区域边界形成了美丽的分形图案。

### 数学定义

对于方程 f(z) = 0，牛顿迭代公式为：

**zₙ₊₁ = zₙ - f(zₙ) / f'(zₙ)**

本实现中，我们求解 **zⁿ = 1** 的根（n 次单位根）。这些根在复平面上均匀分布在单位圆上。

### 视觉特征

- **彩色区域**：每个颜色代表收敛到不同的根
- **分形边界**：不同颜色区域之间的边界呈现无限复杂的自相似结构
- **对称性**：图形具有 n 重旋转对称性

### 数学意义

Newton 分形展示了：
- 初始条件的敏感依赖性（混沌理论的标志）
- 相邻的初始点可能收敛到完全不同的根
- 边界上的点可能永远不收敛

### 探索提示

- 改变"多项式次数"可以看到不同数量的根
- 较高的次数产生更复杂的图案
- 放大颜色交界处可以看到精细的分形结构`,
          parameters: {
            degree: 3,
            maxIterations: 50,
            tolerance: 0.0001,
            colorScheme: 'roots'
          }
        },
        {
          id: 'burning-ship',
          name: 'Burning Ship 分形',
          description: `## Burning Ship 分形 - 燃烧的船只

### 历史背景

Burning Ship 分形由 Michel Michelitsch 和 Otto E. Rössler 于 1992 年发现。因其形状像一艘着火的船只而得名，是 Mandelbrot 集的一个"表亲"。

### 数学定义

Burning Ship 分形的迭代公式与 Mandelbrot 集相似，但有一个关键区别：

**zₙ₊₁ = (|Re(zₙ)| + i|Im(zₙ)|)² + c**

在平方之前，对实部和虚部都取绝对值。这个简单的修改产生了完全不同的图形。

### 视觉特征

- **船体形状**：主体部分像一艘船的轮廓
- **火焰效果**：顶部的分形结构像燃烧的火焰
- **尖锐边界**：与 Mandelbrot 集的圆润不同，Burning Ship 有尖锐的边缘

### 探索提示

- 默认视图聚焦在"船"的主体部分
- 放大"火焰"区域可以看到精美的分形细节
- 调整迭代次数可以获得更清晰的图像`,
          parameters: {
            maxIterations: 200,
            colorScheme: 'ship'
          }
        },
        {
          id: 'phoenix',
          name: 'Phoenix 分形',
          description: `## Phoenix 分形 - 凤凰涅槃

### 历史背景

Phoenix 分形是分形图形中的"后来者"，由日本研究者在 1990 年代发现。因其形状类似神话中凤凰的翅膀和尾羽而得名。

### 数学定义

Phoenix 分形是 Mandelbrot 集的推广，添加了一个额外的参数 p：

**zₙ₊₁ = zₙ² + c + p · zₙ₋₁**

这个额外的"记忆项"p · zₙ₋₁ 使得系统具有二阶动力学，产生了独特的羽翼状结构。

### 视觉特征

- **羽翼图案**：曲线和漩涡形似凤凰的羽毛
- **不对称性**：与 Mandelbrot 集的对称性不同，Phoenix 通常是不对称的
- **多样性**：不同的 p 值产生完全不同的图案

### 参数影响

- **p = 0**：退化为普通的 Mandelbrot 集
- **p ≈ 0.5**：产生典型的"凤凰"图案
- **p ≈ 1**：图形变得高度扭曲

### 探索提示

- 调节"实部 p"和"虚部 p"观察图形变化
- 某些 p 值会产生类似 Mandelbrot 的结构
- 其他 p 值则产生完全不同的图案`,
          parameters: {
            pReal: -0.5,
            pImag: 0.5,
            maxIterations: 150,
            colorScheme: 'phoenix'
          }
        },
        {
          id: 'sierpinski-carpet',
          name: 'Sierpinski 地毯',
          description: `## Sierpinski 地毯 - 平面分形

### 历史背景

Sierpinski 地毯由波兰数学家 **Wacław Sierpiński** 于 1916 年提出，是他研究的多个分形图形之一。这个图形可以看作是 Sierpinski 三角形在二维平面上的推广。

### 构造方法

1. 从一个实心正方形开始
2. 将其分为 3×3 = 9 个相等的小正方形
3. 移除中心的小正方形
4. 对剩余的 8 个小正方形重复步骤 2-3
5. 无限重复这个过程

### 数学特性

- **分形维数**：log(8)/log(3) ≈ 1.893
- **面积极限**：经过无限次迭代后，面积趋近于 0
- **周长**：趋向无穷大
- **自相似性**：整体由 8 个缩小版的自身组成

### 与 Cantor 集的关系

Sierpinski 地毯可以看作是两个 Cantor 集的笛卡尔积，展示了分形在不同维度上的表现。

### 实际应用

- **天线设计**：Sierpinski 地毯天线可以在多个频段工作
-**图像压缩**：基于分形的压缩算法
- **教学工具**：展示分形维数的概念

### 探索提示

- 较高的迭代次数显示更精细的结构
- 注意每次迭代后正方形数量按 8ⁿ 增长`,
          parameters: {
            iterations: 5,
            fillColor: '#00d9ff',
            bgColor: '#010409'
          }
        },
        {
          id: 'koch-snowflake',
          name: 'Koch 雪花',
          description: `## Koch 雪花 - 第一朵数学雪花

### 历史背景

Koch 雪花由瑞典数学家 **Helge von Koch** 于 1904 年提出，是最早被描述的分形曲线之一。它提供了一种构造"处处连续但处处不可导"曲线的方法。

### 构造方法

1. 从一个等边三角形开始
2. 将每条边三等分
3. 以中间的线段为底，向外作一个等边三角形
4. 移除底边
5. 对新图形的所有边重复步骤 2-4
6. 无限重复这个过程

### 数学特性

- **周长**：每次迭代后周长变为原来的 4/3 倍，趋向无穷大
- **面积**：收敛于初始三角形面积的 8/5 倍
- **分形维数**：log(4)/log(3) ≈ 1.262
- **对称性**：六重旋转对称

### 数学意义

Koch 雪花展示了：
- 有限面积可以包围无限周长
- 连续曲线可以没有切线（处处不可导）
- 分形维数可以是分数

### 实际应用

- **计算机图形学**：生成逼真的雪花和海岸线
- **天线设计**：Koch 雪花天线具有多频特性
- **教学**：展示分形概念的经典例子

### 探索提示

- 迭代次数越高，雪花越精细
- 4-5 次迭代通常能显示良好的细节
- 填充模式可以看到完整的雪花形状`,
          parameters: {
            iterations: 4,
            lineColor: '#00ffff',
            bgColor: '#010409',
            filled: false
          }
        },
        {
          id: 'cantor-set',
          name: 'Cantor 集',
          description: `## Cantor 集 - 最简单的分形

### 历史背景

Cantor 集由德国数学家 **Georg Cantor** 于 1883 年提出，他是集合论的创始人。Cantor 集虽然结构简单，但包含了深刻的数学概念。

### 构造方法

1. 从一条线段开始（通常长度为 1）
2. 移除中间的 1/3 部分
3. 对剩余的两条线段重复步骤 2
4. 无限重复这个过程

### 数学特性

- **基数**：与实数集等势（不可数无穷）
- **测度**：勒贝格测度为 0
- **分形维数**：log(2)/log(3) ≈ 0.631
- **自相似性**：由两个缩小版的自身组成

### 数学悖论

Cantor 集展示了一个看似矛盾的事实：
- 它包含无穷多个点（实际上是不可数无穷）
- 但它的总长度却是 0

### 数学意义

Cantor 集是许多数学概念的"反例工厂"：
- 非空集合但测度为 0
- 完备但不连通
- 紧致但"稀疏"

### 探索提示

- 每一层显示一次迭代的结果
- 观察线段数量如何按 2ⁿ 增长
- 观察总长度如何按 (2/3)ⁿ 减小`,
          parameters: {
            iterations: 6,
            lineColor: '#ff66ff',
            bgColor: '#010409'
          }
        },
        {
          id: 'apollonian',
          name: 'Apollonian 垫片',
          description: `## Apollonian 垫片 - 圆的分形舞蹈

### 历史背景

Apollonian 垫片基于古希腊数学家 Apollonius of Perga 研究的切圆问题。1998 年，数学家证明了 Apollonian 垫片中的圆数量是可数无穷的。

### 构造方法

1. 从三个相互外切的圆开始
2. 找到与这三个圆都相切的第四个圆（有两个解）
3. 对新形成的空隙重复步骤 2
4. 无限重复这个过程

### 笛卡尔定理

四个相互外切的圆的曲率（曲率 = 1/半径）满足：

**(k₁ + k₂ + k₃ + k₄)² = 2(k₁² + k₂² + k₃² + k₄²)**

这个优美的公式可以用来计算新圆的曲率。

### 数学特性

- **圆数量**：可数无穷
- **填充密度**：趋近于 100%
- **自相似性**：在任何尺度下都有相似的结构
- **对称性**：取决于初始三个圆的排列

### 视觉特征

- 彩色圆环形成美丽的镶嵌图案
- 越靠近边界，圆越小、越密集
- 整体呈现出一种和谐的秩序感

### 探索提示

- 迭代次数决定可见的圆的数量
- 较高的迭代次数显示更小的细节圆
- 观察圆的大小如何迅速减小`,
          parameters: {
            iterations: 4,
            bgColor: '#010409'
          }
        }
      ]
    },
    {
      id: 'curves',
      name: '曲线图形',
      description: '优美的数学曲线',
      children: [
        {
          id: 'hilbert-curve',
          name: 'Hilbert 曲线',
          description: `## Hilbert 曲线 - 填满空间的线

### 历史背景

Hilbert 曲线由德国数学家 **David Hilbert** 于 1891 年发现，是一种**空间填充曲线**。这个发现震惊了数学界：一条一维的线竟然可以填满整个二维平面！

### 构造方法

Hilbert 曲线通过递归方式构造：
1. 从一个 U 形线段开始
2. 在每个迭代步骤，将曲线缩小并复制 4 份
3. 旋转并连接这些副本，形成更大一级的 U 形
4. 无限重复这个过程

### 数学特性

- **空间填充**：极限情况下经过平面上每一点
- **连续性**：曲线是连续的
- **不可导**：处处没有切线
- **分形维数**：2（填满二维空间）

### 实际应用

- **数据索引**：将二维数据映射到一维以保持局部性
- **图像处理**：用于图像压缩和扫描路径优化
- **数据库**：空间数据的索引结构
- **天线设计**：在有限空间内最大化导线长度

### 有趣事实

- Hilbert 曲线的第 n 次迭代有 4ⁿ - 1 个线段
- 曲线上任意两点之间的距离（沿曲线）可能远大于它们的直线距离
- 这种曲线被称为"病态"函数，因为它们挑战了直觉

### 探索提示

- 较高的迭代次数显示更密集的填充
- 观察曲线如何"探索"整个平面
- 注意曲线的自相似性`,
          parameters: {
            iterations: 5,
            lineColor: '#00d9ff',
            bgColor: '#010409'
          }
        },
        {
          id: 'dragon-curve',
          name: 'Dragon 曲线',
          description: `## Dragon 曲线 - 纸折的龙

### 历史背景

Dragon 曲线（龙形曲线）由 NASA 物理学家 John Heighway 在 1966 年发现。它可以通过简单地将纸条反复对折然后展开而得到，因此也被称为"折纸分形"。

### 构造方法

**纸折法**：
1. 取一条长方形纸条
2. 沿长度方向对折（右端折到左端）
3. 再次对折
4. 重复 n 次
5. 展开纸张，使每次折痕成 90 度角
6. 形成的形状就是 Dragon 曲线

**数学构造**：
从一条线段开始，每次迭代将每条线段替换为两条成 90 度角的线段。

### 数学特性

- **不自交**：尽管看起来复杂，但曲线从不自相交
- **空间填充**：极限情况下可以填满平面
- **分形维数**：2
- **对称性**：具有旋转对称性

### 有趣性质

- 多个 Dragon 曲线可以无缝拼接铺满平面
- 曲线的边界也是一个分形
- 与复数迭代 zₙ₊₁ = (1+i)zₙ(1-zₙ) 有关

### 名字由来

展开后的纸条形状像一条盘绕的龙，有头、身体和尾巴。数学家 Martin Gardner 在《科学美国人》的专栏中推广了这个图形和它的名字。

### 探索提示

- 迭代次数越高，"龙"的卷曲越复杂
- 10-12 次迭代可以显示良好的细节
- 观察曲线如何"盘绕"但不自交`,
          parameters: {
            iterations: 10,
            lineColor: '#ff6600',
            bgColor: '#010409'
          }
        },
        {
          id: 'golden-spiral',
          name: '黄金螺旋',
          description: `## 黄金螺旋 - 自然的螺旋

### 历史背景

黄金螺旋是一种对数螺旋，与**黄金比例 φ = (1+√5)/2 ≈ 1.618** 密切相关。这个螺旋在自然界中广泛存在，从鹦鹉螺壳到银河系臂。

### 数学定义

黄金螺旋的极坐标方程为：

**r = a · e^(bθ)**

其中 b = 2·ln(φ)/π ≈ 0.306

这意味着螺旋每旋转 90 度，半径就扩大 φ 倍。

### 自然界的黄金螺旋

- **鹦鹉螺壳**：壳室的排列遵循黄金螺旋
- **向日葵**：种子的排列呈现螺旋模式
- **飓风**：云层 spiral 臂的形状
- **星系**：银河系的旋臂近似对数螺旋
- **动物角**：许多动物的角呈螺旋状生长

### 黄金矩形

黄金螺旋可以内接于一系列嵌套的黄金矩形中：
1. 从黄金矩形开始（宽高比为 φ）
2. 在矩形内画一个正方形
3. 剩余部分仍是黄金矩形
4. 重复这个过程
5. 连接各正方形的对角形成螺旋

### 艺术与建筑

- **帕特农神庙**：立面比例包含黄金比例
- **达芬奇**：在作品中广泛应用黄金比例
- **现代设计**：logo 设计、产品造型等

### 探索提示

- 增加"圈数"可以看到更完整的螺旋
- 显示"黄金矩形"可以看到构造原理
- 螺旋从中心向外无限扩展`,
          parameters: {
            turns: 8,
            lineColor: '#ffd700',
            bgColor: '#010409',
            showRectangles: false
          }
        },
        {
          id: 'lissajous',
          name: 'Lissajous 曲线',
          description: `## Lissajous 曲线 - 振动的艺术

### 历史背景

Lissajous 曲线以法国物理学家 **Jules Lissajous**（1822-1880）命名，他用这些曲线研究声波振动。在示波器发明之前，Lissajous 图形是测量频率和相位的重要工具。

### 数学定义

Lissajous 曲线由两个相互垂直的简谐运动合成：

**x = A · sin(a·t + δ)**
**y = B · sin(b·t)**

其中：
- A, B 是振幅
- a, b 是频率
- δ 是相位差

### 图形特征

图案的形状取决于频率比 a/b 和相位差 δ：

- **a/b = 1**：椭圆、直线或圆
- **a/b = 2**：8 字形或抛物线
- **a/b = 3/2**：更复杂的闭合曲线
- **a/b 为无理数**：曲线不闭合，填满矩形区域

### 实际应用

**示波器**：
- 比较两个信号的频率和相位
- "Lissajous 图形稳定"表示频率比为有理数

**音响设备**：
- 音频频谱分析
- 立体声平衡检测

**天文学**：
- 描述天体的轨道共振

### 历史趣闻

在 20 世纪 60-70 年代，Lissajous 图形经常被用来表示示波器上的音频信号，成为那个时代"高科技"的视觉符号，经常出现在科幻电影和电视节目中。

### 探索提示

- 调节参数 a 和 b 改变频率比
- 调节相位观察图形旋转
- 简单的频率比产生闭合图形`,
          parameters: {
            a: 3,
            b: 2,
            phase: 1.57,
            lineColor: '#00ff00',
            bgColor: '#010409'
          }
        }
      ]
    },
    {
      id: 'geometry',
      name: '几何图形',
      description: '经典几何构造',
      children: [
        {
          id: 'sierpinski',
          name: 'Sierpinski 三角形',
          description: `## Sierpinski 三角形 - 经典分形

### 历史背景

Sierpinski 三角形由波兰数学家 **Wacław Sierpiński** 于 1915 年首次描述。然而，类似的图案在历史上早已出现：13 世纪意大利 Cosmati 镶嵌艺术中就有类似图案，中世纪教堂地板装饰中常见。

### 构造方法

**递归移除法**：
1. 从一个实心等边三角形开始
2. 连接三条边的中点，形成四个小三角形
3. 移除中间的那个小三角形
4. 对剩下的三个实心小三角形重复步骤 2-3
5. 无限重复这个过程

**混沌游戏法**：
1. 在纸上画一个三角形的三个顶点 A、B、C
2. 在三角形内任意选择一个起始点 P₀
3. 随机选择顶点 A、B 或 C 中的一个
4. 从当前点向选中的顶点移动一半距离，得到新点
5. 重复数千次，形成的点集就是 Sierpinski 三角形！

### 数学特性

- **分形维数**：log₂(3) ≈ 1.585
- **面积**：经过 n 次迭代后，剩余面积为 (3/4)ⁿ，极限为 0
- **周长**：趋向无穷大
- **自相似性**：整体由三个缩小版的自身组成

### 与其他分形的关系

- 与**Pascal 三角形**：将 Pascal 三角形中的奇数涂黑，得到 Sierpinski 三角形
- 与**Cantor 集**：可以看作是 Cantor 集的二维推广
- 与**Sierpinski 地毯**：都是 Sierpiński 研究的分形

### 实际应用

- **天线设计**：Sierpinski 三角形天线可以在多个频率下工作
- **计算机图形学**：用于生成自然地形和纹理
- **数据压缩**：分形压缩算法的基础
- **教学工具**：展示分形、递归、极限等概念

### 探索提示

- 较低迭代次数（1-3）显示基本构造
- 较高迭代次数（6-8）显示精细结构
- 每次迭代后三角形数量按 3ⁿ 增长`,
          parameters: {
            iterations: 6
          }
        },
        {
          id: 'h-tree',
          name: 'H 树',
          description: `## H 树 - 芯片设计的分形

### 历史背景

H 树是一种分形树结构，因其形状由重复的 H 形图案组成而得名。它在**集成电路设计**中有着重要的实际应用，特别是用于时钟信号分配网络。

### 构造方法

1. 画一个 H 形（一条水平线段，两端各有一条垂直线段）
2. 在 H 的四个端点处，各画一个缩小版的 H
3. 对每个新的 H 重复步骤 2
4. 无限重复这个过程

### 数学特性

- **自相似性**：每个分支都是整体的缩小版
- **空间填充**：可以覆盖整个二维区域
- **分形维数**：2
- **标度不变性**：在任何放大倍数下看起来都相似

### 实际应用

**集成电路时钟分配**：
- H 树结构可以将时钟信号均匀分布到芯片的各个部分
- 所有端点到中心的距离相等，保证信号同时到达
- 在 CPU、FPGA 等芯片中广泛应用

**天线设计**：
- H 树天线可以在多个频段工作
- 用于 RFID 标签和微型天线

**图像压缩**：
- 分形图像编码的基础结构之一

### 与其他分形的关系

- 与**二叉树**相似，但在二维平面上对称展开
- 可以看作是**四叉树**的图形表示

### 探索提示

- 迭代次数决定 H 的数量
- 第 n 次迭代有 (4ⁿ - 1)/3 个 H 形
- 观察图案如何"生长"填满空间`,
          parameters: {
            iterations: 5,
            lineColor: '#00ff88',
            bgColor: '#010409'
          }
        },
        {
          id: 'barnsley-fern',
          name: 'Barnsley Fern',
          description: `## Barnsley Fern - 巴恩斯利蕨类植物

### 历史背景

Barnsley Fern 由英国数学家 **Michael Barnsley** 在 1988 年提出，是他著作"Fractals Everywhere"中的经典例子。Barnsley 使用这个图形来展示迭代函数系统（IFS）的强大能力。

### 数学定义

Barnsley Fern 使用**迭代函数系统 (Iterated Function System, IFS)** 生成。通过四个仿射变换，按不同概率选择应用：

1. **f₁(x,y) = (0, 0.16y)** - 概率 1%，生成茎
2. **f₂(x,y) = (0.85x+0.04y, -0.04x+0.85y+1.6)** - 概率 85%，生成主叶
3. **f₃(x,y) = (0.2x-0.26y, 0.23x+0.22y+1.6)** - 概率 7%，生成左下叶
4. **f₄(x,y) = (-0.15x+0.28y, 0.26x+0.24y+0.44)** - 概率 7%，生成右下叶

### 视觉特征

生成的图形像一片蕨类植物的叶子，具有：
- 中央的茎
- 两侧对称的小叶
- 自相似性：每片小叶都像整片大叶子的缩小版

### 与自然的关系

Barnsley Fern 展示了数学如何模拟自然：
- 蕨类植物是自然界中常见的分形
- 简单的数学规则可以生成复杂的自然形态
- 这启发了计算机图形学中的分形植物生成

### 探索提示

- 增加迭代次数可以看到更密集的叶子
- 改变颜色可以创造不同视觉效果
- 每个点都是独立计算的，展示了混沌系统的特性`,
          parameters: {
            iterations: 50000,
            pointColor: '#00ff00',
            bgColor: '#010409'
          }
        },
        {
          id: 'butterfly-curve',
          name: 'Butterfly Curve',
          description: `## Butterfly Curve - 蝴蝶曲线

### 历史背景

蝴蝶曲线由美国数学家 **Temple H. Fay** 在 1989 年发现。他在研究极坐标方程时偶然发现了这个美丽的图形，因其形状像一只展开翅膀的蝴蝶而得名。

### 数学定义

蝴蝶曲线使用极坐标方程定义：

**r = e^(sin θ) - 2cos(4θ) + sin⁵((2θ-π)/24)**

这个方程结合了：
- 指数函数：e^(sin θ)
- 余弦函数：-2cos(4θ)
- 五次正弦函数：sin⁵((2θ-π)/24)

### 视觉特征

- 形状像一只展开翅膀的蝴蝶
- 左右对称
- 翅膀上有复杂的纹路和环路
- 颜色渐变可以增强视觉效果

### 数学之美

蝴蝶曲线展示了数学的优雅：
- 一个简单的方程生成复杂的图形
- 三角函数的组合创造自然美感
- 体现了数学与艺术的统一

### 探索提示

- 增加圈数可以看到更多细节
- 改变颜色创造不同风格
- 尝试填充效果`,
          parameters: {
            loops: 5,
            lineColor: '#ff00ff',
            bgColor: '#010409',
            filled: 'false'
          }
        },
        {
          id: 'lorenz-attractor',
          name: 'Lorenz Attractor',
          description: `## Lorenz Attractor - 洛伦兹吸引子

### 历史背景

洛伦兹吸引子由美国气象学家 **Edward Lorenz** 在 1963 年发现。他在研究天气预报模型时偶然发现了这个混沌系统，这个发现开创了混沌理论领域，并引出了著名的"蝴蝶效应"概念。

### 数学定义

洛伦兹吸引子由三个微分方程定义：

**dx/dt = σ(y - x)**
**dy/dt = x(ρ - z) - y**
**dz/dt = xy - βz**

其中：
- σ (sigma) = 普朗特数，通常取 10
- ρ (rho) = 瑞利数，通常取 28
- β (beta) = 几何参数，通常取 8/3

### 视觉特征

- 形状像一对蝴蝶翅膀
- 轨迹在两个"翅膀"之间来回切换
- 永不重复，永不交叉
- 展示了对初始条件的敏感依赖性

### 混沌理论

洛伦兹吸引子是混沌理论的标志：
- **确定性混沌**：系统是完全确定的，但行为不可预测
- **蝴蝶效应**：初始条件的微小变化会导致结果的巨大差异
- **奇异吸引子**：轨迹被吸引到某个区域，但永不重复

### 实际应用

- **气象学**：解释为什么长期天气预报不可行
- **物理学**：研究湍流和对流
- **工程学**：激光和电路系统分析
- **生物学**：种群动态模型

### 探索提示

- 调节 σ、ρ、β 参数观察不同行为
- 某些参数值下系统会进入周期轨道
- 经典参数 (10, 28, 8/3) 产生最美丽的混沌 attractor`,
          parameters: {
            sigma: 10,
            rho: 28,
            beta: 2.6666666666666665,
            steps: 10000,
            dt: 0.01,
            lineColor: '#ff6600',
            bgColor: '#010409'
          }
        }
      ]
    }
  ]
};

// 各图形的参数配置
export const parameterConfigs: Record<string, ParameterConfig[]> = {
  // 分形图形
  mandelbrot: [
    { name: '最大迭代次数', key: 'maxIterations', type: 'number', min: 50, max: 500, step: 10 },
    { name: '颜色方案', key: 'colorScheme', type: 'select', options: ['rainbow', 'grayscale', 'blue', 'fire'] }
  ],
  julia: [
    { name: '实部 (Re)', key: 'realC', type: 'number', min: -2, max: 2, step: 0.01 },
    { name: '虚部 (Im)', key: 'imagC', type: 'number', min: -2, max: 2, step: 0.01 },
    { name: '最大迭代次数', key: 'maxIterations', type: 'number', min: 50, max: 500, step: 10 },
    { name: '颜色方案', key: 'colorScheme', type: 'select', options: ['fire', 'rainbow', 'grayscale', 'blue'] }
  ],
  newton: [
    { name: '多项式次数', key: 'degree', type: 'number', min: 2, max: 8, step: 1 },
    { name: '最大迭代次数', key: 'maxIterations', type: 'number', min: 20, max: 100, step: 10 },
    { name: '收敛精度', key: 'tolerance', type: 'number', min: 0.00001, max: 0.001, step: 0.00001 },
    { name: '颜色方案', key: 'colorScheme', type: 'select', options: ['roots', 'rainbow', 'grayscale'] }
  ],
  'burning-ship': [
    { name: '最大迭代次数', key: 'maxIterations', type: 'number', min: 50, max: 500, step: 10 },
    { name: '颜色方案', key: 'colorScheme', type: 'select', options: ['ship', 'fire', 'rainbow', 'grayscale'] }
  ],
  phoenix: [
    { name: '实部 p', key: 'pReal', type: 'number', min: -2, max: 2, step: 0.01 },
    { name: '虚部 p', key: 'pImag', type: 'number', min: -2, max: 2, step: 0.01 },
    { name: '最大迭代次数', key: 'maxIterations', type: 'number', min: 50, max: 300, step: 10 },
    { name: '颜色方案', key: 'colorScheme', type: 'select', options: ['phoenix', 'fire', 'rainbow'] }
  ],
  'sierpinski-carpet': [
    { name: '迭代次数', key: 'iterations', type: 'number', min: 1, max: 6, step: 1 },
    { name: '填充颜色', key: 'fillColor', type: 'color' },
    { name: '背景颜色', key: 'bgColor', type: 'color' }
  ],
  'koch-snowflake': [
    { name: '迭代次数', key: 'iterations', type: 'number', min: 1, max: 6, step: 1 },
    { name: '线条颜色', key: 'lineColor', type: 'color' },
    { name: '背景颜色', key: 'bgColor', type: 'color' },
    { name: '填充', key: 'filled', type: 'select', options: ['true', 'false'] }
  ],
  'cantor-set': [
    { name: '迭代次数', key: 'iterations', type: 'number', min: 1, max: 8, step: 1 },
    { name: '线条颜色', key: 'lineColor', type: 'color' },
    { name: '背景颜色', key: 'bgColor', type: 'color' }
  ],
  apollonian: [
    { name: '迭代次数', key: 'iterations', type: 'number', min: 1, max: 5, step: 1 },
    { name: '背景颜色', key: 'bgColor', type: 'color' }
  ],
  // 曲线图形
  'hilbert-curve': [
    { name: '迭代次数', key: 'iterations', type: 'number', min: 1, max: 7, step: 1 },
    { name: '线条颜色', key: 'lineColor', type: 'color' },
    { name: '背景颜色', key: 'bgColor', type: 'color' }
  ],
  'dragon-curve': [
    { name: '迭代次数', key: 'iterations', type: 'number', min: 1, max: 15, step: 1 },
    { name: '线条颜色', key: 'lineColor', type: 'color' },
    { name: '背景颜色', key: 'bgColor', type: 'color' }
  ],
  'golden-spiral': [
    { name: '圈数', key: 'turns', type: 'number', min: 1, max: 20, step: 1 },
    { name: '线条颜色', key: 'lineColor', type: 'color' },
    { name: '背景颜色', key: 'bgColor', type: 'color' },
    { name: '显示矩形', key: 'showRectangles', type: 'select', options: ['true', 'false'] }
  ],
  lissajous: [
    { name: '频率 a', key: 'a', type: 'number', min: 1, max: 10, step: 1 },
    { name: '频率 b', key: 'b', type: 'number', min: 1, max: 10, step: 1 },
    { name: '相位差', key: 'phase', type: 'number', min: 0, max: 6.28, step: 0.01 },
    { name: '线条颜色', key: 'lineColor', type: 'color' },
    { name: '背景颜色', key: 'bgColor', type: 'color' }
  ],
  'barnsley-fern': [
    { name: '迭代次数', key: 'iterations', type: 'number', min: 10000, max: 100000, step: 10000 },
    { name: '点的颜色', key: 'pointColor', type: 'color' },
    { name: '背景颜色', key: 'bgColor', type: 'color' }
  ],
  'butterfly-curve': [
    { name: '圈数', key: 'loops', type: 'number', min: 1, max: 20, step: 1 },
    { name: '线条颜色', key: 'lineColor', type: 'color' },
    { name: '背景颜色', key: 'bgColor', type: 'color' },
    { name: '填充', key: 'filled', type: 'select', options: ['true', 'false'] }
  ],
  'lorenz-attractor': [
    { name: 'σ (Sigma)', key: 'sigma', type: 'number', min: 1, max: 20, step: 0.1 },
    { name: 'ρ (Rho)', key: 'rho', type: 'number', min: 1, max: 50, step: 0.1 },
    { name: 'β (Beta)', key: 'beta', type: 'number', min: 1, max: 5, step: 0.1 },
    { name: '步数', key: 'steps', type: 'number', min: 1000, max: 50000, step: 1000 },
    { name: '步长 dt', key: 'dt', type: 'number', min: 0.001, max: 0.02, step: 0.001 },
    { name: '线条颜色', key: 'lineColor', type: 'color' },
    { name: '背景颜色', key: 'bgColor', type: 'color' }
  ],
  // 几何图形
  sierpinski: [
    { name: '迭代次数', key: 'iterations', type: 'number', min: 1, max: 8, step: 1 }
  ],
  'h-tree': [
    { name: '迭代次数', key: 'iterations', type: 'number', min: 1, max: 7, step: 1 },
    { name: '线条颜色', key: 'lineColor', type: 'color' },
    { name: '背景颜色', key: 'bgColor', type: 'color' }
  ]
};
