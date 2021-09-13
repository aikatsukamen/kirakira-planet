import * as PIXI from 'pixi.js';
import { Scene, SceneManager } from 'pixi-scenes';
import MyTextureManager from '../Texture/Texture';
import { sound } from '@pixi/sound';
import * as Const from '../const';
import { ease } from 'pixi-ease';
import { fadeout, whiteBack } from './Common';

export default class SplashScene extends Scene {
  private startButton: PIXI.Sprite;

  private screenCenterWidth: number;
  private screenCenterHeight: number;

  private back: PIXI.Graphics;

  public init = (): void => {
    if (!this.app) throw 'null';
    this.screenCenterWidth = this.app.screen.width / 2;
    this.screenCenterHeight = this.app.screen.height / 2;

    // 画面全体をクリック可能にする
    let back = new PIXI.Graphics().beginFill(0x1099bb).drawRect(0, 0, 5000, 2500).endFill();
    back.interactive = true;
    back.buttonMode = true;
    back.zIndex = -10;
    back.on('pointertap', this.clickBack);
    this.addChild(back);

    // Start
    const startButton = MyTextureManager.createSprite('tap_start');
    if (!startButton) return;
    this.startButton = startButton;
    startButton.x = this.screenCenterWidth;
    startButton.y = this.screenCenterHeight;
    startButton.anchor.set(0.5);
    this.addChild(startButton);

    // 音
    sound.add('se_tap', 'res/se/tap.mp3');

    this.back = whiteBack();
    this.back.alpha = 0;
    this.addChild(this.back);
  };

  isTransition: boolean = false;

  private clickBack = () => {
    // SE
    sound.play('se_tap');

    // スタートボタンを点滅させる
    ease.add(
      this.startButton,
      {
        x: this.screenCenterWidth,
        y: this.screenCenterHeight,
        alpha: 0.0,
        rotation: 0,
        scale: 1,
        skewX: 0, // これ増やすと傾く
        blend: 0xff0000,
      },
      { repeat: true, reverse: true, duration: 100, ease: 'easeOutSine' },
    );

    fadeout(this.back, this.scenes as SceneManager, Const.SCENE_LIST.menu);
  };

  // public start = (): void => {
  //   console.log('Splash start');
  // };

  /**
   * 毎フレーム動くやつ
   * @param delta 前回実行時からの差分時間
   */
  public update(delta: number): void {
    //
  }
}
