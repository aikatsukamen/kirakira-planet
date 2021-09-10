import * as PIXI from 'pixi.js';
import { Scene, SceneManager } from 'pixi-scenes';
import MyTextureManager from '../Texture/Texture';
import { sound } from '@pixi/sound';
import * as Const from '../const';
import { ease } from 'pixi-ease';
import { circle, whiteBack } from './Common';
import Notes from '../Item/Notes';
import JudgeLine from '../Item/JudgeLine';

/** 判定テーブル */
const RATING_TABLE = {
  perfect: {
    score: 1000,
    range: 32, //ms
  },
  great: {
    score: 500,
    range: 64, //ms
  },
  good: {
    score: 100,
    range: 90, //ms
  },
  miss: {
    score: 0,
    range: 134, //ms
  },
};

export default class PlaySong extends Scene {
  private screenCenterWidth: number = 0;
  private screenCenterHeight: number = 0;

  private delta: number;
  /** 楽曲開始したか */
  private isStartSong = false;
  /** 楽曲開始からの経過時間 */
  private gameTime: number = 0;

  private totalScore: number = 0;

  judgeLine0: JudgeLine;
  judgeLine1: JudgeLine;
  judgeLine2: JudgeLine;
  judgeLine3: JudgeLine;
  judgeLine4: JudgeLine;
  judgeLine5: JudgeLine;

  /** ハイスピ */
  private highspeed: number;

  /** 譜面 */
  private scoreData = {
    /** タイトル */
    title: 'ファンタジっくイマジネーション',
    /** タイプ */
    musictype: 1,
    /** Youtube ID */
    music: 'mXtqz850Yb8',
    /** youtube offset */
    offset: 6,
    notes: [
      // time: 着弾時刻(秒)
      // type: ノーツの種類
      // スタート位置
      // 到着位置
      // 同時押しグループ
      { time: 8, type: 0, start: 0, finish: 0, group: 0 },
      { time: 9, type: 0, start: 0, finish: 1, group: 0 },
      { time: 10, type: 0, start: 0, finish: 2, group: 0 },
      { time: 11, type: 0, start: 0, finish: 3, group: 0 },
      { time: 12, type: 0, start: 0, finish: 4, group: 0 },
      { time: 13, type: 0, start: 0, finish: 5, group: 0 },
      { time: 16, type: 0, start: 0, finish: 1, group: 0 },
      { time: 19, type: 0, start: 0, finish: 2, group: 0 },
      { time: 19, type: 0, start: 0, finish: 5, group: 0 },
      { time: 22, type: 0, start: 0, finish: 3, group: 0 },
      { time: 24, type: 0, start: 0, finish: 1, group: 0 },
      { time: 26, type: 0, start: 0, finish: 2, group: 0 },
      { time: 28, type: 0, start: 0, finish: 2, group: 0 },
      { time: 30, type: 0, start: 0, finish: 2, group: 0 },
      { time: 32, type: 0, start: 0, finish: 2, group: 0 },
      { time: 34, type: 0, start: 0, finish: 1, group: 0 },
      { time: 36, type: 0, start: 0, finish: 2, group: 0 },
      { time: 38, type: 0, start: 0, finish: 2, group: 0 },
      { time: 40, type: 0, start: 0, finish: 2, group: 0 },
      { time: 22, type: 0, start: 0, finish: 2, group: 0 },
    ],
  };

  private notesMap: Map<string, Notes> = new Map();
  private notesContainer: PIXI.Container;

  /** ノーツ出現時間(ms): 大きくするほど低速 */
  MARKER_APPEARANCE_DELTA = 1000;
  SCREEN_HEIGHT: number;
  /** 中心からアイコンまでの距離 */
  UNIT_ARRANGE_RADIUS: number;

  public init = (): void => {
    if (!this.app) throw 'null';
    this.screenCenterWidth = this.app.screen.width / 2;
    this.screenCenterHeight = this.app.screen.height / 2;

    this.SCREEN_HEIGHT = this.app.screen.height;
    this.UNIT_ARRANGE_RADIUS = this.SCREEN_HEIGHT * 0.49;

    this.createJudgeLine();

    // 音
    sound.add('se_tap', 'res/se/tap.mp3');
    sound.add('song', 'res/song/fi.mp3');

    whiteBack.alpha = 0;
    this.addChild(whiteBack);
  };

  public start = (): void => {
    const notesTexture = MyTextureManager.getTexruteByName('notes_red') as PIXI.Texture<PIXI.Resource>;

    this.notesContainer = new PIXI.Container();
    this.addChild(this.notesContainer);

    // 中央
    circle.x = this.screenCenterWidth - circle.width / 2;
    circle.y = this.screenCenterHeight / 2 - circle.height / 2;
    console.log(`centerCircle x=${circle.x} y=${circle.y}`);
    this.addChild(circle);

    // ノーツセンター座標
    console.log(`note center x=${this.screenCenterWidth - notesTexture.width / 2} y=${this.screenCenterHeight / 2 - notesTexture.height / 2}`);

    // 全ノーツのインスタンスを作っちゃう
    for (let i = 0; i < this.scoreData.notes.length; i++) {
      const notes = this.scoreData.notes[i];
      const noteSprite = new Notes({ texture: notesTexture, id: `${i}`, type: notes.type, trackId: notes.finish, targetTime: notes.time * 1000 });
      noteSprite.x = this.screenCenterWidth;
      noteSprite.y = this.screenCenterHeight;
      this.notesMap.set(`${i}`, noteSprite);
      this.notesContainer.addChild(noteSprite);
    }

    // もろもろ終わったらフェードイン
    const example = ease.add(
      whiteBack,
      {
        x: 0,
        y: 0,
        alpha: 0.0,
        rotation: 0,
        scale: 1,
        skewX: 0, // これ増やすと傾く
        blend: 0xffffff,
      },
      { repeat: false, reverse: false, duration: 1000, ease: 'easeOutSine' },
    );
    example.once('complete', () => {
      // フェードイン後
      this.startSong();
    });
  };

  /** 楽曲開始 */
  startSong = () => {
    this.isStartSong = true;
    sound.play('song');
  };

  /**
   * 毎フレーム動くやつ
   * @param delta 前回からの差分
   */
  public update = (delta: number): void => {
    this.delta = delta;
    if (this.isStartSong) {
      this.gameTime += delta;
      this.notesControl();
    }
  };

  /** 判定エリア生成 */
  private createJudgeLine = () => {
    if (!this.app) throw 'null';
    console.log('createJudgeLine');

    const texture = MyTextureManager.getTexruteByName('judge_area');
    if (!texture) return;
    // Sprite
    this.judgeLine0 = new JudgeLine({
      texture,
      id: 0,
      screenWidth: this.app.screen.height,
      screenHeight: this.app.screen.height,
      offsetX: this.screenCenterWidth - texture.width / 2,
      offsetY: this.screenCenterHeight / 2 - texture.width / 2,
    });
    this.judgeLine1 = new JudgeLine({
      texture,
      id: 1,
      screenWidth: this.app.screen.height,
      screenHeight: this.app.screen.height,
      offsetX: this.screenCenterWidth - texture.width / 2,
      offsetY: this.screenCenterHeight / 2 - texture.width / 2,
    });
    this.judgeLine2 = new JudgeLine({
      texture,
      id: 2,
      screenWidth: this.app.screen.height,
      screenHeight: this.app.screen.height,
      offsetX: this.screenCenterWidth - texture.width / 2,
      offsetY: this.screenCenterHeight / 2 - texture.width / 2,
    });
    this.judgeLine3 = new JudgeLine({
      texture,
      id: 3,
      screenWidth: this.app.screen.height,
      screenHeight: this.app.screen.height,
      offsetX: this.screenCenterWidth - texture.width / 2,
      offsetY: this.screenCenterHeight / 2 - texture.width / 2,
    });
    this.judgeLine4 = new JudgeLine({
      texture,
      id: 4,
      screenWidth: this.app.screen.height,
      screenHeight: this.app.screen.height,
      offsetX: this.screenCenterWidth - texture.width / 2,
      offsetY: this.screenCenterHeight / 2 - texture.width / 2,
    });
    this.judgeLine5 = new JudgeLine({
      texture,
      id: 5,
      screenWidth: this.app.screen.height,
      screenHeight: this.app.screen.height,
      offsetX: this.screenCenterWidth - texture.width / 2,
      offsetY: this.screenCenterHeight / 2 - texture.width / 2,
    });

    for (const judgeLine of [this.judgeLine0, this.judgeLine1, this.judgeLine2, this.judgeLine3, this.judgeLine4, this.judgeLine5]) {
      // 共通
      judgeLine.interactive = true;
      judgeLine.buttonMode = true;
      // タッチイベント
      judgeLine.on('pointertap', () => this.judge(judgeLine));

      // 表示対象に追加
      this.addChild(judgeLine);
    }
  };

  private notesControl = () => {
    // マーカー描画
    var markers = this.notesContainer.children as Notes[];
    markers.forEach((m) => {
      if (!m.isAwake) return;

      var time = this.gameTime;
      var rTime = m.targetTime - time; // 相対時間

      // console.log(`notes=${m.id} ${m.targetTime} ${rTime}`);

      if (rTime < this.MARKER_APPEARANCE_DELTA) {
        // マーカーの位置比率や縮小率（倍率）を計算する
        // ratioはアイコンに近いほど1.0に近づく
        var ratio = (time - (m.targetTime - this.MARKER_APPEARANCE_DELTA)) / this.MARKER_APPEARANCE_DELTA;
        /** 現在位置から終点までの距離 */
        const distance = this.UNIT_ARRANGE_RADIUS * ratio;

        m.visible = true;
        m.position.x = m.vector.x * distance + this.screenCenterWidth - m.texture.width / 2;
        m.position.y = m.vector.y * distance + this.screenCenterHeight / 2 - m.texture.height / 2;
        m.scaleX = ratio;
        m.scaleY = ratio;

        // console.log(`scaleX=${m.scaleX} scaleY=${m.scaleY}`);
      }
      // 叩かれずに規定時間通り過ぎたらmiss判定
      if (RATING_TABLE['miss'].range < -rTime) {
        this.reaction(m, 'miss');
      }
    });
  };

  // 判定処理
  judge = (unitIcon: JudgeLine) => {
    console.log(`judge: ${unitIcon.id}`);
    var time = this.gameTime;

    // 判定可能マーカーを探索
    var markers = this.notesContainer.children as Notes[];
    markers.some((m) => {
      if (!m.isAwake || m.trackId !== unitIcon.id) return;

      // マーカーが有効かつtrackIdが一致、かつ判定範囲内
      // 判定が狭い順に判定し、該当したらループ拔ける
      // 判定ラインからエフェクトを出して音を鳴らす
      var delta = Math.abs(m.targetTime - time);
      if (delta <= RATING_TABLE['perfect'].range) {
        unitIcon.fireEffect();
        sound.play('se_tap');
        this.reaction(m, 'perfect');
        return true;
      }
      if (delta <= RATING_TABLE['great'].range) {
        unitIcon.fireEffect();
        sound.play('se_tap');
        this.reaction(m, 'great');
        return true;
      }
      if (delta <= RATING_TABLE['good'].range) {
        unitIcon.fireEffect();
        sound.play('se_tap');
        this.reaction(m, 'good');
        return true;
      }
      if (delta <= RATING_TABLE['miss'].range) {
        this.reaction(m, 'miss');
        return true;
      }
      return false;
    });
  };

  reaction = (marker: Notes, rating: string) => {
    // マーカー不可視化
    marker.interactive = false;
    marker.isAwake = false;
    marker.visible = false;

    // RateLabel({ text: rating.toUpperCase() }).setPosition(this.gridX.center(), this.gridY.center()).addChildTo(this);

    this.totalScore += RATING_TABLE[rating].score;

    console.log(`total=${this.totalScore} rating=${rating}`);
  };
}
