/// <reference path="weapp.d.ts" />

declare namespace wx {
  // ---------------------------------- 开放接口API列表 ----------------------------------

  export interface LoginResult {
    /**
     * 调用结果
     */
    errMsg: string;

    /**
     * 用户允许登录后，回调内容会带上 code（有效期五分钟），开发者需要将 code 发送到开发者服务器后台，
     * 使用 `code` 换取 `session_key` api，将 code 换成 openid 和 session_key
     */
    code: string;
  }

  export interface LoginOptions extends BaseOptions {
    /**
     * 接口调用成功的回调函数
     */
    success?: (res?: LoginResult) => void;
  }

  /**
   * 调用接口获取**登录凭证（code）**进而换取用户登录态信息，
   * 包括用户的**唯一标识（openid）** 及本次登录的 **会话密钥（session_key）**。**用户数据的加解密通讯**需要依赖会话密钥完成。
   */
  export function login(options: LoginOptions): void;

  export interface CheckSessionOptions extends BaseOptions {}

  /**
   * 检查登陆态是否过期
   */
  export function checkSession(options: CheckSessionOptions): void;

  export interface GetUserInfoResult {
    /**
     * 用户信息对象，不包含 openid 等敏感信息
     */
    userInfo: UserInfo;

    /**
     * 不包括敏感信息的原始数据字符串，用于计算签名。
     */
    rawData: string;

    /**
     * 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息。
     */
    signature: string;

    /**
     * 包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法
     */
    encryptData: string;
  }

  /**
   * 用户信息
   */
  export interface UserInfo {
    /**
     * 用户昵称
     */
    nickName: string;

    /**
     * 头像地址
     */
    avatarUrl: string;

    /**
     * 性别 0：未知、1：男、2：女
     */
    gender: number;

    /**
     * 省份
     */
    province: string;

    /**
     * 城市
     */
    city: string;

    /**
     * 国家
     */
    country: string;
  }

  export interface GetUserInfoOptions extends BaseOptions {
    /**
     * 接口调用成功的回调函数
     */
    success?: (res?: GetUserInfoResult) => void;
  }

  /**
   * 获取用户信息，需要先调用 wx.login 接口。
   */
  export function getUserInfo(options: GetUserInfoOptions): void;

  export interface RequestPaymentOptions extends BaseOptions {
    /**
     * 时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间
     */
    timeStamp: number;

    /**
     * 随机字符串，长度为32个字符以下。
     */
    nonceStr: string;

    /**
     * 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
     */
    package: string;

    /**
     * 签名算法，暂支持 MD5
     */
    signType: string;

    /**
     * 签名,具体签名方案参见[微信公众号支付帮助文档](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=4_3&t=1477656495417)
     */
    paySign: string;
  }

  /**
   * 发起微信支付。
   */
  export function requestPayment(options: RequestPaymentOptions): void;
}
