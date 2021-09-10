class Vector2 {
  x: number;
  y: number;

  // コンストラクタではxとyを初期化するだけ
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  // xとyをセットする
  set(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  // ベクトルの複製
  clone() {
    return new Vector2(this.x, this.y);
  }

  // 足し算：渡されたベクトルのxとyを自分のxとyに足す
  add(v: Vector2) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  // 引き算：渡されたベクトルのxとyを自分のxとyから引く
  sub(v: Vector2) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  // 実数倍：渡された数値を自分のxとyにかける
  times(num: number) {
    this.x *= num;
    this.y *= num;
    return this;
  }

  // 逆ベクトル
  get inverse() {
    // 自分を-1倍すれば逆ベクトルになる
    // 複製を作る事で自分自身の中身は変えずに済む
    return this.clone().times(-1);
  }

  // ベクトルの大きさ
  get magnitude() {
    const { x, y } = this;
    // ベクトルの大きさはx成分の二乗とy成分の二乗のルート
    return Math.sqrt(x ** 2 + y ** 2);
  }

  // 正規化されたベクトル
  get normalized() {
    const { x, y, magnitude } = this;
    // ベクトルの正規化はxとyを大きさ(magnitude)で割る
    return new Vector2(x / magnitude, y / magnitude);
  }

  // 足し算：static バージョン
  static add(v1: Vector2, v2: Vector2) {
    return v1.clone().add(v2);
  }

  // 引き算：static バージョン
  static sub(v1: Vector2, v2: Vector2) {
    return v1.clone().sub(v2);
  }

  // 実数倍：static バージョン
  static times(v1: Vector2, num: number) {
    return v1.clone().times(num);
  }

  // 内積
  static dot(v1: Vector2, v2: Vector2) {
    // 内積は２つのベクトルのx同士、y同士をかけて足したモノ
    return v1.x * v2.x + v1.y * v2.y;
  }

  // 外積
  static cross(v1: Vector2, v2: Vector2) {
    // 外積は２つのベクトルのxyをそれぞれかけて引いたモノ
    return v1.x * v2.y - v1.y * v2.x;
  }

  // ２点間の距離
  static distance(v1: Vector2, v2: Vector2) {
    // ２つのベクトルの間の距離は
    // 引き算した結果のベクトルの大きさ
    return Vector2.sub(v1, v2).magnitude;
  }

  // ２つのベクトルが平行かどうか
  static isParallel(v1: Vector2, v2: Vector2) {
    // 外積の結果が0だったら平行
    return Vector2.cross(v1, v2) === 0;
  }

  // ２つのベクトルが垂直かどうか
  static isVertical(v1: Vector2, v2: Vector2) {
    // 内積の結果が0だったら垂直
    return Vector2.dot(v1, v2) === 0;
  }

  // ゼロベクトル
  static get zero() {
    return new Vector2(0, 0);
  }

  // xとyが1のベクトル
  static get one() {
    return new Vector2(1, 1);
  }

  // 右向きのベクトル
  static get right() {
    return new Vector2(1, 0);
  }

  // 左向きのベクトル
  static get left() {
    return new Vector2(-1, 0);
  }

  // 上向きのベクトル
  static get up() {
    return new Vector2(0, 1);
  }

  // 下向きのベクトル
  static get down() {
    return new Vector2(0, -1);
  }
}

export default Vector2;
