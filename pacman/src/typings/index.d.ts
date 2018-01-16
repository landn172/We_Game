/// <reference types="wx" />
interface IDispatchMessage {
  /**
   * 需要派发的消息类型
   */
  type: string;
  /**
   * 派发的 id
   */
  id?: number;
  /**
   * 派发的消息数据
   */
  data?: any;
}

interface IScopeTasks {
  /**
   * 索引签名
   */
  [prop: string]: Function;
}

interface IImageData {
  data: Uint8ClampedArray;
  height: number;
  width: number;
}
