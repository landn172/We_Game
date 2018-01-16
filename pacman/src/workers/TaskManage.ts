interface ITask {
  /**
   * 命名空间
   */
  namespace: string;
  /**
   * 方法名
   */
  method: string;
  /**
   * 调用方法
   */
  invoke: Function;
}

const tasks: { [prop: string]: IScopeTasks } = {};

export function dispatchTask(message: IDispatchMessage): Promise<any> {
  const { type, data } = message;
  const task = findTask(type);
  if (typeof task === "function") {
    return promisify(task(data));
  }
  console.warn("task is not a function, default return value [undefined].");
  return Promise.resolve();
}

export function registerTask(task: ITask): Function {
  const { method, namespace, invoke } = task;
  if (!tasks[namespace]) {
    tasks[namespace] = {};
  }
  tasks[namespace][method] = invoke;
  return invoke;
}

export function findTask(type: string): Function | void {
  const [namespace, method] = type.split(".");
  const taskNS = tasks[namespace];
  if (!taskNS) {
    console.error("[findTask] can not find namespace");
    return;
  }
  return tasks[namespace][method];
}

function promisify(original: any): Promise<any> {
  if (isPromiseLike(original)) return original;
  return Promise.resolve(original);
}

function isPromiseLike(original: any): boolean {
  if (original instanceof Promise) return true;
  if (typeof original === "object" && typeof original.then === "function")
    return true;
  return false;
}
