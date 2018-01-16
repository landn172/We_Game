/**
 * Worker 的入口文件路径，必须使用绝对路径。
 */
declare type scriptPath = string;

interface IMessageBatch {
  batchId: number;
  callback: (message: any) => void;
}

// 当前正在执行中的 workers
const currentWorks: wx.IWorker[] = [];
// 允许最大创建个数
const MAX_WORK_NUMBER = 1;
// 维护消息发送的id
let batchId = 0;

class WorkerManage {
  messages: IMessageBatch[] = [];
  private worker: wx.IWorker;
  /**
   * 创建 worker
   * @param absoluteRootPath
   */
  constructor(absoluteRootPath: scriptPath) {
    if (currentWorks.length >= MAX_WORK_NUMBER) {
      console.warn("当前有正在执行的worker");
      return;
    }

    const worker = wx.createWorker(absoluteRootPath);
    this.worker = worker;
    worker.onMessage(this.onMessage.bind(this));
    currentWorks.push(worker);
  }

  /**
   * work.onMessage 回调
   * @param message
   */
  private onMessage(message: IDispatchMessage) {
    const messageBatchIndex = this.messages.findIndex(
      m => m.batchId === message.id
    );
    if (messageBatchIndex === -1) {
      console.warn(`[onMessage] miss callback batchId:${message.id}`);
      return;
    }
    const messageBatch = this.messages[messageBatchIndex];
    this.messages.splice(messageBatchIndex, 1); // remove
    messageBatch.callback(message);
  }

  /**
   * work.postMessage
   * @param message
   */
  private postMessage(message: IDispatchMessage) {
    const worker = this.getWork();
    message.id = ++batchId;
    console.log("postMessage");
    worker.postMessage(message);
  }

  postMessagePromise(message: IDispatchMessage): Promise<IDispatchMessage> {
    this.postMessage(message);

    return new Promise(resolve => {
      this.messages.push({
        batchId: message.id,
        callback: resolve
      });
    });
  }

  getWork(): wx.IWorker {
    return this.worker;
  }

  /**
   * 销毁
   */
  destroy(): void {
    const worker = this.worker;
    destroyWork(worker);
    this.messages.length = 0;
  }
}

export default WorkerManage;

export function destroyWork(worker?: wx.IWorker) {
  // 如果没有worker 取最后的worker
  if (!worker) {
    [worker] = currentWorks.slice(-1);
  }
  if (worker) {
    worker.terminate();
    const targetIndex = currentWorks.indexOf(worker);
    currentWorks.splice(targetIndex, 1); // 删除
  }
}
