import * as PIXI from 'pixi.js';
import * as Const from '../const';

/**
 * テクスチャ管理クラス(シングルトン)
 */
export class MyTextureManager {
  textures: Map<string, PIXI.Texture>;
  sharedInstance: {
    value: typeof MyTextureManager;
  };

  constructor(c = null) {
    if (MyTextureManager.prototype.sharedInstance) {
      return MyTextureManager.prototype.sharedInstance as any;
    } else {
      Object.defineProperty(MyTextureManager.prototype, 'sharedInstance', { value: this });
      this.textures = new Map(); // テクスチャ管理用の連想配列
      return this;
    }
  }

  /**
   * 指定されたテクスチャを指定の名前でロードして連想配列に格納する(なんかTexture.Loaderなるものがあるっぽいけど...)
   * @param {String} name テクスチャ名(タグ)
   * @param {String} path テクスチャファイルパス
   * @returns {Boolean} ロードの成否
   */
  loadTexture(name: string, path: string, area = null) {
    let texture = PIXI.Texture.from(path);
    if (texture != null) {
      this.textures.set(name, texture);
      return true;
    } else {
      return false;
    }
  }

  /**
   * 複数パーツからなるテクスチャの一部分を切り抜く
   * @param {String} name テクスチャ名
   * @param {PIXI.BaseTexture} base ベーステクスチャ
   * @param {PIXI.Rectangle} part 切り出し領域
   */
  loadTextureAt(name: string, base: PIXI.BaseTexture, part: PIXI.Rectangle) {
    let texture = new PIXI.Texture(base, part);
    this.textures.set(name, texture);
    return true; // 失敗しない前提......
  }

  /**
   * JSONに記述されているkey:pathでテクスチャをロードする
   * @returns {Promise} テクスチャロードのPromise
   */
  loadTextureByJson(): Promise<void> {
    return new Promise((resolve, reject) => {
      let fail = false;
      for (let [name, info] of Object.entries(Const.RESOURCE)) {
        if ((info as any).parts === undefined) {
          if (!this.loadTexture(name, info.texture)) {
            fail = true;
          }
        } else {
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

          for (let [id, part] of Object.entries((info as PartsInfo).parts)) {
            part = part as PartsInfo['parts']['part'];

            let base = PIXI.Texture.from(info.texture);
            if (!this.loadTextureAt(name + '_' + id, base.baseTexture, new PIXI.Rectangle(part.x, part.y, part.u, part.v))) {
              fail = true;
            }
          }
        }
      }
      if (fail) {
        reject('テクスチャの読み込みエラー');
      }
      resolve();
    });
  }

  /**
   * 指定された名前とキーが一致するテクスチャを返す
   * @param {String} name
   * @returns {PIXI.Texture}
   */
  getTexruteByName(name: string) {
    if (name != null && this.textures.has(name)) {
      return this.textures.get(name);
    } else {
      console.error('no texture loaded name :' + name);
      return null;
    }
  }

  /**
   * 全てのテクスチャをアップデート
   * @param {PIXI.Renderer}
   */
  // refleshAllTextures(renderer) {
  //     // let texMgr = new PIXI.TextureManager(renderer);
  //     for (let [k, v] of this.textures) {
  //         // texMgr.updateTexture(v);
  //         // v.destroy();
  //         PIXI.Texture.removeFromCache(v);
  //     }
  // }
}
