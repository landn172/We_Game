import { SpriteDirection } from "../base/sprite";

export interface IEventOptions {
  touches: ITouch[];
  changedTouches: ITouch[];
  timeStamp: number;
}

export interface ITouch {
  identifier: number;
  screenX: number;
  screenY: number;
  pageX: number;
  pageY: number;
}

declare var canvas: wx.ICanvas;
export declare type EVENTNAME = "TouchStart" | "TouchMove" | "TouchEnd";

const deg30 = Math.tan(45 * Math.PI / 180);

/**
 * 触摸事件代理
 */
export default class EventHandle {
  startX: number = 0;
  startY: number = 0;
  maxMoveLen: number = 0;
  /**
   * 上下左右手势回调
   */
  handle: (direction: SpriteDirection) => {};
  /**
   * 事件回调
   */
  private handles: {
    [name: string]: Array<() => {}>;
  } = {};
  constructor(handle: (direction: SpriteDirection) => {}) {
    this.handle = handle;
    this.maxMoveLen = 10; // canvas.width / 10;
  }

  touchStart(ev: IEventOptions) {
    this.fire("TouchStart", ev);
    const targetEvent = ev.touches[0];
    this.startX = targetEvent.pageX;
    this.startY = targetEvent.pageY;
  }

  touchMove(ev: IEventOptions) {
    this.fire("TouchMove", ev);
    const targetEvent = ev.touches[0];
    const { pageX, pageY } = targetEvent;
    const deltaX = pageX - this.startX;
    const deltaY = pageY - this.startY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    if (absDeltaX > absDeltaY) {
      // 滑动距离没有超过
      if (absDeltaX < this.maxMoveLen) {
        return;
      }
      // 左右
      if (absDeltaY / absDeltaX < deg30) {
        const direction =
          deltaX > 0 ? SpriteDirection.RIGHT : SpriteDirection.LEFT;
        this.handle(direction);
      }
    } else {
      // 滑动距离没有超过
      if (absDeltaY < this.maxMoveLen) {
        return;
      }
      // 上下
      if (absDeltaX / absDeltaY < deg30) {
        const direction =
          deltaY > 0 ? SpriteDirection.DOWN : SpriteDirection.UP;
        this.handle(direction);
      }
    }
  }
  touchEnd(ev: IEventOptions) {
    this.fire("TouchEnd", ev);
    this.startX = 0;
    this.startY = 0;
  }

  on(eventName: EVENTNAME, fn: () => {}) {
    if (!this.handles[eventName]) {
      this.handles[eventName] = [];
    } else {
      this.handles[eventName].push(fn);
    }
  }

  off(eventName: EVENTNAME, fn: () => {}) {
    if (this.handles[eventName]) {
      const index = this.handles[eventName].findIndex(value => value === fn);
      // remove
      if (index >= 0) {
        this.handles[eventName].splice(index, 1);
      }
    }
  }

  fire(eventName: EVENTNAME, ...args: any[]) {
    if (this.handles[eventName]) {
      this.handles[eventName].forEach(fn => {
        try {
          fn(...args);
        } catch (error) {
          console.error(error);
        }
      });
    }
  }
}
