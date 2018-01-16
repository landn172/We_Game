/// <reference path="weapp.d.ts" />

declare namespace wx {
  // 创建一个 Worker 线程，目前限制最多只能创建一个 Worker，创建下一个 Worker 前请调用 Worker.terminate
  export function createWorker(path: string): IWorker;

  export interface IWorker {
    /**
     * 向主线程/Worker 线程发送的消息。
     */
    postMessage(message: Object): void;
    /**
     * 监听接收主线程/Worker 线程向当前线程发送的消息
     */
    onMessage: (callback: (message: Object) => void) => void;
    /**
     * 结束当前 worker 线程，仅限在主线程 worker 对象上调用。
     */
    terminate(): void;
  }
}
