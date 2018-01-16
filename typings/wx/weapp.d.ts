// Type definitions for weapp game

declare namespace wx {
  export interface BaseOptions {
    /**
     * 接口调用成功的回调函数
     */
    success?: (res?: any) => void;

    /**
     * 接口调用失败的回调函数
     */
    fail?: (res?: any) => void;

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (res?: any) => void;
  }

  export interface ShareOptions {
    /**
     * 分享标题, 默认为当前小程序名称
     */
    title?: string;

    /**
     * 分享描述, 默认为当前小程序名称
     */
    desc?: string;

    /**
     * 分享路径, 默认为当前页面path, 必须是以 / 开头的完整路径
     */
    path?: string;
  }

  export interface IData {
    [key: string]: any;
  }

  export interface IImage {
    src: string;
    width: number;
    height: number;
    onload: Function;
  }

  /**
   * 创建一个图片对象
   */
  export function createImage(): IImage;

  export interface IImageData {
    data: Uint8ClampedArray;
    height: number;
    width: number;
  }
}
