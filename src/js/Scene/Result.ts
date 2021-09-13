import * as PIXI from 'pixi.js';
import { Scene, SceneManager } from 'pixi-scenes';
import * as Const from '../const';
import { ease } from 'pixi-ease';
import { circle, whiteBack } from './Common';

export default class Result extends Scene {
  private screenCenterWidth: number = 0;
  private screenCenterHeight: number = 0;

  private resultContainer: PIXI.Container = new PIXI.Container();

  SCREEN_HEIGHT: number;

  back: PIXI.Graphics;

  /** インスタンス生成時処理 */
  public init = (): void => {
    if (!this.app) throw 'null';
    this.screenCenterWidth = this.app.screen.width / 2;
    this.screenCenterHeight = this.app.screen.height / 2;

    // ロード画面用の白
    this.back = whiteBack();
    this.addChild(this.back);
    this.createExitButton();
    this.resultContainer = new PIXI.Container();
    this.addChild(this.resultContainer);
  };

  /** シーンが呼ばれた時の処理 */
  public start = (): void => {
    console.log(`Result start`);
    this.back.alpha = 0;

    this.resultContainer.children.map((item) => (item.alpha = 0));
    this.resultContainer.children.map((item) => item.destroy());
    this.createResult();

    // もろもろ終わったらフェードイン
    const example = ease.add(
      this.back,
      {
        x: 0,
        y: 0,
        alpha: 0.0,
        rotation: 0,
        scale: 1,
        skewX: 0, // これ増やすと傾く
        blend: 0xffffff,
      },
      { repeat: false, reverse: false, duration: 1000, ease: 'easeOutSine' },
    );
    example.on('complete', () => {
      // フェードイン後
    });
  };

  /** 戻るを作る */
  private createExitButton = () => {
    // 右下に配置
    const container = new PIXI.Container();
    this.addChild(container);
    container.x = this.screenCenterWidth * 2 - 100;
    container.y = this.screenCenterHeight * 2 - 100;

    const text = new PIXI.Text('back', { fontSize: 36 });
    text.zIndex = 2;
    text.y = -10;

    const button = circle;
    button.scale.x = 2;
    button.scale.y = 2;
    button.interactive = true;
    button.buttonMode = true;
    button.on('pointertap', () => {
      (this.scenes as SceneManager).start(Const.SCENE_LIST.menu);
    });
    container.addChild(button);
    container.addChild(text);
  };

  private createResult = () => {
    const results = [
      {
        label: 'PERFECT',
        num: window.musicResult.judge.perfect,
      },
      {
        label: 'VERY GOOD',
        num: window.musicResult.judge.verygood,
      },
      {
        label: 'GOOD',
        num: window.musicResult.judge.good,
      },
      {
        label: 'SAFE',
        num: window.musicResult.judge.safe,
      },
      {
        label: 'MISS',
        num: window.musicResult.judge.miss,
      },
      {
        label: 'Total Score',
        num: window.musicResult.totalScore,
      },
    ];

    let startX = this.screenCenterWidth;
    let startY = 100;
    let i = 0;
    for (const result of results) {
      const text = new PIXI.Text(`${result.label}：${result.num}`, { fontSize: 36 });
      text.anchor.set(0.5);
      text.x = startX;
      text.y = startY + text.height * i;

      this.resultContainer.addChild(text);
      i++;
    }
  };

  // /**
  //  * 毎フレーム動くやつ
  //  * @param delta 前回からの差分
  //  */
  // public update = (delta: number): void => {
  //   //
  // };
}
