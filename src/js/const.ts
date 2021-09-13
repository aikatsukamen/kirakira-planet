/**
 * アプリ設定関連
 */

/**
 * スマホ幅閾値
 * */
export const TH_SP = 375;

/**
 * ルームのデフォルト解像度
 */
export const ROOM_WIDTH_DEF = 1280;
export const ROOM_HEIGHT_DEF = 720;

/**
 * 各コンテナのオフセット
 */
export const CONT_OFFS_FLOOR = { x: -80, y: 30 };
export const CONT_OFFS_UI = { x: 0, y: 350 };

/**
 * ルームのマス数,1マスのサイズ
 */
export const ROOM_ROW = 8;
export const ROOM_COL = 8;
export const ROOM_UNIT = { width: 94, height: 54 };

/**
 * 床タイルの配置表(白or黒)
 */
export const TILE_MAP = [
  // 0,0,1,1,0,0,1,1,
  // 0,0,1,1,0,0,1,1,
  // 1,1,0,0,1,1,0,0,
  // 1,1,0,0,1,1,0,0,
  // 0,0,1,1,0,0,1,1,
  // 0,0,1,1,0,0,1,1,
  // 1,1,0,0,1,1,0,0,
  // 1,1,0,0,1,1,0,0,

  0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1,
  0, 1, 0, 1, 0,
];

/**
 * タイルのハイライト用PIXI.Graphicsのインデックス
 * */
export const FL_HL_INDEX = 64;

/**
 * アイテム情報のURI
 */
export const URI_ITEM_JSON = './res/json/item.json';

/**
 * テクスチャキー
 */
export const TEX_TB = 'tile_b';
export const TEX_TW = 'tile_w';
export const TEX_LOCKER = 'locker';
export const TEX_SOFA = 'sofa';
export const TEX_BUTA = 'buta';
export const TEX_CHARA = 'chara';
export const TEX_UI_BTN_MOVE = 'ui-btn-move';
export const TEX_UI_BTN_SAMPLE = 'ui-btn-sample';
export const TEX_UI_BTN_LINK = 'ui-btn-link';
export const TEX_UI_BTN_SET = 'ui-btn-set';
export const TEX_UI_BTN_CANCEL = 'ui-btn-cancel';

export const SCENE_LIST = {
  /** デバッグUI */
  debug: 'debug',
  /** タイトル */
  splash: 'splash',
  /** ゲームモード選択とか */
  menu: 'menu',
  /** 曲選択 */
  selectSong: 'selectSong',
  /** 曲プレイ中 */
  playSong: 'playSong',
  /** 記録モード */
  record: 'record',
  /** リザルト */
  result: 'result',
  /** ローディング */
  loading: 'loading',
  gameover: 'gameover',
};

/**
 * テクスチャ情報
 */
export const RESOURCE = {
  tap_start: {
    texture: './res/img/tap_start.png',
  },
  notes_red: {
    texture: './res/img/notes_red.png',
  },
  judge_area: {
    texture: './res/img/judge_area.png',
  },
  loading: {
    texture: './res/img/loading.gif',
  },
  ready: {
    texture: './res/img/ready.png',
  },
  battle_op: {
    texture: './res/img/battle_op.png',
  },
  battle_main: {
    texture: './res/img/battle_main.png',
  },
  battle_climax: {
    texture: './res/img/battle_climax.png',
  },
  battle_finale: {
    texture: './res/img/battle_finale.png',
  },
};
