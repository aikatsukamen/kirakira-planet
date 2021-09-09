/**
 * PIXI.Applicationを内包するクラス
 * 背景、アイテム それぞれのコンテナを管理
 *
 *
 */
import * as PIXI from 'pixi.js';
// import { gsap, Power1 } from 'gsap';
import * as Const from '../const';
import { MyTextureManager } from '../Texture/Texture';
import { FloorContainer, Tile } from '../Floor/Floor';
import { ItemContainer, Item } from '../Item/Item';
import UIContainer from '../UI/UI';
import baguetteBox from 'baguetteBox.js';

class Room {
  app: PIXI.Application;
  /** スマホ */
  isSP: boolean = false;
  containerList: PIXI.Container[];
  p_floor: any[];
  promisesIsReady: Promise<any>[];
  texManager: MyTextureManager;
  currentTile: { tile: any; x: number; y: number; id: number };
  currentItem: Item | null;
  originFloorContainer: PIXI.Point;
  itemList: Map<string, Item>;
  UIContainer: UIContainer;
  isMoving: boolean;
  sampleList: Map<string, any>;

  /** 配置マップ */
  itemMap: number[][];
  titleLabelList: any[];
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
    // this.iniResolution = { width: window.innerWidth, height: window.innerHeight };
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
    });

    // コンテナ管理用配列
    this.containerList = new Array();

    // 床タイルの座標配列
    this.p_floor = new Array();

    this.promisesIsReady = new Array();

    // テクスチャマネージャー
    this.texManager = new MyTextureManager();
    this.promisesIsReady.push(this.texManager.loadTextureByJson());

    this.initAllContainers();

    // マウスが乗ってるタイル
    this.currentTile = { tile: null, x: 0, y: 0, id: 0 };

    // 今操作中のアイテム
    this.currentItem = null;

    // マス[0,0]のコンテナ内座標
    this.originFloorContainer = new PIXI.Point(0, 0);

    // アイテムリスト
    this.itemList = new Map();

    // 現在選択中のアイテム(強参照でそのまま持つけどまあ...)
    this.currentItem = null;

    // 現在アイテムを操作中かどうか
    this.isMoving = false;

    // サンプル表示用lightboxの参照用
    this.sampleList = new Map();

    // 配置マップ
    this.itemMap = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];

    this.titleLabelList = new Array();
    // this.titleKanaLabel = new PIXI.Sprite();
    // this.summaryLabel = new PIXI.Sprite();
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
    // this.app.stage.sortChildren = true; // 関数にboolean入れてるのよくわからん

    // 情報コンテナ
    this.infoContainer = new PIXI.Container();
    this.infoContainer.zIndex = -10000;
    this.containerList.push(this.infoContainer);

    // ルームの床(背景)用コンテナ
    this.floorContainer = new FloorContainer();
    this.floorContainer.sortableChildren = true;
    this.containerList.push(this.floorContainer);

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
    // ルーム要素にPIXIの描画領域を挿入
    let roomEl = document.getElementById('room') as HTMLDivElement;
    let app = this.app;
    (window as any).app = app;
    roomEl.appendChild(app.view);

    // 背景と同サイズの透過DisplayObjectを配置
    let back = new PIXI.Graphics()
      .beginFill(0x1099bb)
      // .beginFill(0xff4162)
      // .beginFill(0x56aa00)
      .drawRect(0, 0, 5000, 2500)
      .endFill();
    app.stage.addChild(back);
    back.interactive = true;
    back.on('pointertap', this.setSelecting.bind(this));

    this.containerList.map((c) => {
      app.stage.addChild(c);
    });
    this.initStage();

    // どれか1つアイテムを選択状態にしておく(操作可能であることを閲覧者に伝えるため)
    // TODO: ランダム選択
    // アイテムをランダムで選択
    // setTimeout(() => {
    //   if (this.currentItem == null) {
    //     this.setSelecting({ target: this.itemList.get('megochimo_buta') } as any);
    //   }
    // }, 900);

    // ローディングスクリーン非表示
    let loading = document.querySelector('#loading') as HTMLDivElement;
    loading.style.display = 'none';

    // Spine
    // const onLoadAnim = (loader: any, resources: any) => {
    //   var shibuyaHand = new spine.Spine(resources.rinHand.spineData);
    //   shibuyaHand.scale.x = shibuyaHand.scale.y = 0.55;

    //   // add the animation to the scene and render...
    //   this.app.stage.addChild(shibuyaHand);

    //   // run
    //   if (shibuyaHand.state.hasAnimation('stand')) {
    //     shibuyaHand.state.setAnimation(0, 'stand', true);
    //     shibuyaHand.state.timeScale = 1.0;
    //   }

    //   shibuyaHand.x = -500;
    // };

    this.app.start();
  }

  /**
   * ステージ(ルーム背景,ルームアイテム,UI類)の初期化
   */
  initStage() {
    this.initFloor(); // 背景コンテナ初期化
    this.initItems(); // アイテムコンテナ初期化
    this.initUI(); // UIコンテナ初期化
    this.initBookInfo(); // 合同誌の情報の表示
  }

  /**
   *  ルームの床タイルを初期化
   */
  initFloor() {
    return new Promise((resolve, reject) => {
      this.refleshFloor();

      // row x colで床タイルを敷き詰める
      for (let i = 0; i < this.p_floor.length; i++) {
        let tile;
        if (Const.TILE_MAP[i]) {
          tile = new Tile(this.texManager.getTexruteByName(Const.TEX_TB));
        } else {
          tile = new Tile(this.texManager.getTexruteByName(Const.TEX_TW));
        }

        // f.anchor.set(0.5);
        tile.interactive = true;
        // tile.buttonMode = true;
        tile.x = this.p_floor[i][0];
        tile.y = this.p_floor[i][1];
        tile.floorId = i;
        tile.zIndex = this.p_floor[i][1] + 1; // 1以上になっていないとInteractionEventが発火しない...？

        // 当たり判定用Polygon
        // 公式ドキュメントと型が食い違ってる
        const poly = new PIXI.Polygon(
          new PIXI.Point(0, Const.ROOM_UNIT.height / 2) as any,
          new PIXI.Point(Const.ROOM_UNIT.width / 2, Const.ROOM_UNIT.height) as any,
          new PIXI.Point(Const.ROOM_UNIT.width, Const.ROOM_UNIT.height / 2) as any,
          new PIXI.Point(Const.ROOM_UNIT.width / 2, 0) as any,
        );
        tile.hitArea = poly;
        tile.on('mousedown', this.onFloorClick.bind(this)).on('touchstart', this.onFloorClick.bind(this));

        // 選択タイルをハイライトする用のポリゴン
        const highlightGreen = new PIXI.Graphics()
          .beginFill(0x00ff88)
          .drawPolygon([
            0,
            Const.ROOM_UNIT.height / 2,
            Const.ROOM_UNIT.width / 2 + 1,
            Const.ROOM_UNIT.height,
            Const.ROOM_UNIT.width + 1,
            Const.ROOM_UNIT.height / 2,
            Const.ROOM_UNIT.width / 2 + 1,
            0,
          ])
          .endFill();
        highlightGreen.alpha = 0.5;
        highlightGreen.zIndex = 1000;
        highlightGreen.visible = false;
        let highlightRed = new PIXI.Graphics()
          .beginFill(0xff4444)
          .drawPolygon([
            0,
            Const.ROOM_UNIT.height / 2,
            Const.ROOM_UNIT.width / 2 + 1,
            Const.ROOM_UNIT.height,
            Const.ROOM_UNIT.width + 1,
            Const.ROOM_UNIT.height / 2,
            Const.ROOM_UNIT.width / 2 + 1,
            0,
          ])
          .endFill();
        highlightRed.alpha = 0.5;
        highlightRed.zIndex = 1000;
        highlightRed.visible = false;
        tile.addChild(highlightGreen);
        tile.addChild(highlightRed);
        this.floorContainer.addChild(tile);
      }

      this.floorContainer.x = this.app.screen.width / 2 + Const.CONT_OFFS_FLOOR.x;
      this.floorContainer.y = this.app.screen.height / 2 + Const.CONT_OFFS_FLOOR.y + 50;
      if (!this.isSP) {
        this.floorContainer.y += 50;
      }
      this.floorContainer.pivot.x = this.floorContainer.x / 2;
      this.floorContainer.pivot.y = this.floorContainer.y / 2;

      let b = this.floorContainer.getBounds();
      this.originFloorContainer = new PIXI.Point(b.x, b.y);

      this.getScreenPointFromIso();
    });
  }

  /**
   * ルームアイテムを初期化
   */
  initItems() {
    // ルームアイテムオブジェクトの生成
    for (let [name, info] of Object.entries(Const.ITEMINFO)) {
      let i;
      if (!info.multipart) {
        // 単一パーツのアイテム
        const texture = this.texManager.getTexruteByName(name) as PIXI.Texture;
        i = new Item({ texture, name: name, root: null, info: info, partOffs: { x: 0, y: 0, z: 0 } });
      } else {
        // 複数パーツのアイテム
        i = new Item({
          texture: this.texManager.getTexruteByName(name + '_' + 'nearest') as PIXI.Texture,
          name: name + '_' + 'nearest',
          root: null,
          info: info,
          partOffs: (info as any).parts.nearest,
        });
        for (let [id, v] of Object.entries((info as any).parts)) {
          if (id != 'nearest') {
            let p = new Item({ texture: this.texManager.getTexruteByName(name + '_' + id) as PIXI.Texture, name: name, root: i, info: info, partOffs: v });
            this.setItem(p);
          }
        }
      }
      // ルームアイテムオブジェクトの配置
      this.setItem(i);
    }
  }

  /**
   * マップにアイテムを追加
   * @param {Item} item
   */
  setItem(item: Item) {
    item.on('pointertap', this.setSelecting.bind(this));
    let position = new PIXI.Point((item as any).itemInfo.x, (item as any).itemInfo.y);
    this.itemContainer.addChild(item);
    this.itemList.set(item.name, item);
    this.moveItemOnTile(item, position);
    // マップを更新
    if (!item.isWall) {
      this.updateItemMap(this.getOccupyingArea(item), 1);
    }
  }

  /**
   * UIを初期化
   */
  initUI() {
    // UIコンテナ初期化
    this.UIContainer.x = this.app.screen.width / 2;
    this.UIContainer.y = this.app.screen.height / 2 + Const.CONT_OFFS_UI.y;
    this.UIContainer.alpha = 0;
    this.UIContainer.visible = true;
    this.UIContainer.init();

    // ボタンにイベント登録(クソ以下のコード)
    this.UIContainer.moveBtn.setClickEventListner(this.setMoving.bind(this));
    this.UIContainer.cancelBtn.setClickEventListner(this.cancelMove.bind(this));
    this.UIContainer.setBtn.setClickEventListner(this.fixMove.bind(this));
    this.UIContainer.sampleBtn.setClickEventListner(this.showSampleOfCurrent.bind(this));
    this.UIContainer.linkBtn.setClickEventListner(this.openWebsiteOfCurrent.bind(this));
  }

  /**
   * ウィンドウリサイズ時、画面回転時にステージをリフレッシュする
   * @todo すべきことはあとからわかるはず(とりあえずスプライトの座標を更新している)
   */
  refleshFloor() {
    let cx = this.width() / 2 - 5;
    let cy = this.height() / 2;
    let dw = Const.ROOM_UNIT.width / 2;
    let dh = Const.ROOM_UNIT.height / 2;
    // 背景コンテナ内での各タイルのローカル座標
    this.p_floor = [
      [cx - dw * 7, dh * 7],
      [cx - dw * 6, dh * 6],
      [cx - dw * 5, dh * 5],
      [cx - dw * 4, dh * 4],
      [cx - dw * 3, dh * 3],
      [cx - dw * 2, dh * 2],
      [cx - dw, dh],
      [cx, 0],
      [cx - dw * 6, dh * 8],
      [cx - dw * 5, dh * 7],
      [cx - dw * 4, dh * 6],
      [cx - dw * 3, dh * 5],
      [cx - dw * 2, dh * 4],
      [cx - dw, dh * 3],
      [cx, dh * 2],
      [cx + dw, dh],
      [cx - dw * 5, dh * 9],
      [cx - dw * 4, dh * 8],
      [cx - dw * 3, dh * 7],
      [cx - dw * 2, dh * 6],
      [cx - dw, dh * 5],
      [cx, dh * 4],
      [cx + dw, dh * 3],
      [cx + dw * 2, dh * 2],
      [cx - dw * 4, dh * 10],
      [cx - dw * 3, dh * 9],
      [cx - dw * 2, dh * 8],
      [cx - dw, dh * 7],
      [cx, dh * 6],
      [cx + dw, dh * 5],
      [cx + dw * 2, dh * 4],
      [cx + dw * 3, dh * 3],
      [cx - dw * 3, dh * 11],
      [cx - dw * 2, dh * 10],
      [cx - dw, dh * 9],
      [cx, dh * 8],
      [cx + dw, dh * 7],
      [cx + dw * 2, dh * 6],
      [cx + dw * 3, dh * 5],
      [cx + dw * 4, dh * 4],
      [cx - dw * 2, dh * 12],
      [cx - dw, dh * 11],
      [cx, dh * 10],
      [cx + dw, dh * 9],
      [cx + dw * 2, dh * 8],
      [cx + dw * 3, dh * 7],
      [cx + dw * 4, dh * 6],
      [cx + dw * 5, dh * 5],
      [cx - dw, dh * 13],
      [cx, dh * 12],
      [cx + dw, dh * 11],
      [cx + dw * 2, dh * 10],
      [cx + dw * 3, dh * 9],
      [cx + dw * 4, dh * 8],
      [cx + dw * 5, dh * 7],
      [cx + dw * 6, dh * 6],
      [cx, dh * 14],
      [cx + dw, dh * 13],
      [cx + dw * 2, dh * 12],
      [cx + dw * 3, dh * 11],
      [cx + dw * 4, dh * 10],
      [cx + dw * 5, dh * 9],
      [cx + dw * 6, dh * 8],
      [cx + dw * 7, dh * 7],
    ];

    if (this.floorContainer) {
      // 何でlength
      // c.x = p_floor[i][0];
      // c.y = p_floor[i][1];
      // c.zIndex = p_floor[i][1];
    } else {
      // console.log('床が未生成なのでなんもしません');
    }
  }

  /**
   * ルームを画面サイズに合わせてリサイズする
   */
  // resizeRoom() {
  //     let width = window.innerWidth;
  //     let height = window.innerHeight < ROOM_HEIGHT_DEF ? ROOM_HEIGHT_DEF : innerHeight;
  //     this.app.width = width;
  //     this.app.height = height;
  //     this.app.screen.width = width;
  //     this.app.screen.height = height;
  // }

  // resizeContainer(container) {
  // }

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
   * マス目座標のスクリーン上(floorContainer内)の位置を取得する
   * @param {PIXI.Point} pIso マス目座標([0,0] ~ [7,7])
   */
  getScreenPointFromIso(pIso = new PIXI.Point(0, 0)) {
    // floorContainer原点で初期化
    let origin = new PIXI.Point(
      this.originFloorContainer.x + Const.ROOM_UNIT.width / 2, //  + this.p_floor[0][0],
      this.originFloorContainer.y + Const.ROOM_UNIT.height / 2 + this.p_floor[0][1],
    );
    let pScreen = origin;
    pScreen.x += (Const.ROOM_UNIT.width / 2) * (pIso.x + pIso.y);
    pScreen.y += (Const.ROOM_UNIT.height / 2) * (pIso.y - pIso.x);
    return pScreen;
  }

  /**
   * アイテムを指定したマスの上に移動させる
   * @param {Item(Item)} item  {PIXI.Point} pIso マス目座標([0,0] ~ [7,7])
   */
  moveItemOnTile(item: Item, pIso = new PIXI.Point(0, 0)) {
    if (!(item instanceof Item) || !(pIso instanceof PIXI.Point)) {
      return false;
    }

    item.move(this.getScreenPointFromIso(pIso), pIso);
    return true;
  }

  /**
   * マップ更新系
   */

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
   * 指定された座標のタイル群をハイライトする
   * @param pIsoArray ハイライトするタイルの座標群(マス)
   * @param red 赤でハイライトする場合のフラグ(PIXI.Graphicsの色を後から変更できないので仕方なしにハイライトを2種類もつ)
   */
  highlightTiles(pIsoArray: PIXI.Point[] = [], red = false) {
    // 全タイルのハイライトをクリア
    Array.prototype.forEach.call(this.floorContainer.children, (t: Tile) => {
      if (t instanceof Tile) {
        t.children[0].visible = false;
        t.children[1].visible = false;
      }
    });

    // ハイライト
    Array.prototype.forEach.call(pIsoArray, (p: PIXI.Point) => {
      // 現在のタイルのハイライトをオン
      let tile = Array.prototype.find.call(this.floorContainer.children, (t: Tile) => {
        return t.floorId == p.x + p.y * Const.ROOM_COL;
      });

      if (red) {
        tile.children[1].visible = true;
      } else {
        tile.children[0].visible = true;
      }
    });
  }

  /**
   * 指定された座標のタイルをハイライトする
   * @param pIso ハイライトするタイルの座標(マス)
   * @param red 赤でハイライトする場合のフラグ(PIXI.Graphicsの色を後から変更できないので仕方なしにハイライトを2種類もつ)
   */
  highlightTile(pIso: PIXI.Point, red = false) {
    let p = [pIso];
    this.highlightTiles(p, red);
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
    if (this.isMoving) {
      // 移動操作中はなんもしない
      console.log(`isMoving = ${this.isMoving}`);
      return;
    }

    if (i instanceof Item) {
      if (Object.is(i, this.currentItem)) {
        // 今と同じならなんもしない
        console.log('なんもせん');
        return;
      } else if (this.currentItem != null && !Object.is(i, this.currentItem)) {
        // 既に選択中で操作中でないアイテムの選択状態を解除
        let prev = this.currentItem;
        this.releaseItem(prev);
      }

      // まだ何も選択していない or 既に選択中のものとは別のアイテムの場合選択状態、新しい方を選択状態に
      this.currentItem = i;

      // アイテム名ラベル設定
      // this.UIContainer.setLabel(i.itemInfo.label);
      this.UIContainer.setLabel(i.itemInfo.author);

      // 元の位置を覚えておく
      this.currentItem.prevPosition = new PIXI.Point(i.position.x, i.position.y);
      this.currentItem.prevIsoPosition = this.currentItem.isoPosition;

      // ビョンてなるアニメーション
      if (!i.tween) {
        // scaleX: 1.1*i.itemInfo.scale
        i.tween = window.TweenMax.to(i, {
          duration: 0.15,
          pixi: { scaleY: 1.1 * i.itemInfo.scale },
          ease: window.Power1.easeInOut,
          repeat: 1,
          yoyo: true,
          onComplete: () => {
            (i as Item).tween = null;
            this.setBlink(i as Item, 0xeeffee, 0xaaffaa);
          },
        });
        if (i.parts != null) {
          Array.prototype.forEach.call(i.parts, (p: Item) => {
            p.tween = window.TweenMax.to(p, { duration: 0.15, pixi: { scaleY: 1.1 * (i as Item).itemInfo.scale }, ease: window.Power1.easeInOut, repeat: 1, yoyo: true });
          });
        } else {
          console.log('ココ');
        }
      } else {
        console.log('tween未設定');
      }

      // UIを表示
      this.showUI();
    } else {
      // アイテム以外(現状は床以外の背景)が押されたら選択中アイテムの選択状態を解除
      if (this.currentItem != null) {
        let prev = this.currentItem;
        this.releaseItem(prev);
      }
      this.currentItem = null;
      this.hideUI();
    }
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
   * アイテムを移動モードにする
   * @param e
   */
  setMoving(e: any) {
    let i = this.currentItem;
    if (i != null) {
      this.isMoving = true;

      // 一瞬今のUIを下に下げてそのあと移動中UIを表示する
      this.hideUI(0.1)
        .then(() => {
          this.showUI(Const.UI_MODE.MOVE, 0.2);
        })
        .catch((e) => {
          console.trace();
          console.error(e);
        });

      i.data = e.data;
      i.moving = true;
      i.setZIndex(10000);
      let height = i.texture.baseTexture.height;
      i.setAnchor(i.anchor.x, 1.0 + 30 / height); // 約50浮かす

      // 当たり判定用Polygon更新
      if (i.customHit != null) {
        let pArray: number[] = [];
        Array.prototype.forEach.call(i.customHit, (p: number, i: number) => {
          if (i % 2) {
            // y座標を-50
            pArray.push(p - 50);
          } else {
            // x座標はそのまま
            pArray.push(p);
          }
        });
        let poly = new PIXI.Polygon(pArray);
        i.hitArea = poly;

        //     let debug = new PIXI.Graphics()
        //     .beginFill(0xff4444)
        //     .drawPolygon(pArray)
        //     .endFill();
        //     debug.alpha = 0.75;
        //     i.removeChildAt(0);
        //     i.addChild(debug);
      }

      this.highlightTiles(this.getOccupyingArea(i)); // アイテムがある位置のタイルをハイライト

      // ドラッグ移動のイベントリスナー登録
      i.on('pointerdown', this.onItemDragStart.bind(this));

      // 床全体にイベントハンドラを貼る
      Array.prototype.forEach.call(this.floorContainer.children, (f: any) => {
        f.on('pointertap', this.moveItemOnIsoWithSnap.bind(this));
      });

      // 全てのアイテムを非インタラクティブに
      Array.prototype.forEach.call(this.itemContainer.children, (ii: any) => {
        if (!Object.is(i, ii) && ii.root != i) {
          ii.alpha = 0.5;
          ii.interactive = false;
        }
      });

      // 自分のいたところを空ける
      if (!i.isWall) {
        this.updateItemMap(this.getOccupyingArea(i, i.isoPosition), 0);
      }
    }
  }

  /**
   * 移動をキャンセルする
   */
  cancelMove() {
    if (this.isMoving) {
      let i = this.currentItem as Item;
      i.move(i.prevPosition, i.prevIsoPosition);
      this.setBlink(i, 0xeeffee, 0xaaffaa);
    }
    this.finishMoving();
  }

  /**
   * 移動を確定する
   */
  fixMove() {
    let i = this.currentItem as Item;
    i.move(i.position, i.isoPosition); // zIndexを正しくする

    // 直前位置を現在位置に更新
    i.prevPosition = new PIXI.Point(i.position.x, i.position.y);
    i.prevIsoPosition = i.isoPosition;

    // ギュンてなるやつ(完了待たない)
    window.TweenMax.to(i, { duration: 0.1, pixi: { scaleY: 0.9 * i.itemInfo.scale }, ease: window.Power1.easeInOut, repeat: 1, yoyo: true });
    if (i.parts != null) {
      Array.prototype.forEach.call(i.parts, (p: Item) => {
        p.tween = window.TweenMax.to(p, { duration: 0.1, pixi: { scaleY: 0.9 * p.itemInfo.scale }, ease: window.Power1.easeInOut, repeat: 1, yoyo: true });
      });
    }
    this.finishMoving();
  }

  /**
   * 移動モードを終了する
   */
  finishMoving() {
    let i = this.currentItem as Item;
    i.moving = false;
    i.data = null;
    i.setAnchor(i.anchor.x, 0.85 + i.offsY);
    this.isMoving = false;

    // 当たり判定用Polygon更新
    if (i.customHit != null) {
      let poly = new PIXI.Polygon(i.customHit);
      i.hitArea = poly;

      // let debug = new PIXI.Graphics()
      // .beginFill(0xff4444)
      // .drawPolygon(i.customHit)
      // .endFill();
      // debug.alpha = 0.75;
      // i.addChild(debug);
    }

    // ドラッグ移動のイベントリスナー解除
    i.removeAllListeners('pointerdown');

    // 一瞬今のUIを下に下げてそのあとデフォルトUIを表示する
    this.hideUI(0.1)
      .then(() => {
        this.showUI(Const.UI_MODE.DEFAULT, 0.2);
        this.UIContainer.setBtn.enable();
      })
      .catch((e) => {
        console.trace();
        console.error(e);
      });

    // 床全体のイベントハンドラを解除
    Array.prototype.forEach.call(this.floorContainer.children, (f: any) => {
      f.removeAllListeners();
    });

    // 全てのアイテムをインタラクティブに戻す
    Array.prototype.forEach.call(this.itemContainer.children, (ii: any) => {
      if (!(ii.multipart && !ii.isRoot)) {
        ii.interactive = true;
      }
      ii.alpha = 1;
    });

    // タイルのハイライトオフ
    this.highlightTiles([], true);

    // マップの現在地を埋める
    if (!i.isWall) {
      this.updateItemMap(this.getOccupyingArea(i), 1);
    }
  }

  /**
   * アイテムドラッグ開始処理
   * @param {*} e
   */
  onItemDragStart(e: any) {
    console.log('onItemDragStart');
    let i = this.currentItem;
    if (i instanceof Item) {
      i.dragging = true;
      i.on('pointermove', this.moveItemOnIsoWithSnap.bind(this));
      // i.on('pointerup', this.onItemDragEnd.bind(this));
      window.bindedFunc = this.onItemDragEnd.bind(this);
      window.addEventListener('pointerup', window.bindedFunc);
    }
  }

  /**
   * マウスのあるマスへアイテムを追従させる(スナップ付き)
   * @param {InteractionEvent} e
   */
  moveItemOnIsoWithSnap(e: any) {
    // let f = e.target;
    // console.log(f);
    let i = this.currentItem;
    if (i instanceof Item && i.moving) {
      // 移動可/不可 の切り替わりフラグを生やす
      if (i.switchSettable == undefined) {
        i.switchSettable = false;
      }

      // let pMouse = this.app.renderer.plugins.interaction.mouse.getLocalPosition(this.floorContainer);
      let pMouse = e.data.getLocalPosition(this.floorContainer);
      if (pMouse !== undefined && pMouse != null) {
        pMouse.y += 15;
        let pMouseIso = this.getIsoPoint(pMouse);
        let nextOccupying = this.getOccupyingArea(i, pMouseIso ? pMouseIso : new PIXI.Point(-1, -1));
        if (pMouseIso != null && this.isWithinRoom(nextOccupying)) {
          // 範囲内なら移動

          // let newPosition = this.getScreenPointFromIso(this.getIsoPointFromFloorId(f.floorId));
          i.move(this.getScreenPointFromIso(pMouseIso), pMouseIso, 10000);

          if (i.isWall) {
            // 壁アイテム用の床ハイライト
            this.highlightTiles(nextOccupying);
          }

          // 設置可能 or 不可能 制御
          else if (this.isSettableArea(nextOccupying) || (i.isoPosition.x == i.prevIsoPosition.x && i.isoPosition.y == i.prevIsoPosition.y)) {
            // 設置可
            this.highlightTiles(nextOccupying);

            // 緑点滅に切り替え
            if (i.switchSettable == true) {
              i.switchSettable = false;
              this.setBlink(i, 0xeeffee, 0xaaffaa);
              this.UIContainer.setBtn.enable();
            }
          } else {
            // 設置不可
            this.highlightTiles(nextOccupying, true);

            // 赤点滅に切り替え
            if (i.switchSettable == false) {
              i.switchSettable = true;
              this.setBlink(i, 0xffeeee, 0xffaaaa);
              this.UIContainer.setBtn.disable();
            }
          }
        } else {
          // 範囲外の場合は移動しない
        }
      }
    }
  }

  /**
   * アイテムドラッグ終了処理
   */
  onItemDragEnd() {
    let i = this.currentItem;
    if (i instanceof Item) {
      i.dragging = false;
      i.removeAllListeners('pointermove');
      i.removeAllListeners('pointerup');
      if (window.bindedFunc != null) {
        window.removeEventListener('pointerup', window.bindedFunc);
        window.bindedFunc = null;
      }
    }
  }

  onFloorClick() {}

  /**
   * UIコンテナをアニメーション付きで表示
   */
  showUI(mode = Const.UI_MODE.DEFAULT, time = 0.25): Promise<void> {
    console.log(`showUI mode=${mode}`);

    this.summaryLabel.visible = false;
    return new Promise((resolve, reject) => {
      this.UIContainer.switchMode(mode);
      this.UIContainer.tween = window.TweenMax.to(this.UIContainer, {
        duration: time,
        pixi: { y: this.app.screen.height / 2 + Const.CONT_OFFS_UI.y - 20, alpha: 1 },
        onComplete: () => {
          this.UIContainer.tween = null;
          resolve();
        },
      });
    });
  }

  /**
   * UIコンテナをアニメーション付きで非表示
   */
  hideUI(time = 0.25): Promise<void> {
    return new Promise((resolve, reject) => {
      this.UIContainer.tween = window.TweenMax.to(this.UIContainer, {
        duration: time,
        pixi: { y: this.app.screen.height / 2 + Const.CONT_OFFS_UI.y, alpha: 0 },
        onComplete: () => {
          this.UIContainer.tween = null;
          this.UIContainer.switchMode(Const.UI_MODE.HIDE);
          resolve();
          this.summaryLabel.visible = true;
        },
      });
    });
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

  initBookInfo() {
    PIXI.TextMetrics.BASELINE_SYMBOL += 'あ｜';

    // let titleKanaSize = this.isSP ? 24 : 30;
    // this.titleKanaLabel = new PIXI.Text('ワンルーム  カーニバル', { fontFamily: 'モトギ', fontSize: titleKanaSize, fill: 0xffff00, align: 'center' });
    // this.titleKanaLabel.anchor.set(0.5);
    // this.titleKanaLabel.x = this.app.screen.width / 2;
    // this.titleKanaLabel.y = this.app.screen.height / 2 - 380;
    // this.app.stage.addChild(this.titleKanaLabel);

    this.titleKanaLabel = new PIXI.Sprite(this.texManager.getTexruteByName('infolabel_titlekana') as PIXI.Texture);
    this.titleKanaLabel.anchor.set(0.5);
    this.titleKanaLabel.scale.x = this.titleKanaLabel.scale.y = 0.75;
    this.titleKanaLabel.x = this.app.screen.width / 2;
    this.titleKanaLabel.y = this.app.screen.height / 2 - 390;
    this.app.stage.addChild(this.titleKanaLabel);

    let titleSize = this.isSP ? 60 : 76;
    this.titleLabel = new PIXI.Text('ONE ROOM CARNIVAL', { fontFamily: 'Cubicle', fontSize: titleSize, fill: 0xffff00, align: 'center' });
    this.titleLabel.anchor.set(0.5);
    this.titleLabel.x = this.app.screen.width / 2;
    this.titleLabel.y = this.app.screen.height / 2 - 330;
    this.infoContainer.addChild(this.titleLabel);

    window.TweenMax.to(this.titleLabel, { duration: 1, pixi: { y: this.titleLabel.y + 5 }, ease: window.Power1.easeInOut, repeat: -1, yoyo: true });

    if (!this.isSP) {
      this.authorLabel1 = new PIXI.Sprite(this.texManager.getTexruteByName('infolabel_author1') as PIXI.Texture);
      this.authorLabel1.anchor.x = 0;
      this.authorLabel1.x = 200;
      this.authorLabel1.y = this.app.screen.height / 2 - 200;
      this.infoContainer.addChild(this.authorLabel1);

      this.authorLabel2 = new PIXI.Sprite(this.texManager.getTexruteByName('infolabel_author2') as PIXI.Texture);
      this.authorLabel2.anchor.x = 1.0;
      this.authorLabel2.x = this.app.screen.width - 165;
      this.authorLabel2.y = this.app.screen.height / 2 - 200;
      this.infoContainer.addChild(this.authorLabel2);
    }

    this.summaryLabel = new PIXI.Sprite(this.texManager.getTexruteByName('infolabel_summary') as PIXI.Texture);
    this.summaryLabel.anchor.set(0.5);
    this.summaryLabel.scale.x = this.summaryLabel.scale.y = 0.6;
    this.summaryLabel.x = this.app.screen.width / 2;
    this.summaryLabel.y = this.app.screen.height / 2 + 355;
    this.infoContainer.addChild(this.summaryLabel);
  }
}

// DEBUG;
// let circle = new PIXI.Graphics()
// .beginFill(0xff0000,0.5)
// .drawCircle(p.x,p.y, 5)
// .endFill();
// this.app.stage.addChild(circle);

export default Room;
