import WebFontLoader from 'webfontloader';
import Room from './Scene/MySceneManager';

window.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');

  // webfontを読み込み
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

  const room = new Room();

  /** 下準備が全部終わったら画面生成 */
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
          const loading = document.querySelector('#loading') as HTMLDivElement;
          loading.style.display = 'none';
        }, 500);
      })
      .catch((e) => {
        console.error('Room Runtime Error');
        console.error(e);
      });
  };
});
