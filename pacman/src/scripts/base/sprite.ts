export enum SpriteDirection {
  RIGHT,
  DOWN,
  LEFT,
  UP
}

export enum SpriteStatus {
  /**
   * 未激活
   */
  INACTIVE = 0,
  ACTIVE = 1,
  STOP = 2,
  TEMP = 3,
  /**
   * 异常
   */
  EXCEPTION = 4
}

export enum SpritesAction {
  IDLE = 1,
  MOVE = 2,
  DIE = 3,
  DAMAGED = 4
}

export interface ISpriteInitOptions {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export const _COS = [1, 0, -1, 0];
export const _SIN = [0, 1, 0, -1];

/**
 * 游戏基础的精灵类
 */
export default class Sprite {
  /**
   * 宽
   */
  width: number;
  /**
   * 高
   */
  height: number;
  /**
   * 位置坐标:横坐标
   */
  x: number; // 位置坐标:横坐标
  /**
   * 位置坐标:纵坐标
   */
  y: number;
  frames: number = 1; // 速度等级,内部计算器times多少帧变化一次
  times: number = 0; // 刷新画布计数(用于循环动画状态判断)
  /**
   * 速度
   */
  speed: number = 1;
  /**
   * 当前定位方向：右下左上代表 0，1，2，3
   */
  orientation: SpriteDirection;
  private currTick: number = 0; // tick

  constructor({ width = 0, height = 0, x = 0, y = 0 }: ISpriteInitOptions) {
    this.width = width;
    this.height = height;

    this.x = x;
    this.y = y;
  }

  /**
   * 将精灵图绘制在canvas上
   */
  draw(ctx: wx.CanvasContext): void {
    console.log("base draw");
  }
  reset(): void {
    console.log("reset");
  }

  clear(ctx: wx.CanvasContext): void {
    ctx.clearRect(this.x, this.y, this.width, this.height);
  }
  tick(): void {
    this.currTick++;
    if (this.currTick >= this.frames) {
      this.times++;
      this.currTick = 0;
    }
  }
}
