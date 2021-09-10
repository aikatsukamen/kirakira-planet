import * as PIXI from 'pixi.js';
import Util from '../util';

const SPLIT_NUM = 12; // 円を12分割した配置
const ICON_INTERVAL_DEGREE = 360 / SPLIT_NUM;

class JudgeLine extends PIXI.Sprite {
  public id: number;

  constructor(c: { texture: PIXI.Texture; id: number; screenWidth: number; screenHeight: number; offsetX: number; offsetY: number }) {
    super(c.texture);
    this.id = c.id;

    var radian = 0;
    switch (c.id) {
      case 0:
        radian = Util.degree2Radian(0 * ICON_INTERVAL_DEGREE - 90);
        break;
      case 1:
        radian = Util.degree2Radian(1 * ICON_INTERVAL_DEGREE - 90);
        break;
      case 2:
        radian = Util.degree2Radian(2 * ICON_INTERVAL_DEGREE - 90);
        break;
      case 3:
        radian = Util.degree2Radian(4 * ICON_INTERVAL_DEGREE - 90);
        break;
      case 4:
        radian = Util.degree2Radian(5 * ICON_INTERVAL_DEGREE - 90);
        break;
      case 5:
        radian = Util.degree2Radian(6 * ICON_INTERVAL_DEGREE - 90);
        break;
    }
    this.position.x = Math.floor((Math.sin(radian) * c.screenWidth) / 2 + c.offsetX);
    this.position.y = Math.floor((Math.cos(radian) * c.screenHeight) / 2 + c.offsetY);

    console.log(`id=${this.id} x=${this.position.x} y=${this.position.y}`);
  }

  public fireEffect = (): void => {
    // なんかいい感じのエフェクト
  };
}

export default JudgeLine;
