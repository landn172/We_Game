import Stage from "../stage";
import { mapPointType } from "./map";
import Sprite, {
  _COS,
  _SIN,
  ISpriteInitOptions,
  SpriteDirection,
  SpriteStatus
} from "./sprite";

const colors = ["#FFE600", "#0F0"];

export interface IPacmanSpriteInitOptions extends ISpriteInitOptions {
  stage?: {};
}

export default class Pacman extends Sprite {
  status: SpriteStatus = SpriteStatus.ACTIVE;
  color: string;
  stage: Stage;
  nextDirection?: SpriteDirection;
  frames = 20;
  speed = 1;

  /**
   * 对象所在地图坐标
   */
  coord: any;

  private initInfo: any = {};

  constructor({ x, y, height = 20, width = 20 }: IPacmanSpriteInitOptions) {
    super({
      x,
      y,
      width: 20,
      height: 20
    });

    this.color = colors[0];
    this.orientation = SpriteDirection.UP;
    this.initInfo = {
      x,
      y,
      orientation: this.orientation
    };
  }

  reset() {
    this.status = SpriteStatus.ACTIVE;
    const { x, y, orientation } = this.initInfo;
    const pos = this.stage.map.position2coord(x, y);
    this.coord.x = pos.x;
    this.coord.y = pos.y;
    this.x = x;
    this.y = y;
    this.orientation = orientation;
  }

  tick() {
    super.tick();
    const { map, beans, enemys } = this.stage;
    this.coord = map.position2coord(this.x, this.y);
    const { x, y, offset } = this.coord;
    if (!offset) {
      if (
        typeof this.nextDirection !== "undefined" &&
        !map.get(x + _COS[this.nextDirection], y + _SIN[this.nextDirection])
      ) {
        this.orientation = this.nextDirection;
      }
      this.nextDirection = void 0;

      const nextValue = map.get(
        x + _COS[this.orientation],
        y + _SIN[this.orientation]
      );
      // 下一个是豆子
      if (mapPointType.bean === nextValue) {
        this.run();
      } else if (nextValue < mapPointType.bean) {
        // 下一个是空（穿越门）
        this.x -= map.size * (map.xLen - 1) * _COS[this.orientation];
        this.y -= map.size * (map.yLen - 1) * _SIN[this.orientation];
      }
      return;
    }
    if (!beans.getBean(x, y)) {
      // stage score ++
      beans.setBean(x, y);
      if (beans.isGoldenBean(x, y)) {
        enemys.forEach(enemy => {
          // npc 为正常或者临时状态
          if (
            enemy.status === SpriteStatus.ACTIVE ||
            enemy.status === SpriteStatus.TEMP
          ) {
            enemy.status = SpriteStatus.TEMP;
            enemy.timeout = 450;
          }
        });
      }
    }

    this.run();
  }

  run() {
    if (this.stage.status === SpriteStatus.TEMP) {
      return;
    }
    this.x += this.speed * _COS[this.orientation];
    this.y += this.speed * _SIN[this.orientation];
  }

  draw(ctx: wx.CanvasContext) {
    ctx.fillStyle = this.color;
    ctx.moveTo(this.x, this.y);
    ctx.beginPath();
    const stage = this.stage;
    // 玩家正常状态
    if (stage.status !== SpriteStatus.TEMP) {
      // 玩家正常状态
      if (this.times % 2) {
        // 开口
        ctx.arc(
          this.x,
          this.y,
          this.width / 2,
          (0.5 * this.orientation + 0.2) * Math.PI,
          (0.5 * this.orientation - 0.2) * Math.PI,
          false
        );
      } else {
        // 闭口
        ctx.arc(
          this.x,
          this.y,
          this.width / 2,
          (0.5 * this.orientation + 0.01) * Math.PI,
          (0.5 * this.orientation - 0.01) * Math.PI,
          false
        );
      }
    } else if (stage.timeout) {
      // 玩家被吃
      ctx.arc(
        this.x,
        this.y,
        this.width / 2,
        (0.5 * this.orientation + 1 - 0.02 * stage.timeout) * Math.PI,
        (0.5 * this.orientation - 1 + 0.02 * stage.timeout) * Math.PI,
        false
      );
    }
    ctx.lineTo(this.x, this.y);
    ctx.closePath();
    ctx.fill();
  }
}
