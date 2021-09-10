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
