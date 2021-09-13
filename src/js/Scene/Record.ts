import * as PIXI from 'pixi.js';
import { Scene, SceneManager } from 'pixi-scenes';
import MyTextureManager from '../Texture/Texture';
import { sound } from '@pixi/sound';
import * as Const from '../const';
import { ease } from 'pixi-ease';
import { fadeout, whiteBack } from './Common';
import Notes from '../Item/Notes';
import JudgeLine from '../Item/JudgeLine';
import YTPlayer from 'yt-player';
import { ScoreData } from '../types/types';

/** 判定テーブル */
const RATING_TABLE = {
  perfect: {
    score: 1000,
    range: 32, //ms
    color: 0xff0000,
  },
  great: {
    score: 500,
    range: 64, //ms
    color: 0xffff00,
  },
  good: {
    score: 100,
    range: 134, //ms
    color: 0x0000ff,
  },
  safe: {
    score: 100,
    range: 200, //ms
    color: 0x00ff00,
  },
  miss: {
    score: 0,
    range: 300, //ms
    color: 0x000000,
  },
};

export default class PlaySong extends Scene {
  private screenCenterWidth: number = 0;
  private screenCenterHeight: number = 0;

  private startButtonContainer: PIXI.Container;
  private startButton: PIXI.Sprite;
  private loading: PIXI.Sprite;

  private scoreText: PIXI.Text = new PIXI.Text(`0`, { fontSize: 72, fill: 'gold', dropShadow: true, dropShadowColor: 'sliver' });

  /** 楽曲開始したか */
  private isStartSong = false;
  /** 楽曲開始からの経過時間 */
  private gameTime: number = 0;

  private totalScore: number = 0;
  private judgeResult: {
    perfect: number;
    verygood: number;
    good: number;
    safe: number;
    miss: number;
  };

  judgeLine0: JudgeLine;
  judgeLine1: JudgeLine;
  judgeLine2: JudgeLine;
  judgeLine3: JudgeLine;
  judgeLine4: JudgeLine;
  judgeLine5: JudgeLine;

  /** 譜面 */
  private scoreData: ScoreData;

  private notesMap: Map<string, Notes> = new Map();
  private notesContainer: PIXI.Container;

  /** ノーツ出現時間(ms): 大きくするほど低速 */
  MARKER_APPEARANCE_DELTA = 1000;
  SCREEN_HEIGHT: number;
  /** 中心からアイコンまでの距離 */
  UNIT_ARRANGE_RADIUS: number;

  private player: YTPlayer;

  private musicvolume: number = 50;

  /** インスタンス生成時処理 */
  public init = (): void => {
    if (!this.app) throw 'null';
    this.screenCenterWidth = this.app.screen.width / 2;
    this.screenCenterHeight = this.app.screen.height / 2;

    this.SCREEN_HEIGHT = this.app.screen.height;
    this.UNIT_ARRANGE_RADIUS = this.SCREEN_HEIGHT * 0.49;

    // 判定ライン生成
    this.createJudgeLine();

    // 音
    sound.add('se_tap', 'res/se/tap.mp3');

    // スタートボタン(モバイルデバイスはclickイベントを挟まないと動画が再生されない)
    this.createStartButton();

    this.createLoadingButton();

    this.scoreText.anchor.set(0.5);
    this.scoreText.x = this.screenCenterWidth;
    this.scoreText.y = this.screenCenterHeight / 8;
    this.addChild(this.scoreText);

    // ロード画面用の白
    this.back = whiteBack();
    this.back.alpha = 0;
    this.addChild(this.back);
  };
  private back: PIXI.Graphics;

  /** シーンが呼ばれた時の処理 */
  public start = (): void => {
    // 楽曲
    this.scoreData = window.scoreData;
    this.loadMusic();
    this.judgeResult = {
      perfect: 0,
      verygood: 0,
      good: 0,
      safe: 0,
      miss: 0,
    };
    this.scoreText.text = '0';

    // もろもろ終わったらフェードイン
    const example = ease.add(
      this.back,
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
    });
  };

  private loadMusic = () => {
    // 曲
    const videoId = this.scoreData.videoId;
    console.log(`loadMusic videoId=${videoId}`);

    // sound.add('song', 'res/song/fi.mp3');
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.player = new YTPlayer('#player', {
      width,
      height,
      autoplay: false,
      controls: false,
      captions: false,
      keyboard: false,
      related: false,
      annotations: false,
      modestBranding: false,
      host: 'https://www.youtube-nocookie.com', // これ入れないとなんかアクセスする
    });
    this.player.load(videoId);
    // this.player.setVolume(0);

    // youtubeの準備ができたら開始ボタン押せるようにする
    this.player.once('cued', this.enableStartButton);
  };

  /** 楽曲開始 */
  private startSong = () => {
    // スタートボタンを非表示にする
    this.startButtonContainer.destroy();

    // 再生開始
    this.player.play();
    this.player.once('playing', () => {
      // バッファ始まったらシークする
      this.player.seek(this.scoreData.offset);
      this.player.setVolume(this.musicvolume);
      this.isStartSong = true;
    });
  };

  /** スタートボタンを作る */
  private createStartButton = () => {
    const container = new PIXI.Container();
    container.width = 5000;
    container.height = 5000;
    container.interactive = true;
    container.buttonMode = true;
    const sprite = MyTextureManager.createSprite('ready');
    if (!sprite) return;
    this.startButton = sprite;
    sprite.x = this.screenCenterWidth;
    sprite.y = this.screenCenterHeight;
    sprite.anchor.set(0.5);
    sprite.interactive = false;
    sprite.buttonMode = true;
    sprite.alpha = 0;
    container.once('pointertap', this.startSong);
    this.startButtonContainer = container;

    container.addChild(sprite);
    this.addChild(container);
  };

  private createLoadingButton = () => {
    const sprite = MyTextureManager.createSprite('loading');
    if (!sprite) return;
    this.loading = sprite;
    sprite.x = (this.app?.screen.width ?? 0) - 100;
    sprite.y = (this.app?.screen.height ?? 0) - 100;
    sprite.anchor.set(0.5);
    sprite.interactive = false;
    sprite.buttonMode = false;
    sprite.alpha = 1;
    sprite.scale.x = 2;
    sprite.scale.y = 2;
    this.addChild(sprite);
  };

  private enableStartButton = () => {
    // ローディングを非表示
    this.loading.destroy();

    // ボタン押せるように
    this.startButton.interactive = true;
    this.startButton.alpha = 1;
  };

  /**
   * 毎フレーム動くやつ
   * @param delta 前回からの差分
   */
  public update = (delta: number): void => {
    if (this.isStartSong) {
      this.gameTime += delta;
      // 流し終わった
      if (this.gameTime >= this.scoreData.musicLength) {
        this.player.stop();
        this.player.destroy();
      } else {
        this.player.setVolume(this.musicvolume);
        if (window.debug) window.debug.message = `volume: ${this.musicvolume}`;
      }
    }

    if (this.player.destroyed) {
      window.musicResult = {
        totalScore: this.totalScore,
        judge: this.judgeResult,
      };
      console.log(this.recordList);
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

  recordList: { time: number; type: 0; finish: number; group: 0 }[] = [];

  // 判定処理
  private judge = (unitIcon: JudgeLine) => {
    console.log(`judge: ${unitIcon.id}`);
    var time = this.gameTime;

    this.recordList.push({
      time: this.gameTime,
      type: 0,
      finish: unitIcon.id,
      group: 0,
    });

    this.reaction(unitIcon.id);
  };

  /** 判定に応じた処理 */
  private reaction = (id: number) => {
    // 判定表示
    this.showRateLabel({ id });

    // ノーツ数加算
    this.totalScore += 1;
    this.updateScoreLabel();
  };

  private judgeText: PIXI.Text;
  /** 画面中央に判定表示 */
  private showRateLabel(arg: { id: number }) {
    if (this.judgeText) this.judgeText.destroy();
    const text = new PIXI.Text(`${arg.id}`, { fontSize: 72, fill: 'red', dropShadow: true });
    this.judgeText = text;
    text.x = this.screenCenterWidth;
    text.y = this.screenCenterHeight;
    text.anchor.set(0.5);
    this.addChild(text);
  }

  /** 画面中央に判定表示 */
  private updateScoreLabel() {
    this.scoreText.text = `${this.totalScore}`;
  }
}
