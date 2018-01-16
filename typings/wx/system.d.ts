/// <reference path="weapp.d.ts" />

declare namespace wx {
  /**
   * 监听全局错误事件
   * @param callback
   */
  export function onError(callback: Function): void;

    /**
   * 取消监听全局错误事件
   * @param callback
   */
  export function offError(callback: Function): void;
}
