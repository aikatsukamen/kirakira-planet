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
    score: 700,
    range: 32, //ms
    color: 0xff0000,
  },
  verygood: {
    score: 600,
    range: 64, //ms
    color: 0xffff00,
  },
  good: {
    score: 500,
    range: 134, //ms
    color: 0x0000ff,
  },
  safe: {
    score: 400,
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
  private startButtonContainer: PIXI.Container = new PIXI.Container();
  private startButton: PIXI.Sprite;

  /** ノーツ出現時間(ms): 大きくするほど低速 */
  MARKER_APPEARANCE_DELTA = 1000;
  SCREEN_HEIGHT: number;
  /** 中心からアイコンまでの距離 */
  UNIT_ARRANGE_RADIUS: number;

  private player: YTPlayer;

  private musicvolume: number = 50;

  private battleIndex: number = 0;

  /** インスタンス生成時処理 */
  public init = (): void => {
    if (!this.app) throw 'null';
    this.screenCenterWidth = this.app.screen.width / 2;
    this.screenCenterHeight = this.app.screen.height / 2;

    this.SCREEN_HEIGHT = this.app.screen.height;
    this.UNIT_ARRANGE_RADIUS = this.SCREEN_HEIGHT * 0.49;

    // 音
    sound.add('se_tap', 'res/se/tap.mp3');

    // 判定ライン生成
    this.createJudgeLine();

    this.createLoadingButton();

    this.scoreText.anchor.set(0.5);
    this.scoreText.x = this.screenCenterWidth;
    this.scoreText.y = this.screenCenterHeight / 8;
    this.addChild(this.scoreText);

    // ロード画面用の白
    this.back = whiteBack();
    this.addChild(this.back);

    this.notesContainer = new PIXI.Container();
    this.addChild(this.notesContainer);
  };

  back: PIXI.Graphics;

  /** シーンが呼ばれた時の処理 */
  public start = (): void => {
    const notesTexture = MyTextureManager.getTexruteByName('notes_red') as PIXI.Texture<PIXI.Resource>;

    this.back.alpha = 0;

    this.notesContainer.children.map((item) => item.destroy());
    this.startButtonContainer.children.map((item) => item.destroy());

    // スタートボタン(モバイルデバイスはclickイベントを挟まないと動画が再生されない)
    this.createStartButton();

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
    this.totalScore = 0;

    this.gameTime = 0;
    this.isStartSong = false;
    this.battleIndex = 0;
    this.notesMap = new Map();
    this.loading.alpha = 1;

    // // 中央
    // circle.x = this.screenCenterWidth - circle.width / 2;
    // circle.y = this.screenCenterHeight / 2 - circle.height / 2;
    // console.log(`centerCircle x=${circle.x} y=${circle.y}`);
    // this.addChild(circle);
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
    example.on('complete', () => {
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
    this.startButton.alpha = 0;
    this.startButtonContainer.children.map((item) => item.destroy());

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
    const geo = new PIXI.Graphics().beginFill(0x000000).drawRect(0, 0, 5000, 2500).endFill();
    geo.width = 5000;
    geo.height = 5000;
    geo.interactive = true;
    geo.buttonMode = true;
    geo.alpha = 0;
    geo.once('pointertap', this.startSong);

    const sprite = MyTextureManager.createSprite('ready');
    if (!sprite) return;
    sprite.x = this.screenCenterWidth;
    sprite.y = this.screenCenterHeight;
    sprite.anchor.set(0.5);
    sprite.alpha = 0;
    this.startButton = sprite;

    this.startButtonContainer.addChild(geo);
    this.startButtonContainer.addChild(sprite);
    this.addChild(this.startButtonContainer);
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
    this.loading.alpha = 0;

    // ボタン押せるように
    this.startButtonContainer.interactive = true;
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
        this.notesControl();
      }

      // バトル表示
      const battleTime = this.scoreData.battle[this.battleIndex];
      if (this.gameTime > battleTime * 1000) {
        this.showBattleLabel(this.battleIndex);
        this.battleIndex++;
      }
    }

    if (this.player.destroyed) {
      window.musicResult = {
        totalScore: this.totalScore,
        judge: this.judgeResult,
      };
      fadeout(this.back, this.scenes as SceneManager, Const.SCENE_LIST.result);
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
  private judge = (unitIcon: JudgeLine) => {
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
      if (delta <= RATING_TABLE['verygood'].range) {
        unitIcon.fireEffect();
        sound.play('se_tap');
        this.reaction(m, 'verygood');
        return true;
      }
      if (delta <= RATING_TABLE['good'].range) {
        unitIcon.fireEffect();
        sound.play('se_tap');
        this.reaction(m, 'good');
        return true;
      }
      if (delta <= RATING_TABLE['safe'].range) {
        unitIcon.fireEffect();
        sound.play('se_tap');
        this.reaction(m, 'safe');
        return true;
      }
      if (delta <= RATING_TABLE['miss'].range) {
        this.reaction(m, 'miss');
        return true;
      }
      return false;
    });
  };

  /** 判定に応じた処理 */
  private reaction = (marker: Notes, rating: string) => {
    // マーカー不可視化
    marker.interactive = false;
    marker.isAwake = false;
    marker.visible = false;

    // 判定表示
    this.showRateLabel({ rate: rating, fast: false, showFast: false });

    // スコア加算
    this.totalScore += RATING_TABLE[rating].score;
    this.judgeResult[rating] += 1;
    this.updateScoreLabel();

    console.log(`total=${this.totalScore} rating=${rating}`);
  };

  private judgeText: PIXI.Text;
  private judgeShowTimer: number = 0;
  /** 画面中央に判定表示 */
  private showRateLabel(arg: { rate: string; fast: boolean; showFast: boolean }) {
    if (this.judgeText) this.judgeText.destroy();
    if (this.judgeShowTimer > 0) {
      window.clearTimeout(this.judgeShowTimer);
      this.judgeShowTimer = 0;
    }
    const rateText = arg.rate.toUpperCase();
    const rate = RATING_TABLE[arg.rate];

    const text = new PIXI.Text(rateText, { fontSize: 72, fill: rate.color, dropShadow: true });
    this.judgeText = text;
    text.x = this.screenCenterWidth;
    text.y = this.screenCenterHeight;
    text.anchor.set(0.5);
    this.addChild(text);

    // 一定時間で消える
    this.judgeShowTimer = window.setTimeout(() => {
      this.judgeText.alpha = 0;
    }, 600);
  }

  /** 画面中央に判定表示 */
  private updateScoreLabel() {
    this.scoreText.text = `${this.totalScore}`;
  }

  private battleLabel: PIXI.Sprite;
  /** 画面中央に判定表示 */
  private showBattleLabel(type: number) {
    if (this.battleLabel) this.battleLabel.destroy();
    let typeText: string = 'battle_op';
    switch (type) {
      case 0:
        typeText = 'battle_op';
        break;
      case 1:
        typeText = 'battle_main';
        break;
      case 2:
        typeText = 'battle_climax';
        break;
      case 3:
        typeText = 'battle_finale';
        break;
    }

    const sprite = MyTextureManager.createSprite(typeText as any);
    if (!sprite) return;
    sprite.x = this.screenCenterWidth;
    sprite.y = this.screenCenterHeight * 2 - sprite.texture.height / 2;
    sprite.anchor.set(0.5);
    this.addChild(sprite);

    // 一定時間で消える
    window.setTimeout(() => {
      sprite.alpha = 0;
    }, 5000);
  }
}
