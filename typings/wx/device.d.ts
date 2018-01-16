/// <reference path="weapp.d.ts" />

declare namespace wx {
  // ---------------------------------- 设备API列表 ----------------------------------

  export interface GetNetworkTypeResult {
    /**
     * 网络类型
     */
    networkType: "2g" | "3g" | "4g" | "wifi" | "none" | "unknown";
  }

  export interface GetNetworkTypeOptions extends BaseOptions {
    /**
     * 接口调用成功，返回网络类型 networkType
     */
    success?: (res?: GetNetworkTypeResult) => void;
  }

  /**
   * 获取网络类型。
   */
  export function getNetworkType(options: GetNetworkTypeOptions): void;

  export interface GetSystemInfoResult {
    /**
     * 手机型号
     */
    model: string;

    /**
     * 设备像素比
     */
    pixelRadio: string;

    /**
     * 窗口宽度
     */
    windowWidth: number;

    /**
     * 窗口高度
     */
    windowHeight: number;

    /**
     * 微信设置的语言
     */
    language: string;

    /**
     * 微信版本号
     */
    version: string;

    /**
     * 操作系统版本
     */
    system: string;

    /**
     * 客户端平台
     */
    platform: string;
  }

  export interface GetSystemInfoOptions extends BaseOptions {
    /**
     * 接口调用成功的回调
     */
    success?: (res?: GetSystemInfoResult) => void;
  }

  /**
   * 获取系统信息。
   */
  export function getSystemInfo(options: GetSystemInfoOptions): void;

  /**
   * 获取系统信息同步接口
   */
  export function getSystemInfoSync(): GetSystemInfoResult;

  export interface AccelerometerChangeResponse {
    /**
     * X 轴
     */
    x: number;

    /**
     * Y 轴
     */
    y: number;

    /**
     * Z 轴
     */
    z: number;
  }

  /**
   * 监听重力感应数据，频率：5次/秒
   */
  export function onAccelerometerChange(
    callback: (res?: AccelerometerChangeResponse) => void
  ): void;

  export interface CompassChangeResponse {
    /**
     * 面对的方向度数
     */
    direction: number;
  }

  /**
   * 监听罗盘数据，频率：5次/秒
   */
  export function onCompassChange(
    callback: (res?: CompassChangeResponse) => void
  ): void;

  export interface MakePhoneCallOptions {
    /**
     * 需要拨打的电话号码
     */
    phoneNumber: string;
  }

  /**
   * 拨打电话
   */
  export function makePhoneCall(options: MakePhoneCallOptions): void;

  export interface ScanCodeResult {
    /**
     * 码的内容
     */
    result: string;

    /**
     * 所扫码的类型
     */
    scanType: string;

    /**
     * 所扫码的字符集
     */
    charSet: string;

    /**
     * 当所扫的码为当前小程序的合法二维码时，会返回此字段，内容为二维码携带的 path
     */
    path: string;
  }

  export interface ScanCodeOptions extends BaseOptions {
    /**
     * 接口调用成功的回调函数
     */
    success?: (res?: ScanCodeResult) => void;
  }

  /**
   * 调起客户端扫码界面，扫码成功后返回对应的结果
   */
  export function scanCode(options: ScanCodeOptions): void;

  export interface SetClipboardDataOptions extends BaseOptions {
    /**
     * 需要设置剪贴板的内容
     */
    data: string;
  }

  /**
   * 设置系统剪贴板的内容
   *
   * @export
   * @param {SetClipboardDataOptions} options
   */
  export function setClipboardData(options: SetClipboardDataOptions): void;

  export interface GetClipboardDataResult {
    /**
     * 剪贴板的内容
     */
    data: string;
  }

  export interface GetClipboardDataOptions extends BaseOptions {
    /**
     * 需要设置剪贴板的内容
     */
    success?: (res?: GetClipboardDataResult) => void;
  }

  export function getClipboardData(options: GetClipboardDataOptions): void;
}
