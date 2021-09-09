/**
 * UI関連クラスのまとめ
 * リスナーの登録は外からやる
 * 表示時のアニメーションは外でやる
 * よくない気がする
 */

import * as PIXI from 'pixi.js';
import * as Const from '../const';
import { MyTextureManager } from '../Texture/Texture';

class UIContainer extends PIXI.Container {
  constructor() {
    super();
    // this.spriteList = new Array();
    this.btnList = new Array();
    this.labelList = new Map();
    this.texManager = new MyTextureManager();
  }
  // spriteList: any[];
  btnList: Button[];
  labelList: Map<string, PIXI.Sprite>;
  texManager: MyTextureManager;

  moveBtn: Button;
  linkBtn: Button;
  sampleBtn: Button;
  cancelBtn: Button;
  setBtn: Button;

  itemLabel: PIXI.Sprite | null | undefined;

  tween: any | null;

  init() {
    // ボタン
    this.moveBtn = new Button(this.texManager.getTexruteByName(Const.TEX_UI_BTN_MOVE));
    this.linkBtn = new Button(this.texManager.getTexruteByName(Const.TEX_UI_BTN_LINK));
    this.sampleBtn = new Button(this.texManager.getTexruteByName(Const.TEX_UI_BTN_SAMPLE));
    this.cancelBtn = new Button(this.texManager.getTexruteByName(Const.TEX_UI_BTN_CANCEL));
    this.setBtn = new Button(this.texManager.getTexruteByName(Const.TEX_UI_BTN_SET));

    // ボタンの初期配置(水平方向)
    this.moveBtn.x -= 120;
    // this.sampleBtn.x += 0;
    this.linkBtn.x += 120;
    this.cancelBtn.x -= 70;
    this.setBtn.x += 70;

    this.btnList.push(this.moveBtn);
    this.btnList.push(this.sampleBtn);
    this.btnList.push(this.linkBtn);
    this.btnList.push(this.cancelBtn);
    this.btnList.push(this.setBtn);

    this.btnList.map((s: Button) => {
      s.anchor.set(0.5);
      s.scale.x = s.scale.y = 0.5;
      s.interactive = true;
      s.buttonMode = true;
      s.visible = false;
      this.addChild(s);
    });

    // ラベル
    // PIXI.TextMetrics.BASELINE_SYMBOL += "あ｜";
    // this.itemLabel =  new PIXI.Text('',
    //         {fontFamily : 'Shirokuma', fontWeight: 'bold', fontSize: 30, fill : 0xf8f8f8, stroke:0x000000, strokeThickness: 3, align :'center'});
    this.itemLabel = null;
    // ラベルの配置
    // this.switchMode(Const.UI_MODE.HIDE);
    this.switchMode(Const.UI_MODE.DEFAULT);
  }

  /**
   * ラベルのテキストをセットする
   * @param {String} author
   */
  setLabel(author: string = '') {
    if (!this.itemLabel) return;

    if (this.itemLabel != null) {
      this.itemLabel.visible = false;
    }
    if (this.labelList.has(author)) {
      this.itemLabel = this.labelList.get(author) as PIXI.Sprite;
      this.itemLabel.visible = true;
    } else {
      const texture = this.texManager.getTexruteByName('itemlabel_' + author);
      let label = new PIXI.Sprite(texture as PIXI.Texture);
      this.itemLabel = label;
      label.x = 0;
      label.y -= 70;
      label.anchor.set(0.5);
      label.buttonMode = true;
      label.visible = true;
      this.addChild(label);
      this.labelList.set(author, label);
    }
  }

  /**
   * UIモード変更の窓口
   * @param {UI_MODE} mode
   */
  switchMode(mode: number) {
    this.hideAllUI();
    switch (mode) {
      case Const.UI_MODE.HIDE:
        break;
      case Const.UI_MODE.DEFAULT:
        this.switchDefaultMode();
        break;

      case Const.UI_MODE.MOVE:
        this.switchMoveMode();
        break;

      default:
        break;
    }
  }

  /**
   * UIをすべて隠す
   */
  hideAllUI() {
    Array.prototype.forEach.call(this.btnList, (s: any) => {
      s.visible = false;
    });
  }

  /**
   * UIを初期表示に変更
   */
  switchDefaultMode() {
    console.log('switchDefaultMode');
    this.moveBtn.visible = true;
    this.sampleBtn.visible = true;
    this.linkBtn.visible = true;
  }

  /**
   * UIをアイテム動かす表示に変更
   */
  switchMoveMode() {
    console.log('switchMoveMode');
    this.setBtn.visible = true;
    this.cancelBtn.visible = true;
  }
}

class Button extends PIXI.Sprite {
  constructor(c: PIXI.Texture | null | undefined) {
    console.log(c);
    if (c) {
      super(c);
    } else {
      console.warn('テクスチャが無い');
    }
  }

  /**
   * ボタンにイベントリスナーを登録する
   * @param {function} listener
   */
  setClickEventListner(listener: any) {
    this.setClickEventListner = listener as any;
    this.on('pointertap', listener);
  }

  removeClickEventListner() {
    this.off('pointertap', this.setClickEventListner);
    this.setClickEventListner = null as any;
  }

  enable() {
    this.alpha = 1;
    this.interactive = true;
  }

  disable() {
    this.alpha = 0.5;
    this.interactive = false;
  }
}

export default UIContainer;
