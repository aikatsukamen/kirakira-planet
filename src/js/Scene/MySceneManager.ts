import { SceneManager } from 'pixi-scenes';
import * as PIXI from 'pixi.js';
import * as Const from '../const';
import MyTextureManager from '../Texture/Texture';
import MenuScene from './Menu';
import SplashScene from './Splash';
import GameoverScene from './GameOver';
import PlaySong from './Play';
import Result from './Result';
import Record from './Record';
import Debug from './Debug';

class MySceneManager {
  app: PIXI.Application;
  /** スマホ */
  isSP: boolean = false;

  /** 準備完了に必要なPromiseたち */
  promisesIsReady: Promise<any>[] = [];
  texManager: typeof MyTextureManager = MyTextureManager;

  constructor() {
    let w = 1600;
    let h = 900;
    this.isSP = false;

    if (window.innerWidth <= 414) {
      w = 900;
      h = 900;
      this.isSP = true;
    }

    // PIXIアプリケーション生成
    this.app = new PIXI.Application({
      width: w,
      height: h,
      backgroundColor: 0x000000,
      backgroundAlpha: 0.4,
      resolution: window.devicePixelRatio || 1,
      // autoDensity: true,
      // forceCanvas: true,
    });

    this.promisesIsReady.push(this.texManager.loadTextureByJson());
  }

  getPromisesIsReady() {
    return this.promisesIsReady;
  }

  go() {
    // PIXIの描画領域を挿入
    let roomEl = document.getElementById('room') as HTMLDivElement;
    let app = this.app;
    (window as any).app = app;
    roomEl.appendChild(app.view);

    // 初期化
    this.app.start();
    const scenes = new SceneManager(this.app);
    scenes.add(Const.SCENE_LIST.splash, new SplashScene());
    scenes.add(Const.SCENE_LIST.menu, new MenuScene());
    scenes.add(Const.SCENE_LIST.gameover, new GameoverScene());
    scenes.add(Const.SCENE_LIST.playSong, new PlaySong());
    scenes.add(Const.SCENE_LIST.record, new Record());
    scenes.add(Const.SCENE_LIST.result, new Result());
    scenes.start(Const.SCENE_LIST.splash);

    // デバッグ
    // const debugContainer = new Debug();
    // debugContainer.zIndex = 10000000;
    // this.app.stage.addChild(debugContainer);
    // debugContainer.start();
  }
}
export default MySceneManager;
