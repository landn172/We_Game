import { dispatchTask, registerTask } from "./TaskManage";
import register from "./register";

declare const worker: wx.IWorker;

worker.onMessage((message: IDispatchMessage) => {
  console.log('onMessage')
  dispatchTask(message).then(data => {
    message.data = data;
    worker.postMessage(message);
  });
});

// 注册方法
for (const ns in register) {
  const names = register[ns];
  for (const method in names) {
    registerTask({
      namespace: ns,
      method,
      invoke: names[method]
    });
  }
}
