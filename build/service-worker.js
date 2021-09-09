/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./service-worker.js",['./workbox-f96f0f89'], function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "css/style.css",
    "revision": "67716ddbcd04637080b84c16817be583"
  }, {
    "url": "css/style.min.css",
    "revision": "8a5778716ee39bceb5425a942f12d39d"
  }, {
    "url": "css/style.scss",
    "revision": "762b85406fc4da1bf82c11de750ef829"
  }, {
    "url": "index.html",
    "revision": "70125a7a056e9fee670147fcc3751b65"
  }, {
    "url": "js/bundle.js",
    "revision": "319555c57d68378c0548ca2aeebe40cf"
  }, {
    "url": "res/font/CUBICLE_.TTF",
    "revision": "a459f90df49c33f3b747505dd153ea1b"
  }, {
    "url": "res/img/card4.png",
    "revision": "65200f5db3d3f7fcd073b8c80e3e8d84"
  }, {
    "url": "res/img/cover-mid.jpg",
    "revision": "2aa6279d7ff31954470d03df10f3d99a"
  }, {
    "url": "res/img/qcoord.png",
    "revision": "562506668220da6a128c7fc9184d2ea6"
  }, {
    "url": "res/img/room/buta.png",
    "revision": "f128e544e221db7c5946898815c663fd"
  }, {
    "url": "res/img/room/chanja_hanako.png",
    "revision": "5d81cf4aeddddfbc1caa7efaabea9069"
  }, {
    "url": "res/img/room/chara.png",
    "revision": "27fdaeeb6bc81363d141853703ae8641"
  }, {
    "url": "res/img/room/chiba_tamatebako.png",
    "revision": "e15433b782c6d4d55d3f60771beef9ef"
  }, {
    "url": "res/img/room/chiikun_stick.png",
    "revision": "47b0c41a8377982cd8692a53879e9bad"
  }, {
    "url": "res/img/room/daishinrin_coooymeshi.png",
    "revision": "b0ff472705a0b5afc568eed31119e7f3"
  }, {
    "url": "res/img/room/floor_b.png",
    "revision": "860599b61cea4fbf5f910b2688820034"
  }, {
    "url": "res/img/room/floor_w.png",
    "revision": "3aa9326601986c371d4fa0267cb1b67f"
  }, {
    "url": "res/img/room/gobori_bmm.png",
    "revision": "b4a1425e508f08effae8d4a7b723968d"
  }, {
    "url": "res/img/room/herohero_yashinoki.png",
    "revision": "617198d73aa1969cb6305ca65b7d625c"
  }, {
    "url": "res/img/room/infolabel_author1.png",
    "revision": "1519f12a04384c0fb1134f805d919e55"
  }, {
    "url": "res/img/room/infolabel_author2.png",
    "revision": "4ea7817681d08e63486d96277d5089d4"
  }, {
    "url": "res/img/room/infolabel_summary.png",
    "revision": "01443bb88b5ea492131e5308f911f0c6"
  }, {
    "url": "res/img/room/infolabel_titlekana.png",
    "revision": "4601f41e0755f2fba5ceb7fee723d942"
  }, {
    "url": "res/img/room/inu_teaset.png",
    "revision": "db69d66483eff4beac6fcd07444d2452"
  }, {
    "url": "res/img/room/irijako_harigami.png",
    "revision": "400bf22b5e7b42cbce06b53c967da5ec"
  }, {
    "url": "res/img/room/itemlabel_inu.png",
    "revision": "a7786499e7bd68eb562584664a0ba972"
  }, {
    "url": "res/img/room/itemlabel_megochimo.png",
    "revision": "6979608530f407442de46626cd9f0ded"
  }, {
    "url": "res/img/room/loading.gif",
    "revision": "bfd6ab6517db9e44ff6c9ae5b9dee713"
  }, {
    "url": "res/img/room/loading_label.png",
    "revision": "3074ca080b2f296b44593a8f02927962"
  }, {
    "url": "res/img/room/loaing_label.png",
    "revision": "51569c21baefdd0b4255d8ab35419c36"
  }, {
    "url": "res/img/room/locker.png",
    "revision": "b1adbc57329f018309fb1150627223e7"
  }, {
    "url": "res/img/room/marutoyo_catalog.png",
    "revision": "55deda820d794a0828cbf76cf04c2270"
  }, {
    "url": "res/img/room/najima_curryaroma.png",
    "revision": "ecf5fed09d922c13e61f0dea04ba8bb6"
  }, {
    "url": "res/img/room/narihayao_usasensor.png",
    "revision": "3dfa8dfc97fae38a7a10096ca8131492"
  }, {
    "url": "res/img/room/ninana_zangai.png",
    "revision": "680950f5330daef793f32090d9820b95"
  }, {
    "url": "res/img/room/niza_mado.png",
    "revision": "762f392eb6a3d7589bff66a37564a9a3"
  }, {
    "url": "res/img/room/sofa.png",
    "revision": "efd20083ea929e06540fe2736ed01f58"
  }, {
    "url": "res/img/room/tokumeikibou_tritelepo.png",
    "revision": "f5b5e62eb784ce50d8ae41cf1de29ff2"
  }, {
    "url": "res/img/room/ui_btn_cancel.png",
    "revision": "e330b10aa42c7e27a8e789c319c37679"
  }, {
    "url": "res/img/room/ui_btn_link.png",
    "revision": "ccb85cf2d68c8af447abea599ddeb5c8"
  }, {
    "url": "res/img/room/ui_btn_move.png",
    "revision": "bdbe759e692951b4f97e1695195d87b9"
  }, {
    "url": "res/img/room/ui_btn_sample.png",
    "revision": "73b6a5defb5c1b2254cee65413e5d18f"
  }, {
    "url": "res/img/room/ui_btn_set.png",
    "revision": "527d3b31275ac5dc7ae1687e82c89a35"
  }, {
    "url": "res/img/room/unitykong_takoyakiki.png",
    "revision": "12a630d78b70791001dc4d2b3f2e6f77"
  }, {
    "url": "res/img/room/usatore_gakushudesk.png",
    "revision": "5e4645fdae2fe1ec575985beb767abe4"
  }, {
    "url": "res/img/room/wall.png",
    "revision": "3ff026947a506898698b85274e9d3b27"
  }, {
    "url": "res/img/room/wall_l.png",
    "revision": "9c8261239dca7cd223d1483c9a021de1"
  }, {
    "url": "res/img/room/wall_r.png",
    "revision": "ce7db4eb3e724abf1a93c5a33250101b"
  }], {});

});
//# sourceMappingURL=service-worker.js.map
