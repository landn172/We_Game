/// <reference path="weapp.d.ts" />

declare namespace wx {
  export interface CanvasContextStatic {
    /**
     * 使用内部方式描述颜色和样式的
     */
    fillStyle: string;
    filter: string;
    font: string;
    globalAlpha: number;
    globalCompositeOperation: string;
    imageSmoothingEnabled: boolean;
    imageSmoothingQuality: string;
    lineCap: string;
    lineDashOffset: number;
    lineJoin: string;
    lineWidth: number;
    miterLimit: number;
    shadowBlur: number;
    shadowColor: string;
    shadowOffsetX: number;
    shadowOffsetY: number;
    strokeStyle: string;
    textAlign: string;
    textBaseline: string;
  }

  export interface CanvasContext extends CanvasContextStatic {
    // 变形

    /**
     * 在调用 `scale` 方法后，之后创建的路径其横纵坐标会被缩放。多次调用 `scale`，倍数会相乘。
     * @param scaleWidth 横坐标缩放的倍数
     * @param scaleHeight 纵坐标轴缩放的倍数
     */
    scale(scaleWidth: number, scaleHeight: number): void;

    /**
     * 以原点为中心，原点可以用 translate方法修改。顺时针旋转当前坐标轴。多次调用rotate，旋转的角度会叠加。
     * @param rotate 旋转角度，以弧度计，范围为 0 ~ 2π
     */
    rotate(rotate: number): void;

    /**
     * 对当前坐标系的原点(0, 0)进行变换，默认的坐标系原点为页面左上角。
     * @param x 水平坐标平移量
     * @param y 竖直坐标平移量
     */
    translate(x: number, y: number): void;

    /**
     * 保存当前坐标轴的缩放、旋转、平移信息
     */
    save(): void;

    /**
     * 恢复之前保存过的坐标轴的缩放、旋转、平移信息
     */
    restore(): void;

    // 绘制

    /**
     * 清除画布上在该矩形区域内的内容。
     * @param x 矩形区域左上角的x坐标
     * @param y 矩形区域左上角的y坐标
     * @param width 矩形区域的宽度
     * @param height 矩形区域的高度
     */
    clearRect(x: number, y: number, width: number, height: number): void;

    /**
     * 在画布上绘制被填充的文本。
     * @param text 在画布上输出的文本
     * @param x	绘制文本的左上角x坐标位置
     * @param y 绘制文本的左上角y坐标位置
     */
    fillText(text: string, x: number, y: number): void;

    /**
     * 绘制图像，图像保持原始尺寸。
     * @param imageResource 所要绘制的图片资源，通过 `chooseImage` 得到一个文件路径或者一个项目目录内的图片
     * @param x 图像左上角的x坐标
     * @param y 图像左上角的y坐标
     */
    drawImage(
      imageResource: any,
      x: number,
      y: number,
      width: number,
      height: number
    ): void;

    /**
     * 对当前路径进行填充
     */
    fill(): void;
    /**
     * 对当前路径进行描边
     */
    stroke(): void;

    // 路径后可以带参数。

    /**
     * 开始创建一个路径，需要调用fill或者stroke才会使用路径进行填充或描边。
     * 同一个路径内的多次 `setFillStyle`、`setStrokeStyle`、`setLineWidth` 等设置，以最后一次设置为准。
     */
    beginPath(): void;

    /**
     * 关闭一个路径
     */
    closePath(): void;

    /**把路径移动到画布中的指定点，不创建线条。
     * @param x 目标位置的x坐标
     * @param y 目标位置的y坐标
     */
    moveTo(x: number, y: number): void;

    /**
     * 在当前位置添加一个新点，然后在画布中创建从该点到最后指定点的路径。
     * @param x 目标位置的x坐标
     * @param y 目标位置的y坐标
     */
    lineTo(x: number, y: number): void;

    /**
     * 画一条弧线。
     * 创建一个圆可以用 arc() 方法指定其实弧度为0，终止弧度为 2 * Math.PI。
     * 用 stroke() 或者 fill() 方法来在 canvas 中画弧线。
     * @param x 圆的x坐标
     * @param y 圆的y坐标
     * @param r 圆的半径
     * @param sAngle 起始弧度，单位弧度（在3点钟方向）
     * @param eAngle 终止弧度
     * @param counterclockwise 可选。指定弧度的方向是逆时针还是顺时针。默认是false，即顺时针。
     */
    arc(
      x: number,
      y: number,
      r: number,
      sAngle: number,
      eAngle: number,
      counterclockwise?: boolean
    ): void;

    /**
     * 根据控制点和半径绘制圆弧路径
     * 使用当前的描点(前一个moveTo或lineTo等函数的止点)
     */
    actTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;

    /**
     * 添加一个矩形路径到当前路径。
     * @param x 矩形路径左上角的x坐标
     * @param y 矩形路径左上角的y坐标
     * @param width 矩形路径的宽度
     * @param height 矩形路径的高度
     */
    rect(x: number, y: number, width: number, height: number): void;

    /**
     * 填充一个矩形。用 setFillStyle() 设置矩形的填充色，如果没设置默认是黑色。
     * @param x 矩形路径左上角的x坐标
     * @param y 矩形路径左上角的y坐标
     * @param width 矩形路径的宽度
     * @param height 矩形路径的高度
     */
    fillRect(x: number, y: number, width: number, height: number): void;

    /**
     * 画一个矩形(非填充)。用 setFillStroke() 设置矩形线条的颜色，如果没设置默认是黑色。
     * @param x 矩形路径左上角的x坐标
     * @param y 矩形路径左上角的y坐标
     * @param width 矩形路径的宽度
     * @param height 矩形路径的高度
     */
    strokeRect(x: number, y: number, width: number, height: number): void;

    /**
     * 创建二次贝塞尔曲线路径。
     * @param cpx 贝塞尔控制点的x坐标
     * @param cpy 贝塞尔控制点的y坐标
     * @param x 结束点的x坐标
     * @param y 结束点的y坐标
     */
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;

    /**
     * 创建三次方贝塞尔曲线路径。
     * @param cp1x 第一个贝塞尔控制点的 x 坐标
     * @param cp1y 第一个贝塞尔控制点的 y 坐标
     * @param cp2x 第二个贝塞尔控制点的 x 坐标
     * @param cp2y 第二个贝塞尔控制点的 y 坐标
     * @param x 结束点的x坐标
     * @param y 结束点的y坐标
     */
    bezierCurveTo(
      cp1x: number,
      cp1y: number,
      cp2x: number,
      cp2y: number,
      x: number,
      y: number
    ): void;

    // 样式

    /**
     * 设置纯色填充。
     * @param color 设置为填充样式的颜色('rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串)
     */
    setFillStyle(color: string): void;

    /**
     * 设置纯色描边
     * @param color 设置为填充样式的颜色('rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串)
     */
    setStrokeStyle(color: string): void;

    /**
     * 设置全局画笔透明度。
     * @param alpha 透明度，0 表示完全透明，1 表示完全不透明
     */
    setGlobalAlpha(alpha: number): void;

    /**
     * 设置阴影样式。
     * @param offsetX 阴影相对于形状在水平方向的偏移
     * @param offsetY 阴影相对于形状在竖直方向的偏移
     * @param blur 阴影的模糊级别，数值越大越模糊(0~100)
     * @param color 阴影的颜色('rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串)
     */
    setShadow(
      offsetX: number,
      offsetY: number,
      blur: number,
      color: string
    ): void;

    /**
     * 创建一个线性的渐变颜色。需要使用 addColorStop() 来指定渐变点，至少要两个。
     * @param x0 起点的x坐标
     * @param y0 起点的y坐标
     * @param x1 终点的x坐标
     * @param y1 终点的y坐标
     */
    createLinearGradient(x0: number, y0: number, x1: number, y1: number): void;

    /**
     * 创建一个圆形的渐变颜色。起点在圆心，终点在圆环。需要使用 addColorStop() 来指定渐变点，至少要两个。
     * @param x 圆心的x坐标
     * @param y 圆心的y坐标
     * @param r 圆的半径
     */
    createCircularGradient(x: number, y: number, r: number): void;

    /**
     * 设置字体的字号。
     * @param fontSize 字体的字号
     */
    setFontSize(fontSize: number): void;

    /**
     * 设置线条的宽度。
     * @param lineWidth 线条的宽度
     */
    setLineWidth(lineWidth: number): void;

    /**
     * 设置线条的结束端点样式。
     * @param lineCap 线条的结束端点样式('butt'、'round'、'square')
     */
    setLineCap(lineCap: string): void;

    /**
     * 设置两条线相交时，所创建的拐角类型。
     * @param lineJoin 两条线相交时，所创建的拐角类型('bevel'、'round'、'miter')
     */
    setLineJoin(lineJoin: string): void;

    /**设置最大斜接长度，斜接长度指的是在两条线交汇处内角和外角之间的距离。 当setLineJoin为'miter'时才有效。超过最大倾斜长度的，连接处将以lineJoin为bevel来显示
     * @param miterLimit 最大斜接长度
     */
    setMiterLimit(miterLimit: number): void;

    /**
     * 返回一个ImageData对象
     * 这个区域通过矩形表示，起始点为(sx, sy)、宽为sw、高为sh
     */
    getImageData(sx: number, sy: number, sw: number, sh: number): IImageData;

    /**
     * 将数据从已有的 ImageData 对象绘制到位图
     * 如果提供了一个绘制过的矩形，则只绘制该矩形的像素。此方法不受画布转换矩阵的影响
     * @param dx 画布中 x 轴方向的偏移量
     * @param dy 画布中 y 轴方向的偏移量
     * @param dirtyX 源图像数据中x 坐标 (默认左上角)
     * @param dirtyY 源图像数据中y 坐标 (默认左上角)
     * @param dirtyWidth 矩形区域的宽度 (默认是图像数据的宽度)
     * @param dirtyHeight 矩形区域的高度 (默认是图像数据的高度)
     */
    putImageData(
      imagedata: IImageData,
      dx: number,
      dy: number,
      dirtyX?: number,
      dirtyY?: number,
      dirtyWidth?: number,
      dirtyHeight?: number
    ): void;
  }

  export interface ToTempFilePathOptionsSync {
    /**
     * 截取 canvas 的左上角横坐标
     * @default 0
     */
    x?: number;
    /**
     * 截取 canvas 的左上角纵坐标
     * @default 0
     */
    y?: number;
    /**
     * 截取 canvas 的宽度
     * @default canvas 的宽度
     */
    width?: number;
    /**
     * 截取 canvas 的高度
     * @default canvas 的高度
     */
    height?: number;
    /**
     * 目标文件的宽度，会将截取的部分拉伸或压缩至该数值
     * @default canvas 的宽度
     */
    destWidth?: number;
    /**
     * 目标文件的高度，会将截取的部分拉伸或压缩至该数值
     * @default canvas 的高度
     */
    destHeight?: number;
    /**
     * 目标文件的类型
     * @default png
     */
    fileType?: string;
    /**
     * jpg图片的质量，仅当 fileType 为 jpg 时有效。
     * 取值范围为 0.0（最低）- 1.0（最高），不含 0。不在范围内时当作 1.0
     * @default 1.0
     */
    quality?: number;
  }

  export interface ToTempFilePathOptions
    extends ToTempFilePathOptionsSync,
      BaseOptions {}

  /**
   * webgl 上下文属性，仅当 contextType 为 webgl 时有效
   */
  export interface IContextAttributes {
    /**
     * 表示是否抗锯齿
     */
    antialias?: boolean;
    /**
     * 表示是否绘图完成后是否保留绘图缓冲区
     */
    preserveDrawingBuffer?: boolean;
    /**
     * 抗锯齿样本数。最小值为 2
     * 最大不超过系统限制数量，仅 iOS 支持
     * @default 2
     */
    antialiasSamples?: number;
  }

  export interface ICanvas {
    /**
     * 画布的宽度
     */
    width: number;
    /**
     * 画布的高度
     */
    height: number;
    /**
     * 将当前 Canvas 保存为一个临时文件，并生成相应的临时文件路径。
     */
    toTempFilePath(object: ToTempFilePathOptions): void;
    /**
     * 将当前 Canvas 保存为一个临时文件，并生成相应的临时文件路径。
     */
    toTempFilePathSync(object: ToTempFilePathOptionsSync): string;
    /**
     * 把画布上的绘制内容以一个 data URI 的格式返回
     */
    toDataURL(): string;
    /**
     * 获取画布对象的绘图上下文
     */
    getContext(
      contextType: "2d" | "webgl",
      contextAttributes?: IContextAttributes
    ): CanvasContext;

    addEventListener(type: string, listener: Function): void;
    removeEventListener(type: string, listener: Function): void;
  }

  /**
   * 创建 canvas 绘图上下文
   */
  export function createCanvas(): ICanvas;

  /**
   * 创建并返回绘图上下文context对象。
   */
  export function createContext(): CanvasContext;

  export interface DrawCanvasOptions {
    /**
     * 画布标识，传入 <canvas/> 的 cavas-id
     */
    canvasId: string;

    /**
     * 绘图动作数组，由 wx.createContext 创建的 context，调用 getActions 方法导出绘图动作数组。
     */
    actions: any[];

    /**
     * 本次绘制是否接着上一次绘制，即reserve参数为false，则在本次调用drawCanvas绘制之前native层应先清空画布再继续绘制；
     * 若reserver参数为true，则保留当前画布上的内容，本次调用drawCanvas绘制的内容覆盖在上面，默认 false
     */
    reserve?: boolean;
  }

  /**
   * 绘制画布
   */
  export function drawCanvas(options: DrawCanvasOptions): void;

  export interface CanvasToTempFilePathOptions {
    /**
     * 画布标识，传入 <canvas/> 的 cavas-id
     */
    canvasId: string;
  }

  /**
   * 把当前画布的内容导出生成图片，并返回文件路径
   */
  export function canvasToTempFilePath(
    options: CanvasToTempFilePathOptions
  ): string;
}
