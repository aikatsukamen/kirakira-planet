import * as PIXI from 'pixi.js';
import { Scene, SceneManager } from 'pixi-scenes';

export default class SplashScene extends Scene {
  public init(): void {
    if (!this.app) throw 'null';
  }

  public start(): void {
    setTimeout(() => {
      (this.scenes as SceneManager).start('gameover');
    }, 5000);
  }

  public update(delta: number): void {
    //
  }
}
