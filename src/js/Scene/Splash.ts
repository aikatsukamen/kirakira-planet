import * as PIXI from 'pixi.js';
import { Scene, SceneManager } from 'pixi-scenes';
import MyTextureManager from '../Texture/Texture';
import { sound } from '@pixi/sound';
import * as Const from '../const';
import { ease } from 'pixi-ease';
import { whiteBack } from './Common';

export default class SplashScene extends Scene {
  /** とりあず表示してるテキスト */
  private header: PIXI.Text;
  private startButton: PIXI.Sprite;

  private screenCenterWidth: number;
  private screenCenterHeight: number;

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

    // this.header = new PIXI.Text('Splash');
    // this.header.x = this.screenCenterWidth;
    // this.header.y = this.screenCenterHeight;
    // this.header.anchor.set(0.5);
    // this.addChild(this.header);

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

    whiteBack.alpha = 0;
    this.addChild(whiteBack);
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

    // シーンのコンテナを白にフェードアウト
    const example2 = ease.add(
      whiteBack,
      {
        x: 0,
        y: 0,
        alpha: 1.0,
        rotation: 0,
        scale: 1,
        skewX: 0, // これ増やすと傾く
        blend: 0xffffff,
      },
      { repeat: false, reverse: false, duration: 1000, ease: 'easeOutSine' },
    );
    example2.on('each', () => console.log('ease updated object during frame using PIXI.Ticker.'));
    example2.once('complete', () => {
      // 終わったら遷移
      (this.scenes as SceneManager).start(Const.SCENE_LIST.playSong);
    });
  };

  public start = (): void => {
    // this.header.angle = 0;
    (this.scenes as SceneManager).start(Const.SCENE_LIST.splash);
  };

  /** 毎フレーム動くやつ */
  public update(delta: number): void {
    // this.header.angle += (delta / 1000) * 45;
  }
}
