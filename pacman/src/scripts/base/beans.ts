import Cache from "./cache";
import MapSprite, { IMapSpriteInitOptions } from "./map";

export default class Bean extends MapSprite {
  /**
   * 黄金豆
   */
  public goldenBeans: {
    [index: string]: string;
  } = {};

  /**
   * 用于缓存数据
   */
  // private cache: Cache;

  constructor({ x, y, width, height, size = 15 }: IMapSpriteInitOptions) {
    super({
      x,
      y,
      width,
      height,
      size
    });
    this.frames = 8;
  }

  public draw(ctx: wx.CanvasContext): void {
    ctx.save();
    ctx.fillStyle = "#F5F5DC";
    this.forEachMap((x, y) => {
      const value = this.get(x, y);
      if (!value) {
        const pos = this.coord2position(x, y);
        if (this.isGoldenBean(x, y)) {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 3 + this.times % 2, 0, 2 * Math.PI, true);
          ctx.fill();
          ctx.closePath();
        } else {
          ctx.fillRect(pos.x - 2, pos.y - 2, 4, 4);
        }
      }
    });

    ctx.restore();
  }

  isGoldenBean(x: number, y: number) {
    return this.goldenBeans[`${x},${y}`];
  }

  /**
   * 判断是否还有豆子
   */
  hasBeans() {
    return JSON.stringify(this.mapData).indexOf("0") >= 0;
  }

  /**
   * 设置已获取到的豆子
   * @param x
   * @param y
   */
  setBean(x: number, y: number) {
    this.set(x, y, 1);
    // this.cache.setCache(`${x},${y}`, 1);
  }

  /**
   * 判断改位置是否已获取豆子
   * @param x
   * @param y
   */
  getBean(x: number, y: number) {
    return this.get(x, y);
    // return this.cache.getCache(`${x},${y}`);
  }
}
