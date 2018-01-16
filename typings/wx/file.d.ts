/// <reference path="weapp.d.ts" />

declare namespace wx {
  // -- file API --

  export interface SaveFileResult {
    /**
     * 文件的保存路径
     */
    savedFilePath: string;
  }

  export interface SaveFileOptions extends BaseOptions {
    /**
     * 需要保存的文件的临时路径
     */
    tempFilePath: string;

    /**
     * 返回文件的保存路径，res = {savedFilePath: '文件的保存路径'}
     */
    success?: (res?: SaveFileResult) => void;
  }

  /**
   * 保存文件到本地。
   */
  export function saveFile(options: SaveFileOptions): void;

  export interface FileListItem {
    /**
     * 文件的本地路径
     */
    filePath: string;

    /**
     * 文件的保存时的时间戳，从1970/01/01 08:00:00 到当前时间的秒数
     */
    createTime: number;

    /**
     * 文件大小，单位B
     */
    size: number;
  }

  export interface GetSavedFileListResult {
    /**
     * 接口调用结果
     */
    errMsg: string;

    /**
     * 文件列表
     */
    fileList: FileListItem[];
  }

  export interface GetSavedFileListOptions extends BaseOptions {
    /**
     * 接口调用成功的回调函数
     */
    success?: (res?: GetSavedFileListResult) => void;
  }

  /**
   * 获取本地已保存的文件列表
   */
  export function getSavedFileList(options: GetSavedFileListOptions): void;

  export interface GetSavedFileInfoResult {
    /**
     * 接口调用结果
     */
    errMsg: string;

    /**
     * 文件的保存时的时间戳，从1970/01/01 08:00:00 到当前时间的秒数
     */
    createTime: number;

    /**
     * 文件大小，单位B
     */
    size: number;
  }

  export interface GetSavedFileInfoOptions extends BaseOptions {
    /**
     * 文件路径
     */
    filePath: string;

    /**
     * 接口调用成功的回调函数
     */
    success?: (res?: GetSavedFileInfoResult) => void;
  }

  /**
   * 获取本地文件的文件信息
   */
  export function getSavedFileInfo(options: GetSavedFileInfoOptions): void;

  export interface RemoveSavedFileOptions extends BaseOptions {
    /**
     * 需要删除的文件路径
     */
    filePath: string;
  }

  /**
   * 删除本地存储的文件
   */
  export function removeSavedFile(options: RemoveSavedFileOptions): void;

  export interface OpenDocumentOptions extends BaseOptions {
    /**
     * 文件路径，可通过 downFile 获得
     */
    filePath: string;
  }

  /**
   * 新开页面打开文档，支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx
   */
  export function openDocument(options: OpenDocumentOptions): void;
}
