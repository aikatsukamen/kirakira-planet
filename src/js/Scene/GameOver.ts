import * as PIXI from 'pixi.js';
import { Scene, SceneManager } from 'pixi-scenes';

export default class SplashScene extends Scene {
  private header: PIXI.Text;

  public init(): void {
    this.header = new PIXI.Text('Game Over');
    if (!this.app) throw 'null';

    this.header.x = this.app.screen.width / 2;
    this.header.y = this.app.screen.height / 2;
    this.header.anchor.set(0.5);
    this.addChild(this.header);
  }

  public start(): void {
    this.header.angle = 0;
    setTimeout(() => {
      (this.scenes as SceneManager).start('gameover');
    }, 5000);
  }

  public update(delta: number): void {
    this.header.angle += (delta / 1000) * 45;
  }
}
