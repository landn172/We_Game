import MapData from "../maps";
import { Beans, Ghost, Map, Pacman } from "./base/index";
import { SpriteStatus } from "./base/sprite";
import Stage from "./stage";

declare var canvas: wx.ICanvas;

// const canvas = wx.createCanvas();
const ctx = canvas.getContext("2d");

const { requestAnimationFrame, cancelAnimationFrame } = window;

export default class Main {
  frame: number = 0; // 帧数计算
  stage: Stage;

  private handle: number;
  constructor() {
    this.init();
    this.start();
  }
  init() {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    const { mapData, goldenBeans } = getMapData(0);
    this.stage = new Stage(mapData, goldenBeans);
  }

  tick() {
    this.clearCanvas();
    this.drawBg();
    const stage = this.stage;
    stage.tick();
    stage.draw(ctx);
  }

  drawBg() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  start() {
    this.clearCanvas();
    const fn = () => {
      this.tick.apply(this);
      this.handle = requestAnimationFrame(fn);
    };
    this.handle = requestAnimationFrame(fn);
  }

  clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function getMapData(index: number) {
  const { mapData, goldenBeans } = MapData[index];
  return {
    mapData,
    // tslint:disable-next-line:object-literal-sort-keys
    goldenBeans
  };
}
