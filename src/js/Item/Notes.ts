import * as PIXI from 'pixi.js';
import Util from '../util';
import Vector2 from './Vector2';

const SPLIT_NUM = 12; // 円を12分割した配置
const ICON_INTERVAL_DEGREE = 360 / SPLIT_NUM;

class Notes extends PIXI.Sprite {
  public id: string;
  public judge: 'perfect' | 'verygood' | 'good' | 'safe' | 'miss' = 'miss';

  /** ノーツが叩かれるべき時刻 */
  public targetTime: number;

  /** 対象の判定ラインのID */
  public trackId: number;

  /** 有効なノーツか */
  public isAwake: boolean = true;

  public scaleX: number = 0;
  public scaleY: number = 0;

  public vector: Vector2;

  constructor(c: { texture: PIXI.Texture; id: string; trackId: number; type: number; targetTime: number }) {
    super(c.texture);
    this.id = c.id;

    switch (c.type) {
      case 1: // 同時押しの色を変える
        this.tint = 0xff000;
        break;
    }

    this.visible = false;

    this.targetTime = c.targetTime;
    this.trackId = c.trackId;

    // 進行方向を計算
    var radian = 0;
    switch (c.trackId) {
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
    this.vector = new Vector2(Math.sin(radian), Math.cos(radian));
  }
}

export default Notes;
