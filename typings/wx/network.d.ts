/// <reference path="weapp.d.ts" />

declare namespace wx {
  // ---------------------------------- 网络API列表 ----------------------------------

  export interface RequestResult {
    /**
     * 开发者服务器返回的内容
     */
    data: any;
  }

  export interface RequestOptions extends BaseOptions {
    /**
     * 开发者服务器接口地址
     */
    url: string;

    /**
     * 请求的参数
     */
    data?: string | IData;

    /**
     * 设置请求的 header , header 中不能设置 Referer
     */
    header?: IData;

    /**
     * 默认为 GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
     */
    method?: string;

    /**
     * 默认为 json。如果设置了 dataType 为 json，则会尝试对响应的数据做一次 JSON.parse
     */
    dataType?: string;

    /**
     * 收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'}
     */
    success?: (res?: RequestResult) => void;
  }

  /**
   * 发起网络请求。`wx.request`发起的是https请求。**一个微信小程序，同时只能有5个网络请求连接**。
   */
  export function request(options: RequestOptions): void;

  export interface UploadFileResult {
    /**
     * 开发者服务器返回的数据
     */
    data: string;

    /**
     * HTTP状态码
     */
    statusCode: number;
  }

  export interface UploadFileOptions extends BaseOptions {
    /**
     * 开发者服务器 url
     */
    url: string;

    /**
     * 要上传文件资源的路径
     */
    filePath: string;

    /**
     * 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
     */
    name: string;

    /**
     * HTTP 请求 Header , header 中不能设置 Referer
     */
    header?: IData;

    /**
     * HTTP 请求中其他额外的 form data
     */
    formData?: IData;

    /**
     * 收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'}
     */
    success?: (res?: UploadFileResult) => void;
  }

  /**
   * 将本地资源上传到开发者服务器。
   * 如页面通过 [wx.chooseImage](#wx.chooseImage) 等接口获取到一个本地资源的临时文件路径后，可通过此接口将本地资源上传到指定服务器。
   * 客户端发起一个 HTTPS POST 请求，其中 `Content-Type` 为 `multipart/form-data` 。
   */
  export function uploadFile(options: UploadFileOptions): void;

  export interface DownloadFileResult {
    /**
     * 文件的临时路径
     */
    tempFilePath: string;
  }

  export interface DownloadFileOptions extends BaseOptions {
    /**
     * 下载资源的 url
     */
    url: string;

    /**
     * HTTP 请求 Header
     */
    header?: IData;

    /**
     * 下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'}
     */
    success?: (res?: DownloadFileResult) => void;
  }

  /**
   * 下载文件资源到本地。
   * 客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径。
   */
  export function downloadFile(options: DownloadFileOptions): void;

  export interface ConnectSocketOptions extends BaseOptions {
    /**
     * 开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名
     */
    url: string;

    /**
     * 请求的数据
     */
    data?: string;

    /**
     * HTTP Header , header 中不能设置 Referer
     */
    header?: IData;

    /**
     * 默认是GET，有效值为： OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
     */
    method?: string;
  }

  /**
   * 创建一个 [WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket?t=1477656499061) 连接；
   * **一个微信小程序同时只能有一个 WebSocket 连接，如果当前已存在一个 WebSocket 连接，会自动关闭该连接，并重新创建一个 WebSocket 连接**。
   */
  export function connectSocket(options: ConnectSocketOptions): void;

  /**
   * 监听WebSocket连接打开事件。
   */
  export function onSocketOpen(callback: (res?: any) => void): void;

  /**
   * 监听WebSocket错误。
   */
  export function onSocketError(callback: (res?: any) => void): void;

  export interface SendSocketMessageOptions extends BaseOptions {
    /**
     * 需要发送的内容
     */
    data: string | any[];
  }

  /**
   * 通过 WebSocket 连接发送数据，需要先 [wx.connectSocket](#wx.connectSocket)，并在 [wx.onSocketOpen](#wx.onSocketOpen) 回调之后才能发送。
   */
  export function sendSocketMessage(options: SendSocketMessageOptions): void;

  export interface SocketMessageResponse {
    /**
     * 服务器返回的消息
     */
    data: string | any[];
  }

  /**
   * 监听WebSocket接受到服务器的消息事件。
   */
  export function onSocketMessage(
    callback: (res?: SocketMessageResponse) => void
  ): void;

  /**
   * 关闭WebSocket连接。
   */
  export function closeSocket(): void;

  /**
   * 监听WebSocket关闭。
   */
  export function onSocketClose(callback: (res?: any) => void): void;
}
