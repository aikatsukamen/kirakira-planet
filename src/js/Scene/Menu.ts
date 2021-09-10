import * as PIXI from 'pixi.js';
import { Scene, SceneManager } from 'pixi-scenes';
import { ease } from 'pixi-ease';
import * as Const from '../const';

export default class SplashScene extends Scene {
  private header: PIXI.Text;
  private back: PIXI.Graphics;

  private screenCenterWidth: number;
  private screenCenterHeight: number;

  public init(): void {
    this.header = new PIXI.Text('My Game Studio');
    if (!this.app) throw 'null';
    this.screenCenterWidth = this.app.screen.width / 2;
    this.screenCenterHeight = this.app.screen.height / 2;

    this.header.x = this.screenCenterWidth;
    this.header.y = this.screenCenterHeight;
    this.header.anchor.set(0.5);
    this.addChild(this.header);

    this.back = new PIXI.Graphics().beginFill(0xffffff).drawRect(0, 0, 5000, 2500).endFill();
    this.addChild(this.back);
  }

  public start(): void {
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
    example.once('complete', () => {
      // フェードイン後
    });
  }

  public update(delta: number): void {
    this.header.angle += (delta / 1000) * 45;
  }
}
