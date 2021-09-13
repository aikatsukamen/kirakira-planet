import * as PIXI from 'pixi.js';
import { Scene } from 'pixi-scenes';
export default class Menu extends PIXI.Container {
  private header: PIXI.Text;

  ticker = new PIXI.Ticker();

  constructor() {
    super();
    window.debug = {
      message: 'debug',
    };

    this.ticker.add(this.update);
  }

  public start(): void {
    this.ticker.start();
  }

  public update = (delta: number): void => {
    console.log(window.debug.message);
    this.drawMessage();
  };

  /** デバッグメッセージを出力 */
  private drawMessage = () => {
    const message = window.debug.message;
    if (this.header) this.header.destroy();
    this.header = new PIXI.Text(message, { fontSize: 36, dropShadow: true, dropShadowColor: 'white' });
    this.header.anchor.set(0);
    this.header.x = 5;
    this.header.y = 5;
    this.addChild(this.header);
  };
}
