import { Beans, Ghost, Map, Pacman } from "./base/index";
import { mapPointType } from "./base/map";
import Sprite, { SpriteDirection, SpriteStatus } from "./base/sprite";
import EventHandle from "./libs/eventHandle";

declare var canvas: wx.ICanvas;

export default class Stage {
  beans: Beans;
  enemys: Ghost[] = [];
  heros: Pacman[] = [];
  map: Map;
  /**
   * 得分
   */
  score: number = 0;
  timeout: number = 0;
  /**
   * 舞台状态
   */
  status: SpriteStatus = SpriteStatus.ACTIVE;
  private mapData: number[][];
  private goldenBeans: any;
  private xLen: number;
  private yLen: number;
  private width: number;
  private height: number;
  private size: number;
  private handle: EventHandle;

  private life = 3;

  constructor(mapData: number[][], goldenBeans: any) {
    [this.xLen, this.yLen] = ReadMapDataLen(mapData);
    this.mapData = copyMapData(mapData);
    this.goldenBeans = goldenBeans;
    const { width, height } = canvas;
    this.width = width;
    this.height = height;
    this.size = Math.floor(width / this.xLen);
    this.init();
  }

  tick() {
    // 当前场景暂停
    if (SpriteStatus.STOP === this.status) {
      return;
    }

    // timeout --
    if (this.timeout) {
      this.timeout--;
    }

    if (this.update() === false) {
      return;
    }
    this.findAllSprites().forEach(sp => sp.tick());
  }

  update(): boolean {
    if (this.status === SpriteStatus.ACTIVE) {
      const { map, enemys, heros } = this;
      const hero = heros[0];
      enemys.forEach(enemy => {
        if (
          !map.get(enemy.coord.x, enemy.coord.y) &&
          !map.get(hero.coord.x, hero.coord.y)
        ) {
          const dx = enemy.x - hero.x;
          const dy = enemy.y - hero.y;
          // 物体检测
          if (
            dx * dx + dy * dy < 750 &&
            enemy.status !== SpriteStatus.EXCEPTION
          ) {
            if (enemy.status === SpriteStatus.TEMP) {
              enemy.status = 4;
              this.score += 10;
            } else {
              this.status = SpriteStatus.TEMP;
              this.timeout = 30;
            }
          }
        }
      });
      // 当没有物品的时候，进入结束画面
      if (!this.beans.hasBeans()) {
        this.status = SpriteStatus.STOP;
      }
    } else if (this.status === SpriteStatus.TEMP) {
      // 场景临时状态
      if (!this.timeout) {
        this.life--;
        if (this.life > 0) {
          this.reset();
        } else {
          // this.status = SpriteStatus.STOP;
          return false;
        }
      }
    }
  }

  draw(ctx: wx.CanvasContext) {
    this.findAllSprites().forEach(sp => sp.draw(ctx));
  }

  findAllSprites(): Sprite[] {
    return [this.map, this.beans, ...this.enemys, ...this.heros];
  }

  reset() {
    this.status = SpriteStatus.ACTIVE;
    this.findAllSprites().forEach(sp => sp.reset());
  }

  init() {
    this.initMap();
    this.initBeans();
    this.initEnemys();
    this.initPacman();
    this.initEvent();
  }

  initEvent() {
    const handle = new EventHandle((direction: SpriteDirection) => {
      this.heros.forEach(hero => (hero.nextDirection = direction));
      return null;
    });
    canvas.addEventListener("touchstart", handle.touchStart.bind(handle));
    canvas.addEventListener("touchmove", handle.touchMove.bind(handle));
    canvas.addEventListener("touchend", handle.touchEnd.bind(handle));
  }

  initMap() {
    const { width, height, size, xLen, yLen } = this;
    const spaceXSize = width - xLen * size;
    const spaceYSize = height - yLen * size;

    this.map = new Map({
      x: spaceXSize / 2,
      y: spaceYSize / 2,
      width,
      height,
      size
    });

    this.map.mapData = copyMapData(this.mapData);
  }

  initBeans() {
    const { width, height, size, xLen, yLen } = this;
    const spaceXSize = width - xLen * size;
    const spaceYSize = height - yLen * size;

    this.beans = new Beans({
      x: spaceXSize / 2,
      y: spaceYSize / 2,
      width,
      height,
      size
    });

    this.beans.mapData = copyMapData(this.mapData);
    this.beans.goldenBeans = this.goldenBeans;
  }

  initEnemys() {
    const { width, height, size, xLen, yLen } = this;
    const ghostSize = size;
    // 老家点位
    const homePoints: Array<{
      x: number;
      y: number;
    }> = this.map.findHomePointer();

    const enemys = Array(4)
      .fill(0)
      .map((a, index) => {
        const { x: px, y: py } = homePoints[index % homePoints.length];
        const { x, y } = this.map.coord2position(px, py);
        const ghost = new Ghost({
          x,
          y,
          width: ghostSize,
          height: ghostSize
        });
        ghost.stage = this;
        ghost.vector = ghost.coord = { x: px, y: py };
        return ghost;
      });
    this.enemys = enemys;
  }
  initPacman() {
    const { width, height, size, xLen, yLen } = this;
    const heroSize = size;
    const { x: hx, y: hy } = this.map.coord2position(6, 10);
    const hero = new Pacman({
      x: hx,
      y: hy + 4,
      width: heroSize,
      height: heroSize
    });
    hero.stage = this;
    hero.coord = { x: 6, y: 10 };
    this.heros = [hero];
  }
}

function ReadMapDataLen(mapData: number[][]) {
  const xLen = mapData[0].length;
  const yLen = mapData.length;
  return [xLen, yLen];
}

function copyMapData(mapData: number[][]) {
  return mapData.map(row => {
    return [].concat(row);
  });
}
