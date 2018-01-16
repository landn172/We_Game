import Stage from "../stage";
import { IFinderResult } from "./map";
import Sprite, {
  _COS,
  _SIN,
  ISpriteInitOptions,
  SpriteDirection,
  SpritesAction,
  SpriteStatus
} from "./sprite";

const GHOST_COLOR = ["#F00", "#F93", "#0CF", "#F9C"];

let initCount: number = 0;

interface IVendorOptions extends IFinderResult {
  offset?: number;
}

/**
 * 敌人 Ghost
 */
export default class Ghost extends Sprite {
  color: string;
  isSick: boolean = false;
  status: SpriteStatus = SpriteStatus.ACTIVE;
  frames = 10;
  speed = 1;
  stage: Stage;
  /**
   * 状态计时
   */
  timeout = Math.floor(Math.random() * 120);
  id: number;
  path: IFinderResult[];
  /**
   * 目标地图坐标
   */
  vector: IVendorOptions;
  /**
   * 对象所在地图坐标
   */
  coord: IVendorOptions;

  private initInfo: any = {};

  constructor({ x, y, height = 20, width = 20 }: ISpriteInitOptions) {
    super({
      width,
      height,
      x,
      y
    });

    this.orientation = SpriteDirection.RIGHT;
    this.color = GHOST_COLOR[initCount++ % 4];
    this.id = initCount;
    this.initInfo = {
      x,
      y
    };
  }

  tick() {
    super.tick();

    if (this.timeout > 0) {
      this.timeout--;
    }

    // 可以被吃状态
    if (this.status === SpriteStatus.TEMP && !this.timeout) {
      this.status = SpriteStatus.ACTIVE;
    }

    this.coord = this.stage.map.position2coord(this.x, this.y);
    // 到底坐标中心时
    if (!this.coord.offset) {
      this.tracker();
    }

    this.x += this.speed * _COS[this.orientation];
    this.y += this.speed * _SIN[this.orientation];
  }

  tracker() {
    const { map, beans, enemys, heros } = this.stage;
    const hero = heros[0];

    if (this.status === SpriteStatus.ACTIVE) {
      if (!this.timeout) {
        const newMap = copyMapData(map.mapData);
        enemys.forEach(enemy => {
          if (enemy.id !== this.id && enemy.status === SpriteStatus.ACTIVE) {
            // NPC将其它所有还处于正常状态的NPC当成一堵墙
            newMap[enemy.coord.y][enemy.coord.x] = 1;
          }
        });

        this.path = map.finder({
          map: newMap,
          start: this.coord,
          end: hero.coord
        });

        if (this.path.length) {
          this.vector = this.path[0];
        }
      }
    } else if (this.status === SpriteStatus.TEMP) {
      const newMap = copyMapData(map.mapData);
      enemys.forEach(enemy => {
        if (enemy.id !== this.id) {
          // NPC将其它所有还处于正常状态的NPC当成一堵墙
          newMap[enemy.coord.y][enemy.coord.x] = 1;
        }
      });
      this.path = map.finder({
        map: newMap,
        start: hero.coord,
        end: this.coord,
        type: "next"
      });
      if (this.path.length) {
        this.vector = this.path[Math.floor(Math.random() * this.path.length)];
      }
    } else if (this.status === SpriteStatus.EXCEPTION) {
      const newMap = copyMapData(map.mapData);
      const endCoord = map.position2coord(this.initInfo.x, this.initInfo.y);
      this.path = map.finder({
        map: newMap,
        start: this.coord,
        end: endCoord
      });
      if (this.path.length) {
        this.vector = this.path[0];
      } else {
        this.status = SpriteStatus.ACTIVE;
      }
    }

    // 是否转变方向
    if (this.vector.change) {
      this.coord.x = this.vector.x;
      this.coord.y = this.vector.y;
      const pos = map.coord2position(this.coord.x, this.coord.y);
      this.x = pos.x;
      this.y = pos.y;
    }

    // 方向判定
    if (this.vector.x > this.coord.x) {
      this.orientation = SpriteDirection.RIGHT;
    } else if (this.vector.x < this.coord.x) {
      this.orientation = SpriteDirection.LEFT;
    } else if (this.vector.y > this.coord.y) {
      this.orientation = SpriteDirection.DOWN;
    } else if (this.vector.y < this.coord.y) {
      this.orientation = SpriteDirection.UP;
    }
  }

  /**
   * 重置原来位置
   */
  reset() {
    this.status = SpriteStatus.ACTIVE;
    const { x, y } = this.initInfo;
    const pos = this.stage.map.position2coord(x, y);
    this.coord.x = pos.x;
    this.coord.y = pos.y;
    this.vector.x = pos.x;
    this.vector.y = pos.y;
    this.x = x;
    this.y = y;
  }

  draw(ctx: wx.CanvasContext) {
    this.isSick = false;
    if (this.status === SpriteStatus.TEMP) {
      this.isSick = true;
    }

    if (this.status !== SpriteStatus.EXCEPTION) {
      this.drawBody(ctx);
    }

    this.drawEye(ctx);
  }

  drawEye(ctx: wx.CanvasContext) {
    ctx.fillStyle = "#FFF";
    if (this.isSick) {
      ctx.beginPath();
      ctx.arc(
        this.x - this.width * 0.15,
        this.y - this.height * 0.21,
        this.width * 0.08,
        0,
        2 * Math.PI,
        false
      );
      ctx.arc(
        this.x + this.width * 0.15,
        this.y - this.height * 0.21,
        this.width * 0.08,
        0,
        2 * Math.PI,
        false
      );
      ctx.fill();
      ctx.closePath();
    } else {
      ctx.beginPath();
      ctx.arc(
        this.x - this.width * 0.15,
        this.y - this.height * 0.21,
        this.width * 0.12,
        0,
        2 * Math.PI,
        false
      );
      ctx.arc(
        this.x + this.width * 0.15,
        this.y - this.height * 0.21,
        this.width * 0.12,
        0,
        2 * Math.PI,
        false
      );
      ctx.fill();
      ctx.closePath();
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(
        this.x - this.width * (0.15 - 0.04 * _COS[this.orientation]),
        this.y - this.height * (0.21 - 0.04 * _SIN[this.orientation]),
        this.width * 0.07,
        0,
        2 * Math.PI,
        false
      );
      ctx.arc(
        this.x + this.width * (0.15 + 0.04 * _COS[this.orientation]),
        this.y - this.height * (0.21 - 0.04 * _SIN[this.orientation]),
        this.width * 0.07,
        0,
        2 * Math.PI,
        false
      );
      ctx.fill();
      ctx.closePath();
    }
  }

  drawBody(ctx: wx.CanvasContext) {
    ctx.fillStyle = this.isSick ? "#BABABA" : this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width * 0.5, 0, Math.PI, true);
    // 移动状态
    switch (this.times % 2) {
      case 0:
        ctx.lineTo(this.x - this.width * 0.5, this.y + this.height * 0.4);
        ctx.quadraticCurveTo(
          this.x - this.width * 0.4,
          this.y + this.height * 0.5,
          this.x - this.width * 0.2,
          this.y + this.height * 0.3
        );
        ctx.quadraticCurveTo(
          this.x,
          this.y + this.height * 0.5,
          this.x + this.width * 0.2,
          this.y + this.height * 0.3
        );
        ctx.quadraticCurveTo(
          this.x + this.width * 0.4,
          this.y + this.height * 0.5,
          this.x + this.width * 0.5,
          this.y + this.height * 0.4
        );
        break;
      case 1:
        ctx.lineTo(this.x - this.width * 0.5, this.y + this.height * 0.3);
        ctx.quadraticCurveTo(
          this.x - this.width * 0.25,
          this.y + this.height * 0.5,
          this.x,
          this.y + this.height * 0.3
        );
        ctx.quadraticCurveTo(
          this.x + this.width * 0.25,
          this.y + this.height * 0.5,
          this.x + this.width * 0.5,
          this.y + this.height * 0.3
        );
        break;
    }
    ctx.fill();
    ctx.closePath();
  }
}

function copyMapData(mapData: number[][]) {
  return mapData.map(row => {
    return [].concat(row.map(value => (value === 2 ? 0 : value)));
  });
}
