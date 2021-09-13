import { MusicResult, ScoreData } from './types';

declare global {
  interface Window {
    // シーンをまたいで使いたいデータ

    /** 選んだ楽曲 */
    scoreData: ScoreData;

    /** プレイリザルト */
    musicResult: MusicResult;

    debug: {
      message: string;
    };
  }
}
export {};
