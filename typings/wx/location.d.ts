/// <reference path="weapp.d.ts" />

declare namespace wx {
  // ---------------------------------- 位置API列表 ----------------------------------

  export interface Location {
    /**
     * 纬度，浮点数，范围为-90~90，负数表示南纬
     */
    latitude: number;

    /**
     * 经度，浮点数，范围为-180~180，负数表示西经
     */
    longitude: number;
  }

  export interface GetLocationResult extends Location {
    /**
     * 速度，浮点数，单位m/s
     */
    speed: number;

    /**
     * 位置的精确度
     */
    accuracy: number;
  }

  export interface GetLocationOptions extends BaseOptions {
    /**
     * 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 `wx.openLocation` 的坐标
     */
    type?: string;

    /**
     * 接口调用成功的回调函数
     */
    success?: (res?: GetLocationResult) => void;
  }

  /**
   * 获取当前的地理位置、速度。
   */
  export function getLocation(options: GetLocationOptions): void;

  export interface ChooseLocationResult extends Location {
    /**
     * 位置名称
     */
    name: string;

    /**
     * 详细地址
     */
    address: string;
  }

  export interface ChooseLocationOptions extends BaseOptions {
    /**
     * 接口调用成功的回调函数
     */
    success?: (res?: ChooseLocationResult) => void;
  }

  /**
   * 打开地图选择位置
   */
  export function chooseLocation(options: ChooseLocationOptions): void;

  export interface OpenLocationOptions extends BaseOptions, Location {
    /**
     * 缩放比例，范围1~28，默认为28
     */
    scale?: number;

    /**
     * 位置名
     */
    name?: string;

    /**
     * 地址的详细说明
     */
    address?: string;
  }

  /**
   * 使用微信内置地图查看位置
   */
  export function openLocation(options: OpenLocationOptions): void;

  export interface GetCenterLocationOptions extends BaseOptions {
    /**
     * 接口调用成功的回调函数 ，res = { longitude: "经度", latitude: "纬度"}
     */
    success?: (res?: Location) => void;
  }

  /**
   * mapContext 通过 mapId 跟一个 <map/> 组件绑定，通过它可以操作对应的 <map/> 组件。
   */
  export interface MapContext {
    /**
     * 获取当前地图中心的经纬度，返回的是 gcj02 坐标系，可以用于 wx.openLocation
     */
    getCenterLocation(options: GetCenterLocationOptions): void;

    /**
     * 将地图中心移动到当前定位点，需要配合map组件的show-location使用
     */
    moveToLocation(): void;
  }

  /**
   * 创建并返回 map 上下文 mapContext 对象
   */
  export function createMapContext(mapId: string): MapContext;
}
