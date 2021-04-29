
**tip：该元素可以使用CSS来定义大小，但在绘制时图像会伸缩以适应它的框架尺寸：如果CSS的尺寸与初始画布的比例不一致，它会出现扭曲。** 

***用width和height属性为`<canvas>`明确规定宽高***

## canvas 标签
默认宽高为300*150

## 渲染上下文
- getContext方法，用来获得渲染上下文和它的绘画功能。
```
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
```

## 坐标系
![](assets\Canvas_default_grid.png)

## 绘制
`<canvas>`只支持两种形式的图形绘制：矩形和路径（由一系列点连成的线段）。所有其他类型的图形都是通过一条或者多条路径组合而成的。

- 绘制矩形
    - fillRect(x, y, width, height) 绘制一个填充的矩形
    - strokeRect(x, y, width, height) 绘制一个矩形的边框
    - clearRect(x, y, width, height) 清除指定矩形区域，让清除部分完全透明。
- 绘制路径（图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。路径都是闭合的。）
    1. 首先，你需要创建路径起始点。
    2. 然后你使用画图命令去画出路径。
    3. 之后你把路径封闭。
    4. 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。
    - beginPath() 新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
    - closePath() 闭合路径之后图形绘制命令又重新指向到上下文中。
    - stroke() 通过线条来绘制图形轮廓。
    - fill() 通过填充路径的内容区域生成实心的图形。调用该方法会自动闭合路径，所以不需要调用closePath方法

## 绘制路径命令
- moveTo(x, y) 将笔触移动到指定的坐标x以及y上。中断连续路径，设置笔触起点
- lineTo(x, y) 绘制一条从当前位置到指定x以及y位置的直线。
- arc(x, y, radius, startAngle, endAngle, anticlockwise) 画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。角的单位是弧度,弧度=(Math.PI/180)*角度。
- arcTo(x1, y1, x2, y2, radius) 根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点。
- quadraticCurveTo(cp1x, cp1y, x, y) 绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。
- bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) 绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。
![](assets\Canvas_curves.png)
- rect(x, y, width, height) 绘制一个左上角坐标为（x,y），宽高为width以及height的矩形。

## 绘制文本
- fillText(text, x, y [, maxWidth]) 在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的.
- strokeText(text, x, y [, maxWidth]) 在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的.
### 文本样式
- font = value 当前我们用来绘制文本的样式. 这个字符串使用和 CSS font 属性相同的语法. 默认的字体是 10px sans-serif。
- textAlign = value 文本对齐选项. 可选的值包括：start, end, left, right or center. 默认值是 start。
- textBaseline = value 基线对齐选项. 可选的值包括：top, hanging, middle, alphabetic, ideographic, bottom。默认值是 alphabetic。
- direction = value 文本方向。可能的值包括：ltr, rtl, inherit。默认值是 inherit。

## 绘制样式
### 填充样式
- fillStyle = color 设置图形的填充颜色。
- strokeStyle = color 设置图形轮廓的颜色。
color 可以是表示 CSS 颜色值的字符串，渐变对象或者图案对象
#### 渐变
- createLinearGradient(x1, y1, x2, y2) 4 个参数，表示渐变的起点 (x1,y1) 与终点 (x2,y2)。
- createRadialGradient(x1, y1, r1, x2, y2, r2)  6 个参数，前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。
- gradient.addColorStop(position, color)  2 个参数，position 参数必须是一个 0.0 与 1.0 之间的数值，表示渐变中颜色所在的相对位置。例如，0.5 表示颜色会出现在正中间。color 参数必须是一个有效的 CSS 颜色值（如 #FFF， rgba(0,0,0,1)，等等）。
#### 图案
- createPattern(image, type) image 可以是一个 Image 对象的引用，或者另一个 canvas 对象。Type 必须是下面的字符串值之一：repeat，repeat-x，repeat-y 和 no-repeat。
### 线的样式
- lineWidth = value 设置线条宽度。所有宽度为奇数的线并不能精确呈现，这就是因为路径的定位问题。
![](assets\line.jpg)
- lineCap = type 设置线条末端样式。butt，round 和 square。默认是 butt。round 的效果，端点处加上了半径为一半线宽的半圆。square 的效果，端点处加上了等宽且高度为一半线宽的方块。
- lineJoin = type 设定线条与线条间接合处的样式。round, bevel 和 miter。默认是 miter。round 的效果，边角处被磨圆了，圆的半径等于线宽。
- miterLimit = value 限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。
- getLineDash() 返回一个包含当前虚线样式，长度为非负偶数的数组。
- setLineDash(segments) 设置当前虚线样式。
- lineDashOffset = value 设置虚线样式的起始偏移量。
### 阴影
- shadowOffsetX = float
- shadowOffsetY = float
shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。
- shadowBlur = float 用于设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为 0。
- shadowColor = color color是标准的 CSS 颜色值，用于设定阴影颜色效果，默认是全透明的黑色。

