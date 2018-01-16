import "./scripts/libs/symbol";
import "./scripts/libs/weapp-adapter";
import Main from "./scripts/main";
import WorkerManage from "./scripts/WorkerManage";

// const workerManage = new WorkerManage("workers/index.js");
// workerManage
//   .postMessagePromise({
//     type: "createMap.createMapWall",
//     data: {
//       wallWidth: 250,
//       wallHeight: 250
//     }
//   })
//   .then(data => {
//     console.log(data);
//   });

wx.onError((res: any) => {
  const { message, stack } = res;
  console.error(res);
});

// tslint:disable-next-line:no-unused-expression
new Main();
console.log("init");
