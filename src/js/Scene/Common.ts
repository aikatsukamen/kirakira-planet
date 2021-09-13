// 共通で使うオブジェクト
import { ease } from 'pixi-ease';
import { SceneManager } from 'pixi-scenes';
import * as PIXI from 'pixi.js';

/**
 * フェードアウト処理
 * whiteBackをsceneに追加しておくこと
 */
export const fadeout = (obj: any, scenes: SceneManager, targetSceneName: string) => {
  const example2 = ease.add(
    obj,
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
  example2.on('complete', () => {
    scenes.start(targetSceneName);
  });
};

/** でかい白 */
export const whiteBack = () => new PIXI.Graphics().beginFill(0xffffff).drawRect(0, 0, 5000, 2500).endFill();

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
