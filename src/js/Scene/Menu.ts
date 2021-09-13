import * as PIXI from 'pixi.js';
import { Scene, SceneManager } from 'pixi-scenes';
import { ease } from 'pixi-ease';
import * as Const from '../const';
import { ScoreData } from '../types/types';

export default class Menu extends Scene {
  private header: PIXI.Text;
  private back: PIXI.Graphics;

  private screenCenterWidth: number;
  private screenCenterHeight: number;

  public init(): void {
    this.header = new PIXI.Text('曲を選んでね');
    if (!this.app) throw 'null';
    this.screenCenterWidth = this.app.screen.width / 2;
    this.screenCenterHeight = this.app.screen.height / 2;

    this.header.x = this.screenCenterWidth;
    this.header.y = this.screenCenterHeight / 2;
    this.header.scale.x = 2;
    this.header.scale.y = 2;
    this.header.anchor.set(0.5);
    this.addChild(this.header);

    this.back = new PIXI.Graphics().beginFill(0xffffff).drawRect(0, 0, 5000, 2500).endFill();
    this.addChild(this.back);

    // 楽曲リストを取得
    this.createMusicList();
  }

  private scoreList: ScoreData[] = [];

  private createMusicList = async () => {
    const res = await fetch('./score/list.json');
    const json = JSON.parse(await res.text());
    for (const url of json.list) {
      const res = await fetch(url);
      const score = JSON.parse(await res.text()) as ScoreData;
      this.scoreList.push(score);
    }

    this.createMusicItem();
  };

  public start(): void {
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
  }

  public update(delta: number): void {
    // this.header.angle += (delta / 1000) * 45;
  }

  private createMusicItem = () => {
    let startX = this.screenCenterWidth;
    let startY = this.screenCenterHeight;

    let i = 0;
    for (const score of this.scoreList) {
      const scoreContainer = new PIXI.Container();
      const circle = new PIXI.Graphics().beginFill(0x00ffff, 1).lineStyle(2, 0x000000).drawCircle(0, 0, 20);
      const title = `${score.title} Lv. ${score.level}`;
      const text = new PIXI.Text(title);
      text.anchor.set(0.5);
      scoreContainer.addChild(circle);
      scoreContainer.addChild(text);
      scoreContainer.scale.x = 2;
      scoreContainer.scale.y = 2;
      scoreContainer.position.x = startX;
      scoreContainer.position.y = startY + scoreContainer.height * i;
      scoreContainer.interactive = true;
      scoreContainer.buttonMode = true;
      console.log(`${title} x=${startX * i} y=${startY}`);

      scoreContainer.on('pointertap', () => {
        window.scoreData = score;
        (this.scenes as SceneManager).start(Const.SCENE_LIST.playSong);
      });
      this.addChild(scoreContainer);
      i++;
    }
  };
}
