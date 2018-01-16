/// <reference path="weapp.d.ts" />

declare namespace wx {
  // ---------------------------------- 数据API列表 ----------------------------------

  export interface SetStorageOptions extends BaseOptions {
    /**
     * 本地缓存中的指定的 key
     */
    key: string;

    /**
     * 需要存储的内容
     */
    data: any;
  }

  /**
   * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。
   */
  export function setStorage(options: SetStorageOptions): void;

  /**
   * 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
   */
  export function setStorageSync(key: string, data: any): void;

  export interface GetStorageResult {
    /**
     * key对应的内容
     */
    data: any;
  }

  export interface GetStorageOptions extends BaseOptions {
    /**
     * 本地缓存中的指定的 key
     */
    key: string;

    /**
     * 接口调用的回调函数,res = {data: key对应的内容}
     */
    success?: (res?: GetStorageResult) => void;
  }

  /**
   * 从本地缓存中异步获取指定 key 对应的内容。
   */
  export function getStorage(options: GetStorageOptions): void;

  /**
   * 从本地缓存中同步获取指定 key 对应的内容。
   */
  export function getStorageSync(key: string): any;

  export interface GetStorageInfoResult {
    /**
     * 当前storage中所有的key
     */
    keys: string[];

    /**
     * 当前占用的空间大小, 单位kb
     */
    currentSize: number;

    /**
     * 限制的空间大小，单位kb
     */
    limitSize: number;
  }

  export interface GetStorageInfoOptions extends BaseOptions {
    /**
     * 接口调用的回调函数
     */
    success?: (res?: GetStorageInfoResult) => void;
  }

  /**
   * 从本地缓存中异步获取指定 key 对应的内容。
   */
  export function getStorageInfo(options: GetStorageInfoOptions): void;

  /**
   * 从本地缓存中同步获取指定 key 对应的内容。
   */
  export function getStorageInfoSync(): GetStorageInfoResult;

  export interface RemoveStorageOptions extends BaseOptions {
    /**
     * 本地缓存中的指定的 key
     */
    key: string;
  }

  /**
   * 从本地缓存中异步移除指定 key 。
   */
  export function removeStorage(options: RemoveStorageOptions): void;

  /**
   * 从本地缓存中同步移除指定 key 。
   */
  export function removeStorageSync(key: string): void;

  /**
   * 清理本地数据缓存。
   */
  export function clearStorage(): void;

  /**
   * 同步清理本地数据缓存。
   */
  export function clearStorageSync(): void;
}
