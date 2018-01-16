/// <reference path="weapp.d.ts" />

declare namespace wx {
  export type keyBoardComfirmType = "done" | "next" | "search" | "go" | "send";

  export interface ShowKeyBoardOptions extends BaseOptions {
    //键盘输入框显示的默认值
    defaultValue: string;
    //键盘中文本的最大长度
    maxLength: number;
    //是否为多行输入
    multiple: boolean;
    //当点击完成时键盘是否收起
    confirmHold: boolean;
    //键盘右下角 confirm 按钮的类型，只影响按钮的文本内容
    confirmType: keyBoardComfirmType;
  }

  /**
   * 显示键盘
   */
  export function showKeyboard(options: ShowKeyBoardOptions): void;

  /**
   * 收起键盘。
   */
  export function hideKeyboard(): void;

  /**
   * 监听键盘输入事件
   * @param callback
   */
  export function onKeyboardInput(callback: Function): void;

  /**
   * 取消监听键盘输入事件
   * @param callback
   */
  export function offKeyboardInput(callback: Function): void;

  /**
   * 监听用户点击键盘 Confirm 按钮时的事件
   * @param callback
   */
  export function onKeyboardConfirm(callback: Function): void;

  /**
   * 取消监听用户点击键盘 Confirm 按钮时的事件
   * @param callback
   */
  export function offKeyboardConfirm(callback: Function): void;

  /**
   * 监听监听键盘收起的事件
   * @param callback
   */
  export function onKeyboardComplete(callback: Function): void;

  /**
   * 取消监听监听键盘收起的事件
   * @param callback
   */
  export function offKeyboardComplete(callback: Function): void;
}
