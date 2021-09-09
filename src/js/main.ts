import baguetteBox from 'baguetteBox.js';
import WebFontLoader from 'webfontloader';

import Room from './Room/Room';

// ルーム
window.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');

  const room = new Room();

  // サンプル準備
  let gOption = { async: true, buttons: true };
  let sampleList = new Map<string, any>();

  let writerList = document.querySelectorAll('.writer');

  writerList.forEach((w: HTMLDivElement) => {
    if (w.dataset.write != undefined || w.dataset.writer != null) {
      let n = w.dataset.writer as string;
      let g = baguetteBox.run('#gallery-' + n);
      sampleList.set(n, g);
      // room.addSample(n, g, gOption);
      (w.children[0] as HTMLDivElement).dataset.writer = n;
      (w.children[1] as HTMLDivElement).dataset.writer = n;
      (w.children[1].children[0] as HTMLDivElement).dataset.writer = n;
      w.addEventListener('click', (e: any) => {
        let t = e.target;
        console.log('clickevent');
        if (t.dataset.writer !== undefined) {
          baguetteBox.show(0, sampleList.get(t.dataset.writer)[0]);
          e.stopPropagation();
          e.preventDefault();
          window.addEventListener('click', closeSample);
        }
      });
    }
  });

  const closeSample = () => {
    baguetteBox.hide();
    window.removeEventListener('click', closeSample);
  };

  room.addSample('irijako', baguetteBox.run('#gallery-irijako'), gOption);
  room.addSample('inu', baguetteBox.run('#gallery-inu'), gOption);
  room.addSample('usatore', baguetteBox.run('#gallery-usatore'), gOption);
  room.addSample('gobori', baguetteBox.run('#gallery-gobori'), gOption);
  room.addSample('daishinrin', baguetteBox.run('#gallery-daishinrin'), gOption);
  room.addSample('chi_kun', baguetteBox.run('#gallery-chi_kun'), gOption);
  room.addSample('chiba', baguetteBox.run('#gallery-chiba'), gOption);
  room.addSample('chanja', baguetteBox.run('#gallery-chanja'), gOption);
  room.addSample('tokumeikibou', baguetteBox.run('#gallery-tokumeikibou'), gOption);
  room.addSample('najima', baguetteBox.run('#gallery-najima'), gOption);
  room.addSample('narihayao', baguetteBox.run('#gallery-narihayao'), gOption);
  room.addSample('niza', baguetteBox.run('#gallery-niza'), gOption);
  room.addSample('ni_nana', baguetteBox.run('#gallery-ni_nana'), gOption);
  room.addSample('herohero', baguetteBox.run('#gallery-herohero'), gOption);
  room.addSample('marutoyo', baguetteBox.run('#gallery-marutoyo'), gOption);
  room.addSample('megochimo', baguetteBox.run('#gallery-megochimo'), gOption);
  room.addSample('unity_kong', baguetteBox.run('#gallery-unity_kong'), gOption);

  WebFontLoader.load({
    custom: {
      families: ['Cubicle'],
      urls: ['./css/style.css'],
    },
    active: function () {
      console.log('finish font loading');
      go();
    },
    inactive: function () {
      console.log('font loading failed');
    },
  });

  const loading = document.querySelector('#loading') as HTMLDivElement;
  loading.style.display = 'none';

  /** 下準備が全部終わったらルームを生成 */
  const go = () => {
    Promise.all(room.getPromisesIsReady())
      .catch((e) => {
        console.error('Loading Error');
        console.error(e);
        Promise.reject();
      })
      .then(() => {
        setTimeout(() => {
          room.go();
        }, 500);
      })
      .catch((e) => {
        console.error('Room Runtime Error');
        console.error(e);
      });
  };

  go();
});
