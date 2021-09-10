/**
 * PIXI.Applicationを内包するクラス
 * 背景、アイテム それぞれのコンテナを管理
 *
 *
 */
import { SceneManager } from 'pixi-scenes';
import * as PIXI from 'pixi.js';
// import { gsap, Power1 } from 'gsap';
import * as Const from '../const';
import MyTextureManager from '../Texture/Texture';
import { FloorContainer, Tile } from '../Floor/Floor';
import { ItemContainer, Item } from '../Item/Item';
import UIContainer from '../UI/UI';
import baguetteBox from 'baguetteBox.js';
import MenuScene from './Menu';
import SplashScene from './Splash';
import GameoverScene from './GameOver';
import PlaySong from './Play';

class Room {
  app: PIXI.Application;
  /** スマホ */
  isSP: boolean = false;
  /** コンテナ管理用配列 */
  containerList: PIXI.Container[] = [];
  /** 準備完了に必要なPromiseたち */
  promisesIsReady: Promise<any>[] = [];
  texManager: typeof MyTextureManager = MyTextureManager;
  currentTile: { tile: any; x: number; y: number; id: number };
  /** 今操作中のアイテム */
  currentItem: Item | null = null;
  /** マス[0,0]のコンテナ内座標 */
  originFloorContainer: PIXI.Point = new PIXI.Point(0, 0);
  /** アイテムリスト */
  itemList: Map<string, Item> = new Map();
  UIContainer: UIContainer;
  /** 現在アイテムを操作中かどうか */
  isMoving: boolean = false;
  /** サンプル表示用lightboxの参照用 */
  sampleList: Map<string, any> = new Map();

  /** 配置マップ */
  itemMap: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  titleLabelList: any[] = [];
  titleKanaLabel: PIXI.Sprite;
  summaryLabel: PIXI.Sprite;

  /** 情報コンテナ */
  infoContainer: PIXI.Container;
  /** ルームの床(背景)用コンテナ */
  floorContainer: FloorContainer;
  /** ルームアイテム用コンテナ */
  itemContainer: ItemContainer;

  titleLabel: PIXI.Text;
  authorLabel1: PIXI.Sprite;
  authorLabel2: PIXI.Sprite;

  constructor() {
    let w = 1750;
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
      backgroundColor: 0xffffff,
      resolution: window.devicePixelRatio || 1,
      // autoDensity: true,
      // forceCanvas: true,
    });

    this.promisesIsReady.push(this.texManager.loadTextureByJson());
    this.initAllContainers();
  }

  getPromisesIsReady() {
    return this.promisesIsReady;
  }

  /**
   * getter
   */

  // ウィンドウリサイズ等で変わるプロパティ
  width(): number {
    return this.app.screen.width / 2;
  }
  height(): number {
    return this.app.screen.height / 2;
  }
  screenWidth(): number {
    return this.app.screen.width;
  }
  screenHeight(): number {
    return this.app.screen.height;
  }
  // 縦方向のリサイズによるスケールは考慮しない(縦方向はスクロールできるので縮めなくてよい)
  scale() {
    return this.screenWidth() < Const.ROOM_WIDTH_DEF ? this.screenWidth() / Const.ROOM_WIDTH_DEF : 1;
  }

  // 現在のタイルを外から参照したい場合
  get getCurrentTile() {
    if (this.currentTile != null) {
      return this.currentTile;
    } else {
      return null;
    }
  }

  /**
   * コンテナの生成
   */
  initAllContainers() {
    // ルームアイテム用コンテナ
    this.itemContainer = new ItemContainer();
    this.itemContainer.sortableChildren = true;
    this.containerList.push(this.itemContainer);

    // UIコンテナ
    this.UIContainer = new UIContainer();
    this.containerList.push(this.UIContainer);
  }

  /**
   *  メイン関数
   */
  go() {
    // PIXIの描画領域を挿入
    let roomEl = document.getElementById('room') as HTMLDivElement;
    let app = this.app;
    (window as any).app = app;
    roomEl.appendChild(app.view);

    // クリック可能な背景色
    let back = new PIXI.Graphics().beginFill(0x1099bb).drawRect(0, 0, 5000, 2500).endFill();
    app.stage.addChild(back);
    back.interactive = true;
    back.on('pointertap', this.setSelecting.bind(this));

    // 各コンテナを描画対象に追加
    this.containerList.map((c) => {
      app.stage.addChild(c);
    });

    // 初期化
    this.initStage();
    this.app.start();

    const scenes = new SceneManager(this.app);
    scenes.add(Const.SCENE_LIST.splash, new SplashScene());
    scenes.add(Const.SCENE_LIST.menu, new MenuScene());
    scenes.add(Const.SCENE_LIST.gameover, new GameoverScene());
    scenes.add(Const.SCENE_LIST.playSong, new PlaySong());
    scenes.start(Const.SCENE_LIST.splash);
  }

  gameLoops: PIXI.TickerCallback<any>[] = [];
  /**
   * 毎フレーム処理を追加する関数
   */
  addGameLoop(gameLoopFunction: PIXI.TickerCallback<any>) {
    this.app.ticker.add(gameLoopFunction); // 毎フレーム処理として指定した関数を追加
    this.gameLoops.push(gameLoopFunction); // 追加した関数は配列に保存する（後で登録を解除する時に使う）
  }
  /**
   * 登録している毎フレーム処理を全部削除する関数
   */
  removeAllGameLoops() {
    // gameLoopsに追加した関数を全部tickerから解除する
    for (const gameLoop of this.gameLoops) {
      this.app.ticker.remove(gameLoop);
    }
    this.gameLoops = []; // gameLoopsを空にする
  }
  /**
   * 全てのシーンを画面から取り除く関数
   */
  removeAllScene() {
    // 既存のシーンを全部削除する
    for (const scene of this.app.stage.children) {
      this.app.stage.removeChild(scene);
    }
  }

  /**
   * ステージ(ルーム背景,ルームアイテム,UI類)の初期化
   */
  initStage() {}

  /**
   * マップにアイテムを追加
   * @param {Item} item
   */
  setItem(item: Item) {
    item.on('pointertap', this.setSelecting.bind(this));
    this.itemContainer.addChild(item);
    this.itemList.set(item.name, item);
    // マップを更新
    if (!item.isWall) {
      this.updateItemMap(this.getOccupyingArea(item), 1);
    }
  }

  /**
   * ウィンドウリサイズ時、画面回転時に画面ををリフレッシュする
   */
  refleshFloor() {
    //
  }

  /**
   * マウスがある位置のマス目座標を取得する(整数)
   * @param {PIXI.Point} pMouse マウス座標
   */
  getIsoPoint(pMouse: PIXI.Point) {
    let normX; // HACK: 描画サイズ変更時は要調整
    let normY; // HACK: 描画サイズ変更時は要調整
    if (!this.isSP) {
      normX = pMouse.x / Const.ROOM_UNIT.width - 1.05; // HACK: 描画サイズ変更時は要調整
      normY = (pMouse.y - Const.ROOM_UNIT.height / 2) / Const.ROOM_UNIT.height - 3.75; // HACK: 描画サイズ変更時は要調整
    } else {
      normX = pMouse.x / Const.ROOM_UNIT.width + 1.2; // HACK: 描画サイズ変更時は要調整
      normY = (pMouse.y - Const.ROOM_UNIT.height / 2) / Const.ROOM_UNIT.height - 3.5; // HACK: 描画サイズ変更時は要調整
    }
    let isoX = Math.floor(normX - normY);
    let isoY = Math.floor(normY + normX);
    if (isoX < 0 || Const.ROOM_COL - 1 < isoX || isoY < 0 || Const.ROOM_ROW - 1 < isoY) {
      return null;
    } else {
      return new PIXI.Point(isoX, isoY);
    }
  }

  /**
   * floorIdをマス目座標に変換する
   * @param {Numvber} floorId
   */
  getIsoPointFromFloorId(floorId = 0) {
    let isoX = Math.floor(floorId % Const.ROOM_COL);
    let isoY = Math.floor(floorId / Const.ROOM_ROW);
    return new PIXI.Point(isoX, isoY);
  }

  /**
   * マップの埋/空を更新する
   * @param {Array<Pixi.Point>} occupy マス配列
   * @param {Number} fill 埋める値
   */
  updateItemMap(occupy: PIXI.Point[], fill = 1) {
    // 対象マスをfillで埋める
    Array.prototype.forEach.call(occupy, (p: any) => {
      this.itemMap[p.x][p.y] = fill;
    });
  }

  /**
   * あるマス群がマップ内か否か判定する
   * @param {Array<Pixi.Point>} occupy マス配列
   */
  isWithinRoom(occupy: PIXI.Point[] = []) {
    let within = true;
    Array.prototype.forEach.call(occupy, (p: any) => {
      if (p.x < 0 || Const.ROOM_COL <= p.x || p.y < 0 || Const.ROOM_ROW < p.y) {
        within = false;
      }
    });
    return within;
  }

  /**
   * あるマス群が空いているかどうか判定する
   * @param {Array<Pixi.Point>} occupy マス配列
   */
  isSettableArea(occupy: PIXI.Point[] = []) {
    let settable = true;
    Array.prototype.forEach.call(occupy, (p: any) => {
      if (p.x < 0 || Const.ROOM_COL <= p.x || p.y < 0 || Const.ROOM_ROW < p.y) {
        settable = false;
      } else if (this.itemMap[p.x][p.y] == 1) {
        settable = false;
      }
    });
    return settable;
  }

  /**
   * 現在占有している領域を配列で返す
   * @param {Item} target
   * @param {PIXI.Point} base
   * @returns {Array<PIXI.Point>}
   */
  getOccupyingArea(target: Item, base: PIXI.Point = target.isoPosition): PIXI.Point[] {
    let ret = new Array();

    if (target instanceof Item) {
      Array.prototype.forEach.call(target.occupy, (p: any) => {
        ret.push(new PIXI.Point(base.x + p.x, base.y - p.y));
      });
    }
    return ret;
  }

  /**
   * よく使うアニメーション
   */

  /** アイテムを点滅させる */
  setBlink(target: Item, cOrigin = 0xeeffee, cDest = 0xaaffaa) {
    console.log('setBlink');

    if (target instanceof Item) {
      // 既存の点滅アニメーションを削除
      this.removeBlink(target);

      target.tint = cOrigin;
      target.blinkTween = window.TweenMax.to(target, { duration: 0.5, pixi: { colorize: cDest, colorizeAmount: 0.5 }, ease: window.Power1.easeInOut, repeat: -1, yoyo: true });
      if (target.parts != null) {
        Array.prototype.forEach.call(target.parts, (p: any) => {
          this.setBlink(p, cOrigin, cDest);
        });
      }
    }
  }

  /** 点滅解除 */
  removeBlink(target: Item) {
    if (target instanceof Item) {
      if (target.blinkTween != null) {
        target.tint = 0xffffff;
        target.blinkTween.restart();
        target.blinkTween.pause();
        target.blinkTween = null;
      }

      if (target.parts != null) {
        Array.prototype.forEach.call(target.parts, (p: Item) => {
          this.removeBlink(p);
        });
      }
    }
  }

  /**
   * イベントハンドラ系
   */

  /**
   * アイテムを選択状態にする 他のアイテムを操作しているときは何もしない
   * @param e
   */
  setSelecting(e: any) {
    console.log(`setSelecting`);
    console.log(e.target);

    let i = e.target;
  }

  /**
   * アイテムの選択状態を解除する
   *  @param i
   */
  releaseItem(i: Item) {
    console.log(`releaseItem ${i.name}`);
    this.removeBlink(i);
    this.hideUI();
  }

  /**
   * UIコンテナをアニメーション付きで表示
   */
  showUI(mode = Const.UI_MODE.DEFAULT, time = 0.25) {
    console.log(`showUI mode=${mode}`);

    // 移動

    // 表示
    this.UIContainer.switchMode(mode);
  }

  /**
   * UIコンテナをアニメーション付きで非表示
   */
  hideUI(time = 0.25) {
    // 移動

    // 非表示
    this.UIContainer.switchMode(Const.UI_MODE.HIDE);
    this.summaryLabel.visible = true;
  }

  /**
   * 現在の選択中のアイテムを描いた人のサンプルを表示する
   */
  showSampleOfCurrent(e: Event) {
    // e.preventDefault();
    e.stopPropagation();
    if (this.currentItem != null) {
      this.showSample(this.currentItem.itemInfo.author);
    }
  }

  /**
   * 現在の選択中のアイテムを描いた人のサイトを表示する
   */
  openWebsiteOfCurrent() {
    if (this.currentItem != null && this.currentItem.itemInfo.website != null && this.currentItem.itemInfo.website != '') {
      window.open(this.currentItem.itemInfo.website, '_blank');
    }
  }

  /**
   * lightboxをリストに追加する
   */
  addSample(
    name: string,
    sample: any,
    option: {
      async: boolean;
      buttons: boolean;
    },
  ) {
    this.sampleList.set(name, sample);
  }

  /**
   * 指定された名前のlightboxを表示する
   */
  showSample(name: string) {
    setTimeout(() => {
      window.closeSampleFunc = this.closeSample.bind(this);
      window.addEventListener('click', window.closeSampleFunc);
    }, 500);
    if (this.sampleList.has(name)) {
      baguetteBox.show(0, this.sampleList.get(name)[0]);
    }
  }

  closeSample() {
    baguetteBox.hide();
    if (window.closeSampleFunc != null) {
      window.removeEventListener('click', window.closeSampleFunc);
      window.closeSampleFunc = null;
    }
  }
}

// DEBUG;
// let circle = new PIXI.Graphics()
// .beginFill(0xff0000,0.5)
// .drawCircle(p.x,p.y, 5)
// .endFill();
// this.app.stage.addChild(circle);

export default Room;
