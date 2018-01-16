/// <reference path="weapp.d.ts" />

declare namespace wx {
  // ---------------------------------- 界面API列表 ----------------------------------

  export interface ShowToastOptions extends BaseOptions {
    /**
     * 提示的内容
     */
    title: string;

    /**
     * 图标，只支持"success"、"loading"
     */
    icon?: "success" | "loading";

    /**
     * 提示的延迟时间，单位毫秒，默认：1500, 最大为10000
     */
    duration?: number;

    /**
     * 是否显示透明蒙层，防止触摸穿透，默认：false
     */
    mask?: boolean;
  }

  /**
   * 显示消息提示框
   */
  export function showToast(options: ShowToastOptions): void;

  /**
   * 隐藏消息提示框
   */
  export function hideToast(): void;

  export interface ShowModalResult {
    /**
     * confirm==1时，表示用户点击确定按钮
     */
    confirm: number;
  }

  export interface ShowModalOptions extends BaseOptions {
    /**
     * 提示的标题
     */
    title: string;

    /**
     * 提示的内容
     */
    content: string;

    /**
     * 是否显示取消按钮，默认为 true
     */
    showCancel?: boolean;

    /**
     * 取消按钮的文字，默认为"取消"
     */
    cancelText?: string;

    /**
     * 取消按钮的文字颜色，默认为"#000000"
     */
    cancelColor?: string;

    /**
     * 确定按钮的文字，默认为"确定"
     */
    confirmText?: string;

    /**
     * 确定按钮的文字颜色，默认为"#3CC51F"
     */
    confirmColor?: string;

    /**
     * 接口调用成功的回调函数，返回res.confirm==1时，表示用户点击确定按钮
     */
    success?: (res?: ShowModalResult) => void;
  }

  /**
   * 显示消息提示框
   */
  export function showModal(options: ShowModalOptions): void;

  export interface ShowActionSheetResult {
    /**
     * 用户是否取消选择
     */
    cancel: boolean;

    /**
     * 用户点击的按钮，从上到下的顺序，从0开始
     */
    tapIndex: number;
  }

  export interface ShowActionSheetOptions extends BaseOptions {
    /**
     * 按钮的文字数组，数组长度最大为6个
     */
    itemList: string[];

    /**
     * 按钮的文字颜色，默认为"#000000"
     */
    itemColor?: string;

    /**
     * 接口调用成功的回调函数
     */
    success?: (res?: ShowActionSheetResult) => void;
  }

  /**
   * 显示操作菜单
   */
  export function showActionSheet(options: ShowActionSheetOptions): void;
}
