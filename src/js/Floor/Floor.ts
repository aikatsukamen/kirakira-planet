import * as PIXI from 'pixi.js';

export class FloorContainer extends PIXI.Container {
  constructor() {
    super();
  }
}

export class Tile extends PIXI.Sprite {
  floorId: number;
  constructor(c: PIXI.Texture | null | undefined) {
    if (c) super(c);
  }
}
