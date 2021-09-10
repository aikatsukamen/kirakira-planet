// 共通で使うオブジェクト
import * as PIXI from 'pixi.js';

/** でかい白 */
export const whiteBack = new PIXI.Graphics().beginFill(0xffffff).drawRect(0, 0, 5000, 2500).endFill();

export const circle = new PIXI.Graphics().beginFill(0x00ffff, 1).lineStyle(2, 0x000000).drawCircle(0, 0, 20);

/** ちょっとの間点滅させる */
export const effectFlash = (item: PIXI.Sprite | PIXI.Container) => {
  let count = 0;
  const flashCount = 3; // 点滅回数
  const maxCount = flashCount * 2;
  const _effect = (appear: boolean, cb: Function) => {
    item.alpha = appear ? 1 : 0;
    count += 1;
    if (count > maxCount) return cb && cb(null);
    setTimeout(() => {
      _effect(!appear, cb);
    }, 100);
  };

  _effect(false, () => {
    console.log('effectFlash end');
    item.alpha = 1;
  });
};
