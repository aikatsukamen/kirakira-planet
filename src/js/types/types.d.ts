import * as Const from '../const';

type PartsInfo = {
  parts: {
    id: string;
    part: {
      x: number;
      y: number;
      z: number;
      u: number;
      v: number;
    };
  };
  texture: string;
};

type RESOURCE_NAME = keyof typeof Const.RESOURCE;

type ScoreData = {
  /** タイトル */
  title: string;
  /** 難易度 */
  level: number;
  /**  */
  musictype: number;
  /** Youtube Video ID */
  videoId: string;
  /** 何秒まで再生するか(ms) */
  musicLength: number;
  /** 動画のオフセット時間 */
  offset: number;
  /** 各バトルの開始時刻 */
  battle: number[];
  notes: {
    /** 秒 */
    time: number;
    /**
     * - 0: 単ノーツ
     * - 1: 同時押し
     * - 2: ロング
     */
    type: 0 | 1 | 2;
    /** 判定ライン番号 */
    finish: number;
    /** グループ */
    group: number;
  }[];
};

type MusicResult = {
  totalScore: number;
  judge: {
    perfect: number;
    verygood: number;
    good: number;
    safe: number;
    miss: number;
  };
};
