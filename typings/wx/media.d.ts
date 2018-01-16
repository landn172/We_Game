/// <reference path="weapp.d.ts" />

declare namespace wx {
  // ---------------------------------- 媒体API列表 ----------------------------------

  export interface ChooseImageResult {
    /**
     * 本地文件路径列表
     */
    tempFilePaths: string;
  }

  export interface ChooseImageOptions extends BaseOptions {
    /**
     * 最多可以选择的图片张数，默认9
     */
    count?: number;

    /**
     * original 原图，compressed 压缩图，默认二者都有
     */
    sizeType?: string[];

    /**
     * album 从相册选图，camera 使用相机，默认二者都有
     */
    sourceType?: string[];

    /**
     * 成功则返回图片的本地文件路径列表 tempFilePaths
     */
    success?: (res?: ChooseImageResult) => void;
  }

  /**
   * 从本地相册选择图片或使用相机拍照。
   */
  export function chooseImage(options: ChooseImageOptions): void;

  export interface PreviewImageOptions extends BaseOptions {
    /**
     * 当前显示图片的链接，不填则默认为 urls 的第一张
     */
    current?: string;

    /**
     * 需要预览的图片链接列表
     */
    urls: string[];
  }

  /**
   * 预览图片。
   */
  export function previewImage(options: PreviewImageOptions): void;

  export interface GetImageInfoResult {
    /**
     * 图片宽度，单位px
     */
    width: number;

    /**
     * 图片高度 单位px
     */
    height: number;
  }

  export interface GetImageInfoOptions extends BaseOptions {
    /**
     * 图片的路径，可以是相对路径，临时文件路径，存储文件路径
     */
    src: string;

    /**
     * 接口调用成功的回调函数，包含图片信息
     */
    success?: (res?: GetImageInfoResult) => void;
  }

  /**
   * 获取图片信息
   */
  export function getImageInfo(options: GetImageInfoOptions): void;

  export interface StartRecordResult {
    /**
     * 录音文件的临时路径
     */
    tempFilePath: string;
  }

  export interface StartRecordOptions extends BaseOptions {
    /**
     * 录音成功后调用，返回录音文件的临时文件路径，res = {tempFilePath: '录音文件的临时路径'}
     */
    success?: (res?: StartRecordResult) => void;
  }

  /**
   * 开始录音。当主动调用 `wx.stopRecord`，或者录音超过1分钟时自动结束录音，返回录音文件的临时文件路径。
   */
  export function startRecord(options: StartRecordOptions): void;

  /**
   *​ 主动调用停止录音。
   */
  export function stopRecord(): void;

  export interface PlayVoiceOptions extends BaseOptions {
    /**
     * 需要播放的语音文件的文件路径
     */
    filePath: string;
  }

  /**
   * 开始播放语音，同时只允许一个语音文件正在播放，如果前一个语音文件还没播放完，将中断前一个语音播放。
   */
  export function playVoice(options: PlayVoiceOptions): void;

  /**
   * 暂停正在播放的语音。
   * 再次调用wx.playVoice播放同一个文件时，会从暂停处开始播放。如果想从头开始播放，需要先调用 wx.stopVoice。
   */
  export function pauseVoice(): void;

  /**
   * 结束播放语音。
   */
  export function stopVoice(): void;

  export interface GetBackgroundAudioPlayerStateResult {
    /**
     * 选定音频的长度（单位：s），只有在当前有音乐播放时返回
     */
    duration: number;

    /**
     * 选定音频的播放位置（单位：s），只有在当前有音乐播放时返回
     */
    currentPosition: number;

    /**
     * 播放状态（2：没有音乐在播放，1：播放中，0：暂停中）
     */
    status: number;

    /**
     * 音频的下载进度（整数，80 代表 80%），只有在当前有音乐播放时返回
     */
    downloadPercent: number;

    /**
     * 歌曲数据链接，只有在当前有音乐播放时返回
     */
    dataUrl: string;
  }

  export interface GetBackgroundAudioPlayerStateOptions extends BaseOptions {
    /**
     * 接口调用成功的回调函数
     */
    success?: (res?: GetBackgroundAudioPlayerStateResult) => void;
  }

  /**
   * 获取音乐播放状态。
   */
  export function getBackgroundAudioPlayerState(
    options: GetBackgroundAudioPlayerStateOptions
  ): void;

  export interface PlayBackgroundAudioOptions extends BaseOptions {
    /**
     * 音乐链接
     */
    dataUrl: string;

    /**
     * 音乐标题
     */
    title?: string;

    /**
     * 封面URL
     */
    coverImgUrl?: string;
  }

  /**
   * 播放音乐，同时只能有一首音乐正在播放。
   */
  export function playBackgroundAudio(
    options: PlayBackgroundAudioOptions
  ): void;

  /**
   * 暂停播放音乐。
   */
  export function pauseBackgroundAudio(): void;

  export interface SeekBackgroundAudioOptions extends BaseOptions {
    /**
     * 音乐位置，单位：秒
     */
    position: number;
  }

  /**
   * 播放音乐，同时只能有一首音乐正在播放。
   */
  export function seekBackgroundAudio(
    options: SeekBackgroundAudioOptions
  ): void;

  /**
   * 停止播放音乐。
   */
  export function stopBackgroundAudio(): void;

  /**
   * 监听音乐播放。
   */
  export function onBackgroundAudioPlay(callback: (res?: any) => void): void;

  /**
   * 监听音乐暂停。
   */
  export function onBackgroundAudioPause(callback: (res?: any) => void): void;

  /**
   * 监听音乐停止。
   */
  export function onBackgroundAudioStop(callback: (res?: any) => void): void;

  export interface ChooseVideoResult {
    /**
     * 选定视频的临时文件路径
     */
    tempFilePath: string;

    /**
     * 选定视频的时间长度
     */
    duration: number;

    /**
     * 选定视频的数据量大小
     */
    size: number;

    /**
     * 返回选定视频的长
     */
    height: number;

    /**
     * 返回选定视频的宽
     */
    width: number;
  }

  export interface ChooseVideoOptions extends BaseOptions {
    /**
     * album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera']
     */
    sourceType?: string[];

    /**
     * 拍摄视频最长拍摄时间，单位秒。最长支持60秒
     */
    maxDuration?: number;

    /**
     * 前置或者后置摄像头，默认为前后都有，即：['front', 'back']
     */
    camera?: string[];

    /**
     * 接口调用成功，返回视频文件的临时文件路径
     */
    success?: (res?: ChooseVideoResult) => void;
  }

  /**
   * 拍摄视频或从手机相册中选视频，返回视频的临时文件路径。
   */
  export function chooseVideo(options: ChooseVideoOptions): void;

  /**
   * `audioContext` 通过 audioId 跟一个 audio 组件绑定，通过它可以操作一个 audio 组件。
   */
  export interface AudioContext {
    /**
     * 音频的地址
     */
    setSrc(src: string): void;

    /**
     * 播放
     */
    play(): void;

    /**
     * 暂停
     */
    pause(): void;

    /**
     * 跳转到指定位置，单位 s
     */
    seek(position: number): void;
  }

  /**
   * 创建并返回 audio 上下文 `AudioContext` 对象
   */
  export function createAudioContext(audioId: string): AudioContext;

  /**
   * `videoContext` 通过 videoId 跟一个 video 组件绑定，通过它可以操作一个 video 组件。
   */
  export interface VideoContext {
    /**
     * 播放
     */
    play(): void;

    /**
     * 暂停
     */
    pause(): void;

    /**
     * 跳转到指定位置，单位 s
     */
    seek(position: number): void;

    /**
     * 发送弹幕，danmu 包含两个属性 text, color
     */
    sendDanmu(danmu: { text: string; color: string }): void;
  }

  /**
   * 创建并返回 video 上下文 `VideoContext` 对象
   */
  export function createVideoContext(videoId: string): VideoContext; 
}
