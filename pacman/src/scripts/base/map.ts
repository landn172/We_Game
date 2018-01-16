import Cache from "./cache";
import Sprite, {
  _COS,
  _SIN,
  ISpriteInitOptions,
  SpriteDirection,
  SpriteStatus
} from "./sprite";

declare var canvas: wx.ICanvas;

export interface IMapSpriteInitOptions extends ISpriteInitOptions {
  size?: number;
}

/**
 * 地图值type
 * 0: bean 豆子
 * 1: wall 墙
 * 2: home 老家
 */
export enum mapPointType {
  bean,
  wall,
  home
}

enum MapWallStrokeStyle {
  default = "#09c",
  home = "#fff"
}

export default class Map extends Sprite {
  /**
   * 用于缓存数据
   */
  cache: Cache;
  public lastImageScreenshot?: wx.IImage;

  public size: number = 15;

  public xLen: number;
  public yLen: number;

  /**
   * 地图数据
   */
  // tslint:disable-next-line:variable-name
  private _mapData: number[][];

  set mapData(data: number[][]) {
    const xLen: number = data[0].length;
    const yLen: number = data.length;
    this.xLen = xLen;
    this.yLen = yLen;
    this._mapData = data;
  }

  get mapData() {
    return this._mapData;
  }
  /**
   * 地图单元的宽度
   */

  constructor({ x, y, width, height, size = 15 }: IMapSpriteInitOptions) {
    super({
      x,
      y,
      width,
      height
    });

    if (size) {
      this.size = size;
    }

    this.cache = new Cache();
  }

  public forEachMap(callback: (x: number, y: number) => void): void {
    const xLen: number = this.xLen;
    const yLen: number = this.yLen;
    for (let j: number = 0; j < yLen; j++) {
      for (let i: number = 0; i < xLen; i++) {
        callback.call(this, i, j);
      }
    }
  }

  public draw(ctx: wx.CanvasContext): void {
    // if (this.lastImageData) {
    //   console.log("use last");
    //   ctx.putImageData(this.lastImageData, this.x, this.y, 100, 100, 100, 100);
    //   return;
    // }
    if (this.lastImageScreenshot) {
      ctx.drawImage(
        this.lastImageScreenshot,
        this.x,
        this.y,
        this.MapRealWidth,
        this.MapRealHeight
      );
      return;
    }
    ctx.save();

    ctx.lineWidth = 2;

    this.forEachMap((i, j) => {
      const value = this.get(i, j);
      if (!value) {
        return;
      }
      const code = this.getCode(i, j);
      // 判断是否有相邻边值
      if (code.indexOf(1) === -1) {
        return;
      }
      ctx.strokeStyle =
        value === 2 ? MapWallStrokeStyle.home : MapWallStrokeStyle.default;
      const pos = this.coord2position(i, j);
      this.drawWall(ctx, code, pos);
    });

    ctx.restore();

    // 截图 map
    this.MapImageCache(ctx);
  }

  get MapRealWidth(): number {
    return this.cache.getOrSetCache("MapRealWidth", () => {
      const xLen: number = this.mapData[0].length;
      return xLen * this.size;
    });
  }

  get MapRealHeight(): number {
    return this.cache.getOrSetCache("MapRealHeight", () => {
      const yLen = this.mapData.length;
      return yLen * this.size;
    });
  }

  /**
   * 缓存 已绘制的地图
   * @param ctx
   */
  public MapImageCache(ctx: wx.CanvasContext) {
    const self = this;
    // this.lastImageData = ctx.getImageData(
    //   this.x,
    //   this.y,
    //   this.width,
    //   this.height
    // );

    const tempFilePath = canvas.toTempFilePathSync({
      x: this.x,
      y: this.y,
      width: this.MapRealWidth,
      height: this.MapRealHeight,
      fileType: "png"
    });

    const image = new Image();
    image.src = tempFilePath;
    this.lastImageScreenshot = image;
  }

  public drawLine(ctx: wx.CanvasContext, sx: number, sy: number) {
    if (sx === 0 || sy === 0) {
      ({ sx, sy } = { sx: this.size * sx, sy: this.size * sy });
      const strokeStyle = ctx.strokeStyle;
      ctx.strokeStyle = "#cbc";
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      if (sx === 0) {
        ctx.lineTo(1000, sy);
      }
      if (sy === 0) {
        ctx.lineTo(sx, 1000);
      }
      ctx.stroke();
      ctx.closePath();
      ctx.strokeStyle = strokeStyle;
    }
  }

  public drawWall(
    ctx: wx.CanvasContext,
    code: number[],
    pos: { x: number; y: number }
  ) {
    switch (code.join("")) {
      case "1100":
        ctx.beginPath();
        ctx.arc(
          pos.x + this.size / 2,
          pos.y + this.size / 2,
          this.size / 2,
          Math.PI,
          1.5 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.closePath();
        break;
      case "0110":
        ctx.beginPath();
        ctx.arc(
          pos.x - this.size / 2,
          pos.y + this.size / 2,
          this.size / 2,
          1.5 * Math.PI,
          2 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.closePath();
        break;
      case "0011":
        ctx.beginPath();
        ctx.arc(
          pos.x - this.size / 2,
          pos.y - this.size / 2,
          this.size / 2,
          0,
          0.5 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.closePath();
        break;
      case "1001":
        ctx.beginPath();
        ctx.arc(
          pos.x + this.size / 2,
          pos.y - this.size / 2,
          this.size / 2,
          0.5 * Math.PI,
          1 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.closePath();
        break;
      default:
        const dist = this.size / 2;
        code.forEach((v, index) => {
          if (v) {
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
            const [tx, ty] = [
              pos.x - _COS[index] * dist,
              pos.y - _SIN[index] * dist
            ];

            ctx.lineTo(tx, ty);
            ctx.stroke();
            ctx.closePath();
          }
        });
        break;
    }
  }

  public getCode(i: number, j: number) {
    const code = [0, 0, 0, 0];
    if (
      this.get(i + 1, j) &&
      !(
        this.get(i + 1, j - 1) &&
        this.get(i + 1, j + 1) &&
        this.get(i, j - 1) &&
        this.get(i, j + 1)
      )
    ) {
      code[0] = 1;
    }
    if (
      this.get(i, j + 1) &&
      !(
        this.get(i - 1, j + 1) &&
        this.get(i + 1, j + 1) &&
        this.get(i - 1, j) &&
        this.get(i + 1, j)
      )
    ) {
      code[1] = 1;
    }
    if (
      this.get(i - 1, j) &&
      !(
        this.get(i - 1, j - 1) &&
        this.get(i - 1, j + 1) &&
        this.get(i, j - 1) &&
        this.get(i, j + 1)
      )
    ) {
      code[2] = 1;
    }
    if (
      this.get(i, j - 1) &&
      !(
        this.get(i - 1, j - 1) &&
        this.get(i + 1, j - 1) &&
        this.get(i - 1, j) &&
        this.get(i + 1, j)
      )
    ) {
      code[3] = 1;
    }

    return code;
  }

  /**
   * 地图坐标转画布坐标
   * @param cx
   * @param cy
   */
  public coord2position(cx: number, cy: number) {
    const { x, y, size } = this;
    return {
      x: x + cx * size + size / 2,
      y: y + cy * size + size / 2
    };
  }

  /**
   * 画布坐标转地图坐标
   * @param cx
   * @param cy
   */
  public position2coord(cx: number, cy: number) {
    const { x, y, size } = this;
    const fx = Math.abs(cx - x) % size - size / 2;
    const fy = Math.abs(cy - y) % size - size / 2;
    return {
      x: Math.floor((cx - x) / size),
      y: Math.floor((cy - y) / size),
      offset: Math.sqrt(fx * fx + fy * fy)
    };
  }

  /**
   * 找到home点
   */
  findHomePointer() {
    const homePoints: Array<{ x: number; y: number }> = [];
    this.forEachMap((x, y) => {
      if (this.get(x, y) === mapPointType.home) {
        // 非入口 (没有和豆子相连接)
        if (
          !(
            this.get(x + 1, y - 1) === mapPointType.bean ||
            this.get(x + 1, y + 1) === mapPointType.bean ||
            this.get(x, y - 1) === mapPointType.bean ||
            this.get(x, y + 1) === mapPointType.bean
          )
        ) {
          homePoints.push({
            x,
            y
          });
        }
      }
    });
    return homePoints;
  }

  /**
   * 获取地图上某点的值
   * @param x
   * @param y
   */
  public get(x: number, y: number): number {
    const data: number[][] = this.mapData;
    if (data[y] && typeof data[y][x] !== "undefined") {
      return data[y][x];
    }
    return -1;
  }

  finder(params: any) {
    return finder(params);
  }

  public set(x: number, y: number, value: mapPointType) {
    const data = this.mapData;
    if (data[y]) {
      data[y][x] = value;
    }
  }
}

export interface IFinderResult {
  x?: number;
  y?: number;
  change?: number;
}

/**
 * 寻址算法
 * @param params
 */
function finder(params: any): IFinderResult[] {
  const defaults: {
    map: string[];
    start: object;
    end: object;
    type: string;
  } = {
    map: [],
    start: {},
    end: {},
    type: "path"
  };

  const options = Object.assign({}, defaults, params);
  if (
    options.map[options.start.y][options.start.x] ||
    options.map[options.end.y][options.end.x]
  ) {
    // 当起点或终点设置在墙上
    return [];
  }

  let finded = false;
  const result: IFinderResult[] = [];
  const yLen = options.map.length;
  const xLen = options.map[0].length;
  const steps: any[][] = Array(yLen)
    .fill([])
    .map(arr => arr.concat(Array(xLen).fill(0))); // 步骤映射
    
  const getValue = (x: number, y: number) => {
    if (options.map[y] && typeof options.map[y][x] !== "undefined") {
      return options.map[y][x];
    }
    return -1;
  };

  const next = (to: IFinderResult) => {
    const value = getValue(to.x, to.y);
    if (value < 1) {
      if (value === -1) {
        to.x = (to.x + xLen) % xLen;
        to.y = (to.y + yLen) % yLen;
        to.change = 1;
      }
      if (!steps[to.y][to.x]) {
        result.push(to);
      }
    }
  };

  const render = (list: IFinderResult[]) => {
    const newList: any[] = [];
    // tslint:disable-next-line:variable-name
    const _next = (from: IFinderResult, to: IFinderResult) => {
      const value = getValue(to.x, to.y);
      if (value < 1) {
        // 当前点是否可以走
        if (value === -1) {
          to.x = (to.x + xLen) % xLen;
          to.y = (to.y + yLen) % yLen;
          to.change = 1;
        }
        if (to.x === options.end.x && to.y === options.end.y) {
          steps[to.y][to.x] = from;
          finded = true;
        } else if (!safeGetArr(steps, to.x, to.y)) {
          try {
            steps[to.y][to.x] = from;
            newList.push(to);
          // tslint:disable-next-line:no-empty
          } catch (error) {}
        }
      }
    };
    list.forEach(current => {
      _next(current, { y: current.y + 1, x: current.x });
      _next(current, { y: current.y, x: current.x + 1 });
      _next(current, { y: current.y - 1, x: current.x });
      _next(current, { y: current.y, x: current.x - 1 });
    });
    if (!finded && newList.length) {
      render(newList);
    }
  };

  render([options.start]);

  if (finded) {
    let current = options.end;
    if (options.type === "path") {
      while (current.x !== options.start.x || current.y !== options.start.y) {
        result.unshift(current);
        current = steps[current.y][current.x];
      }
    } else if (options.type === "next") {
      next({ x: current.x + 1, y: current.y });
      next({ x: current.x, y: current.y + 1 });
      next({ x: current.x - 1, y: current.y });
      next({ x: current.x, y: current.y - 1 });
    }
  }
  return result;
}

function safeGetArr(steps: any[][], x: number, y: number): any {
  const s1 = steps[y];
  if (Array.isArray(s1)) {
    return s1[x];
  }
}
