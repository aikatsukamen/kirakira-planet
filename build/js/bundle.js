/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/baguetteBox.js/dist/baguetteBox.min.js":
/*!*************************************************************!*\
  !*** ./node_modules/baguetteBox.js/dist/baguetteBox.min.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * baguetteBox.js
 * @author  feimosi
 * @version 1.11.1
 * @url https://github.com/feimosi/baguetteBox.js
 */
!function (e, t) {
  "use strict";

   true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(this, function () {
  "use strict";

  var r,
      l,
      u,
      c,
      d,
      f = '<svg width="44" height="60"><polyline points="30 10 10 30 30 50" stroke="rgba(255,255,255,0.5)" stroke-width="4"stroke-linecap="butt" fill="none" stroke-linejoin="round"/></svg>',
      g = '<svg width="44" height="60"><polyline points="14 10 34 30 14 50" stroke="rgba(255,255,255,0.5)" stroke-width="4"stroke-linecap="butt" fill="none" stroke-linejoin="round"/></svg>',
      p = '<svg width="30" height="30"><g stroke="rgb(160,160,160)" stroke-width="4"><line x1="5" y1="5" x2="25" y2="25"/><line x1="5" y1="25" x2="25" y2="5"/></g></svg>',
      b = {},
      v = {
    captions: !0,
    buttons: "auto",
    fullScreen: !1,
    noScrollbars: !1,
    bodyClass: "baguetteBox-open",
    titleTag: !1,
    async: !1,
    preload: 2,
    animation: "slideIn",
    afterShow: null,
    afterHide: null,
    onChange: null,
    overlayBackgroundColor: "rgba(0,0,0,.8)"
  },
      m = {},
      h = [],
      o = 0,
      n = !1,
      i = {},
      a = !1,
      y = /.+\.(gif|jpe?g|png|webp)/i,
      w = {},
      k = [],
      s = null,
      x = function (e) {
    -1 !== e.target.id.indexOf("baguette-img") && j();
  },
      E = function (e) {
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0, D();
  },
      C = function (e) {
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0, X();
  },
      B = function (e) {
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0, j();
  },
      T = function (e) {
    i.count++, 1 < i.count && (i.multitouch = !0), i.startX = e.changedTouches[0].pageX, i.startY = e.changedTouches[0].pageY;
  },
      N = function (e) {
    if (!a && !i.multitouch) {
      e.preventDefault ? e.preventDefault() : e.returnValue = !1;
      var t = e.touches[0] || e.changedTouches[0];
      40 < t.pageX - i.startX ? (a = !0, D()) : t.pageX - i.startX < -40 ? (a = !0, X()) : 100 < i.startY - t.pageY && j();
    }
  },
      L = function () {
    i.count--, i.count <= 0 && (i.multitouch = !1), a = !1;
  },
      A = function () {
    L();
  },
      P = function (e) {
    "block" === r.style.display && r.contains && !r.contains(e.target) && (e.stopPropagation(), Y());
  };

  function S(e) {
    if (w.hasOwnProperty(e)) {
      var t = w[e].galleries;
      [].forEach.call(t, function (e) {
        [].forEach.call(e, function (e) {
          W(e.imageElement, "click", e.eventHandler);
        }), h === e && (h = []);
      }), delete w[e];
    }
  }

  function F(e) {
    switch (e.keyCode) {
      case 37:
        D();
        break;

      case 39:
        X();
        break;

      case 27:
        j();
        break;

      case 36:
        !function t(e) {
          e && e.preventDefault();
          return M(0);
        }(e);
        break;

      case 35:
        !function n(e) {
          e && e.preventDefault();
          return M(h.length - 1);
        }(e);
    }
  }

  function H(e, t) {
    if (h !== e) {
      for (h = e, function s(e) {
        e = e || {};

        for (var t in v) b[t] = v[t], "undefined" != typeof e[t] && (b[t] = e[t]);

        l.style.transition = l.style.webkitTransition = "fadeIn" === b.animation ? "opacity .4s ease" : "slideIn" === b.animation ? "" : "none", "auto" === b.buttons && (("ontouchstart" in window) || 1 === h.length) && (b.buttons = !1);
        u.style.display = c.style.display = b.buttons ? "" : "none";

        try {
          r.style.backgroundColor = b.overlayBackgroundColor;
        } catch (n) {}
      }(t); l.firstChild;) l.removeChild(l.firstChild);

      for (var n, o = [], i = [], a = k.length = 0; a < e.length; a++) (n = J("div")).className = "full-image", n.id = "baguette-img-" + a, k.push(n), o.push("baguetteBox-figure-" + a), i.push("baguetteBox-figcaption-" + a), l.appendChild(k[a]);

      r.setAttribute("aria-labelledby", o.join(" ")), r.setAttribute("aria-describedby", i.join(" "));
    }
  }

  function I(e) {
    b.noScrollbars && (document.documentElement.style.overflowY = "hidden", document.body.style.overflowY = "scroll"), "block" !== r.style.display && (U(document, "keydown", F), i = {
      count: 0,
      startX: null,
      startY: null
    }, q(o = e, function () {
      z(o), V(o);
    }), R(), r.style.display = "block", b.fullScreen && function t() {
      r.requestFullscreen ? r.requestFullscreen() : r.webkitRequestFullscreen ? r.webkitRequestFullscreen() : r.mozRequestFullScreen && r.mozRequestFullScreen();
    }(), setTimeout(function () {
      r.className = "visible", b.bodyClass && document.body.classList && document.body.classList.add(b.bodyClass), b.afterShow && b.afterShow();
    }, 50), b.onChange && b.onChange(o, k.length), s = document.activeElement, Y(), n = !0);
  }

  function Y() {
    b.buttons ? u.focus() : d.focus();
  }

  function j() {
    b.noScrollbars && (document.documentElement.style.overflowY = "auto", document.body.style.overflowY = "auto"), "none" !== r.style.display && (W(document, "keydown", F), r.className = "", setTimeout(function () {
      r.style.display = "none", document.fullscreen && function e() {
        document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen();
      }(), b.bodyClass && document.body.classList && document.body.classList.remove(b.bodyClass), b.afterHide && b.afterHide(), s && s.focus(), n = !1;
    }, 500));
  }

  function q(t, n) {
    var e = k[t],
        o = h[t];
    if (void 0 !== e && void 0 !== o) if (e.getElementsByTagName("img")[0]) n && n();else {
      var i = o.imageElement,
          a = i.getElementsByTagName("img")[0],
          s = "function" == typeof b.captions ? b.captions.call(h, i) : i.getAttribute("data-caption") || i.title,
          r = function d(e) {
        var t = e.href;

        if (e.dataset) {
          var n = [];

          for (var o in e.dataset) "at-" !== o.substring(0, 3) || isNaN(o.substring(3)) || (n[o.replace("at-", "")] = e.dataset[o]);

          for (var i = Object.keys(n).sort(function (e, t) {
            return parseInt(e, 10) < parseInt(t, 10) ? -1 : 1;
          }), a = window.innerWidth * window.devicePixelRatio, s = 0; s < i.length - 1 && i[s] < a;) s++;

          t = n[i[s]] || t;
        }

        return t;
      }(i),
          l = J("figure");

      if (l.id = "baguetteBox-figure-" + t, l.innerHTML = '<div class="baguetteBox-spinner"><div class="baguetteBox-double-bounce1"></div><div class="baguetteBox-double-bounce2"></div></div>', b.captions && s) {
        var u = J("figcaption");
        u.id = "baguetteBox-figcaption-" + t, u.innerHTML = s, l.appendChild(u);
      }

      e.appendChild(l);
      var c = J("img");
      c.onload = function () {
        var e = document.querySelector("#baguette-img-" + t + " .baguetteBox-spinner");
        l.removeChild(e), !b.async && n && n();
      }, c.setAttribute("src", r), c.alt = a && a.alt || "", b.titleTag && s && (c.title = s), l.appendChild(c), b.async && n && n();
    }
  }

  function X() {
    return M(o + 1);
  }

  function D() {
    return M(o - 1);
  }

  function M(e, t) {
    return !n && 0 <= e && e < t.length ? (H(t, b), I(e), !0) : e < 0 ? (b.animation && O("left"), !1) : e >= k.length ? (b.animation && O("right"), !1) : (q(o = e, function () {
      z(o), V(o);
    }), R(), b.onChange && b.onChange(o, k.length), !0);
  }

  function O(e) {
    l.className = "bounce-from-" + e, setTimeout(function () {
      l.className = "";
    }, 400);
  }

  function R() {
    var e = 100 * -o + "%";
    "fadeIn" === b.animation ? (l.style.opacity = 0, setTimeout(function () {
      m.transforms ? l.style.transform = l.style.webkitTransform = "translate3d(" + e + ",0,0)" : l.style.left = e, l.style.opacity = 1;
    }, 400)) : m.transforms ? l.style.transform = l.style.webkitTransform = "translate3d(" + e + ",0,0)" : l.style.left = e;
  }

  function z(e) {
    e - o >= b.preload || q(e + 1, function () {
      z(e + 1);
    });
  }

  function V(e) {
    o - e >= b.preload || q(e - 1, function () {
      V(e - 1);
    });
  }

  function U(e, t, n, o) {
    e.addEventListener ? e.addEventListener(t, n, o) : e.attachEvent("on" + t, function (e) {
      (e = e || window.event).target = e.target || e.srcElement, n(e);
    });
  }

  function W(e, t, n, o) {
    e.removeEventListener ? e.removeEventListener(t, n, o) : e.detachEvent("on" + t, n);
  }

  function G(e) {
    return document.getElementById(e);
  }

  function J(e) {
    return document.createElement(e);
  }

  return [].forEach || (Array.prototype.forEach = function (e, t) {
    for (var n = 0; n < this.length; n++) e.call(t, this[n], n, this);
  }), [].filter || (Array.prototype.filter = function (e, t, n, o, i) {
    for (n = this, o = [], i = 0; i < n.length; i++) e.call(t, n[i], i, n) && o.push(n[i]);

    return o;
  }), {
    run: function K(e, t) {
      return m.transforms = function n() {
        var e = J("div");
        return "undefined" != typeof e.style.perspective || "undefined" != typeof e.style.webkitPerspective;
      }(), m.svg = function o() {
        var e = J("div");
        return e.innerHTML = "<svg/>", "http://www.w3.org/2000/svg" === (e.firstChild && e.firstChild.namespaceURI);
      }(), m.passiveEvents = function i() {
        var e = !1;

        try {
          var t = Object.defineProperty({}, "passive", {
            get: function () {
              e = !0;
            }
          });
          window.addEventListener("test", null, t);
        } catch (n) {}

        return e;
      }(), function a() {
        if (r = G("baguetteBox-overlay")) return l = G("baguetteBox-slider"), u = G("previous-button"), c = G("next-button"), void (d = G("close-button"));
        (r = J("div")).setAttribute("role", "dialog"), r.id = "baguetteBox-overlay", document.getElementsByTagName("body")[0].appendChild(r), (l = J("div")).id = "baguetteBox-slider", r.appendChild(l), (u = J("button")).setAttribute("type", "button"), u.id = "previous-button", u.setAttribute("aria-label", "Previous"), u.innerHTML = m.svg ? f : "&lt;", r.appendChild(u), (c = J("button")).setAttribute("type", "button"), c.id = "next-button", c.setAttribute("aria-label", "Next"), c.innerHTML = m.svg ? g : "&gt;", r.appendChild(c), (d = J("button")).setAttribute("type", "button"), d.id = "close-button", d.setAttribute("aria-label", "Close"), d.innerHTML = m.svg ? p : "&times;", r.appendChild(d), u.className = c.className = d.className = "baguetteBox-button", function n() {
          var e = m.passiveEvents ? {
            passive: !1
          } : null,
              t = m.passiveEvents ? {
            passive: !0
          } : null;
          U(r, "click", x), U(u, "click", E), U(c, "click", C), U(d, "click", B), U(l, "contextmenu", A), U(r, "touchstart", T, t), U(r, "touchmove", N, e), U(r, "touchend", L), U(document, "focus", P, !0);
        }();
      }(), S(e), function s(e, a) {
        var t = document.querySelectorAll(e),
            n = {
          galleries: [],
          nodeList: t
        };
        return w[e] = n, [].forEach.call(t, function (e) {
          a && a.filter && (y = a.filter);
          var t = [];

          if (t = "A" === e.tagName ? [e] : e.getElementsByTagName("a"), 0 !== (t = [].filter.call(t, function (e) {
            if (-1 === e.className.indexOf(a && a.ignoreClass)) return y.test(e.href);
          })).length) {
            var i = [];
            [].forEach.call(t, function (e, t) {
              var n = function (e) {
                e.preventDefault ? e.preventDefault() : e.returnValue = !1, H(i, a), I(t);
              },
                  o = {
                eventHandler: n,
                imageElement: e
              };

              U(e, "click", n), i.push(o);
            }), n.galleries.push(i);
          }
        }), n.galleries;
      }(e, t);
    },
    show: M,
    showNext: X,
    showPrevious: D,
    hide: j,
    destroy: function e() {
      !function n() {
        var e = m.passiveEvents ? {
          passive: !1
        } : null,
            t = m.passiveEvents ? {
          passive: !0
        } : null;
        W(r, "click", x), W(u, "click", E), W(c, "click", C), W(d, "click", B), W(l, "contextmenu", A), W(r, "touchstart", T, t), W(r, "touchmove", N, e), W(r, "touchend", L), W(document, "focus", P, !0);
      }(), function t() {
        for (var e in w) w.hasOwnProperty(e) && S(e);
      }(), W(document, "keydown", F), document.getElementsByTagName("body")[0].removeChild(document.getElementById("baguetteBox-overlay")), w = {}, h = [], o = 0;
    }
  };
});

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
function __createBinding(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
}
function __exportStar(m, exports) {
  for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

  return ar;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
}
;
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;

  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }

  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }

  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }

  function fulfill(value) {
    resume("next", value);
  }

  function reject(value) {
    resume("throw", value);
  }

  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;

  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
}
;
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result.default = mod;
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}
function __classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  privateMap.set(receiver, value);
  return value;
}

/***/ }),

/***/ "./node_modules/webfontloader/webfontloader.js":
/*!*****************************************************!*\
  !*** ./node_modules/webfontloader/webfontloader.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* Web Font Loader v1.6.28 - (c) Adobe Systems, Google. License: Apache 2.0 */
(function () {
  function aa(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }

  function ba(a, b, c) {
    if (!a) throw Error();

    if (2 < arguments.length) {
      var d = Array.prototype.slice.call(arguments, 2);
      return function () {
        var c = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(c, d);
        return a.apply(b, c);
      };
    }

    return function () {
      return a.apply(b, arguments);
    };
  }

  function p(a, b, c) {
    p = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? aa : ba;
    return p.apply(null, arguments);
  }

  var q = Date.now || function () {
    return +new Date();
  };

  function ca(a, b) {
    this.a = a;
    this.o = b || a;
    this.c = this.o.document;
  }

  var da = !!window.FontFace;

  function t(a, b, c, d) {
    b = a.c.createElement(b);
    if (c) for (var e in c) c.hasOwnProperty(e) && ("style" == e ? b.style.cssText = c[e] : b.setAttribute(e, c[e]));
    d && b.appendChild(a.c.createTextNode(d));
    return b;
  }

  function u(a, b, c) {
    a = a.c.getElementsByTagName(b)[0];
    a || (a = document.documentElement);
    a.insertBefore(c, a.lastChild);
  }

  function v(a) {
    a.parentNode && a.parentNode.removeChild(a);
  }

  function w(a, b, c) {
    b = b || [];
    c = c || [];

    for (var d = a.className.split(/\s+/), e = 0; e < b.length; e += 1) {
      for (var f = !1, g = 0; g < d.length; g += 1) if (b[e] === d[g]) {
        f = !0;
        break;
      }

      f || d.push(b[e]);
    }

    b = [];

    for (e = 0; e < d.length; e += 1) {
      f = !1;

      for (g = 0; g < c.length; g += 1) if (d[e] === c[g]) {
        f = !0;
        break;
      }

      f || b.push(d[e]);
    }

    a.className = b.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
  }

  function y(a, b) {
    for (var c = a.className.split(/\s+/), d = 0, e = c.length; d < e; d++) if (c[d] == b) return !0;

    return !1;
  }

  function ea(a) {
    return a.o.location.hostname || a.a.location.hostname;
  }

  function z(a, b, c) {
    function d() {
      m && e && f && (m(g), m = null);
    }

    b = t(a, "link", {
      rel: "stylesheet",
      href: b,
      media: "all"
    });
    var e = !1,
        f = !0,
        g = null,
        m = c || null;
    da ? (b.onload = function () {
      e = !0;
      d();
    }, b.onerror = function () {
      e = !0;
      g = Error("Stylesheet failed to load");
      d();
    }) : setTimeout(function () {
      e = !0;
      d();
    }, 0);
    u(a, "head", b);
  }

  function A(a, b, c, d) {
    var e = a.c.getElementsByTagName("head")[0];

    if (e) {
      var f = t(a, "script", {
        src: b
      }),
          g = !1;

      f.onload = f.onreadystatechange = function () {
        g || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (g = !0, c && c(null), f.onload = f.onreadystatechange = null, "HEAD" == f.parentNode.tagName && e.removeChild(f));
      };

      e.appendChild(f);
      setTimeout(function () {
        g || (g = !0, c && c(Error("Script load timeout")));
      }, d || 5E3);
      return f;
    }

    return null;
  }

  ;

  function B() {
    this.a = 0;
    this.c = null;
  }

  function C(a) {
    a.a++;
    return function () {
      a.a--;
      D(a);
    };
  }

  function E(a, b) {
    a.c = b;
    D(a);
  }

  function D(a) {
    0 == a.a && a.c && (a.c(), a.c = null);
  }

  ;

  function F(a) {
    this.a = a || "-";
  }

  F.prototype.c = function (a) {
    for (var b = [], c = 0; c < arguments.length; c++) b.push(arguments[c].replace(/[\W_]+/g, "").toLowerCase());

    return b.join(this.a);
  };

  function G(a, b) {
    this.c = a;
    this.f = 4;
    this.a = "n";
    var c = (b || "n4").match(/^([nio])([1-9])$/i);
    c && (this.a = c[1], this.f = parseInt(c[2], 10));
  }

  function fa(a) {
    return H(a) + " " + (a.f + "00") + " 300px " + I(a.c);
  }

  function I(a) {
    var b = [];
    a = a.split(/,\s*/);

    for (var c = 0; c < a.length; c++) {
      var d = a[c].replace(/['"]/g, "");
      -1 != d.indexOf(" ") || /^\d/.test(d) ? b.push("'" + d + "'") : b.push(d);
    }

    return b.join(",");
  }

  function J(a) {
    return a.a + a.f;
  }

  function H(a) {
    var b = "normal";
    "o" === a.a ? b = "oblique" : "i" === a.a && (b = "italic");
    return b;
  }

  function ga(a) {
    var b = 4,
        c = "n",
        d = null;
    a && ((d = a.match(/(normal|oblique|italic)/i)) && d[1] && (c = d[1].substr(0, 1).toLowerCase()), (d = a.match(/([1-9]00|normal|bold)/i)) && d[1] && (/bold/i.test(d[1]) ? b = 7 : /[1-9]00/.test(d[1]) && (b = parseInt(d[1].substr(0, 1), 10))));
    return c + b;
  }

  ;

  function ha(a, b) {
    this.c = a;
    this.f = a.o.document.documentElement;
    this.h = b;
    this.a = new F("-");
    this.j = !1 !== b.events;
    this.g = !1 !== b.classes;
  }

  function ia(a) {
    a.g && w(a.f, [a.a.c("wf", "loading")]);
    K(a, "loading");
  }

  function L(a) {
    if (a.g) {
      var b = y(a.f, a.a.c("wf", "active")),
          c = [],
          d = [a.a.c("wf", "loading")];
      b || c.push(a.a.c("wf", "inactive"));
      w(a.f, c, d);
    }

    K(a, "inactive");
  }

  function K(a, b, c) {
    if (a.j && a.h[b]) if (c) a.h[b](c.c, J(c));else a.h[b]();
  }

  ;

  function ja() {
    this.c = {};
  }

  function ka(a, b, c) {
    var d = [],
        e;

    for (e in b) if (b.hasOwnProperty(e)) {
      var f = a.c[e];
      f && d.push(f(b[e], c));
    }

    return d;
  }

  ;

  function M(a, b) {
    this.c = a;
    this.f = b;
    this.a = t(this.c, "span", {
      "aria-hidden": "true"
    }, this.f);
  }

  function N(a) {
    u(a.c, "body", a.a);
  }

  function O(a) {
    return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + I(a.c) + ";" + ("font-style:" + H(a) + ";font-weight:" + (a.f + "00") + ";");
  }

  ;

  function P(a, b, c, d, e, f) {
    this.g = a;
    this.j = b;
    this.a = d;
    this.c = c;
    this.f = e || 3E3;
    this.h = f || void 0;
  }

  P.prototype.start = function () {
    var a = this.c.o.document,
        b = this,
        c = q(),
        d = new Promise(function (d, e) {
      function f() {
        q() - c >= b.f ? e() : a.fonts.load(fa(b.a), b.h).then(function (a) {
          1 <= a.length ? d() : setTimeout(f, 25);
        }, function () {
          e();
        });
      }

      f();
    }),
        e = null,
        f = new Promise(function (a, d) {
      e = setTimeout(d, b.f);
    });
    Promise.race([f, d]).then(function () {
      e && (clearTimeout(e), e = null);
      b.g(b.a);
    }, function () {
      b.j(b.a);
    });
  };

  function Q(a, b, c, d, e, f, g) {
    this.v = a;
    this.B = b;
    this.c = c;
    this.a = d;
    this.s = g || "BESbswy";
    this.f = {};
    this.w = e || 3E3;
    this.u = f || null;
    this.m = this.j = this.h = this.g = null;
    this.g = new M(this.c, this.s);
    this.h = new M(this.c, this.s);
    this.j = new M(this.c, this.s);
    this.m = new M(this.c, this.s);
    a = new G(this.a.c + ",serif", J(this.a));
    a = O(a);
    this.g.a.style.cssText = a;
    a = new G(this.a.c + ",sans-serif", J(this.a));
    a = O(a);
    this.h.a.style.cssText = a;
    a = new G("serif", J(this.a));
    a = O(a);
    this.j.a.style.cssText = a;
    a = new G("sans-serif", J(this.a));
    a = O(a);
    this.m.a.style.cssText = a;
    N(this.g);
    N(this.h);
    N(this.j);
    N(this.m);
  }

  var R = {
    D: "serif",
    C: "sans-serif"
  },
      S = null;

  function T() {
    if (null === S) {
      var a = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
      S = !!a && (536 > parseInt(a[1], 10) || 536 === parseInt(a[1], 10) && 11 >= parseInt(a[2], 10));
    }

    return S;
  }

  Q.prototype.start = function () {
    this.f.serif = this.j.a.offsetWidth;
    this.f["sans-serif"] = this.m.a.offsetWidth;
    this.A = q();
    U(this);
  };

  function la(a, b, c) {
    for (var d in R) if (R.hasOwnProperty(d) && b === a.f[R[d]] && c === a.f[R[d]]) return !0;

    return !1;
  }

  function U(a) {
    var b = a.g.a.offsetWidth,
        c = a.h.a.offsetWidth,
        d;
    (d = b === a.f.serif && c === a.f["sans-serif"]) || (d = T() && la(a, b, c));
    d ? q() - a.A >= a.w ? T() && la(a, b, c) && (null === a.u || a.u.hasOwnProperty(a.a.c)) ? V(a, a.v) : V(a, a.B) : ma(a) : V(a, a.v);
  }

  function ma(a) {
    setTimeout(p(function () {
      U(this);
    }, a), 50);
  }

  function V(a, b) {
    setTimeout(p(function () {
      v(this.g.a);
      v(this.h.a);
      v(this.j.a);
      v(this.m.a);
      b(this.a);
    }, a), 0);
  }

  ;

  function W(a, b, c) {
    this.c = a;
    this.a = b;
    this.f = 0;
    this.m = this.j = !1;
    this.s = c;
  }

  var X = null;

  W.prototype.g = function (a) {
    var b = this.a;
    b.g && w(b.f, [b.a.c("wf", a.c, J(a).toString(), "active")], [b.a.c("wf", a.c, J(a).toString(), "loading"), b.a.c("wf", a.c, J(a).toString(), "inactive")]);
    K(b, "fontactive", a);
    this.m = !0;
    na(this);
  };

  W.prototype.h = function (a) {
    var b = this.a;

    if (b.g) {
      var c = y(b.f, b.a.c("wf", a.c, J(a).toString(), "active")),
          d = [],
          e = [b.a.c("wf", a.c, J(a).toString(), "loading")];
      c || d.push(b.a.c("wf", a.c, J(a).toString(), "inactive"));
      w(b.f, d, e);
    }

    K(b, "fontinactive", a);
    na(this);
  };

  function na(a) {
    0 == --a.f && a.j && (a.m ? (a = a.a, a.g && w(a.f, [a.a.c("wf", "active")], [a.a.c("wf", "loading"), a.a.c("wf", "inactive")]), K(a, "active")) : L(a.a));
  }

  ;

  function oa(a) {
    this.j = a;
    this.a = new ja();
    this.h = 0;
    this.f = this.g = !0;
  }

  oa.prototype.load = function (a) {
    this.c = new ca(this.j, a.context || this.j);
    this.g = !1 !== a.events;
    this.f = !1 !== a.classes;
    pa(this, new ha(this.c, a), a);
  };

  function qa(a, b, c, d, e) {
    var f = 0 == --a.h;
    (a.f || a.g) && setTimeout(function () {
      var a = e || null,
          m = d || null || {};
      if (0 === c.length && f) L(b.a);else {
        b.f += c.length;
        f && (b.j = f);
        var h,
            l = [];

        for (h = 0; h < c.length; h++) {
          var k = c[h],
              n = m[k.c],
              r = b.a,
              x = k;
          r.g && w(r.f, [r.a.c("wf", x.c, J(x).toString(), "loading")]);
          K(r, "fontloading", x);
          r = null;
          if (null === X) if (window.FontFace) {
            var x = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent),
                xa = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
            X = x ? 42 < parseInt(x[1], 10) : xa ? !1 : !0;
          } else X = !1;
          X ? r = new P(p(b.g, b), p(b.h, b), b.c, k, b.s, n) : r = new Q(p(b.g, b), p(b.h, b), b.c, k, b.s, a, n);
          l.push(r);
        }

        for (h = 0; h < l.length; h++) l[h].start();
      }
    }, 0);
  }

  function pa(a, b, c) {
    var d = [],
        e = c.timeout;
    ia(b);
    var d = ka(a.a, c, a.c),
        f = new W(a.c, b, e);
    a.h = d.length;
    b = 0;

    for (c = d.length; b < c; b++) d[b].load(function (b, d, c) {
      qa(a, f, b, d, c);
    });
  }

  ;

  function ra(a, b) {
    this.c = a;
    this.a = b;
  }

  ra.prototype.load = function (a) {
    function b() {
      if (f["__mti_fntLst" + d]) {
        var c = f["__mti_fntLst" + d](),
            e = [],
            h;
        if (c) for (var l = 0; l < c.length; l++) {
          var k = c[l].fontfamily;
          void 0 != c[l].fontStyle && void 0 != c[l].fontWeight ? (h = c[l].fontStyle + c[l].fontWeight, e.push(new G(k, h))) : e.push(new G(k));
        }
        a(e);
      } else setTimeout(function () {
        b();
      }, 50);
    }

    var c = this,
        d = c.a.projectId,
        e = c.a.version;

    if (d) {
      var f = c.c.o;
      A(this.c, (c.a.api || "https://fast.fonts.net/jsapi") + "/" + d + ".js" + (e ? "?v=" + e : ""), function (e) {
        e ? a([]) : (f["__MonotypeConfiguration__" + d] = function () {
          return c.a;
        }, b());
      }).id = "__MonotypeAPIScript__" + d;
    } else a([]);
  };

  function sa(a, b) {
    this.c = a;
    this.a = b;
  }

  sa.prototype.load = function (a) {
    var b,
        c,
        d = this.a.urls || [],
        e = this.a.families || [],
        f = this.a.testStrings || {},
        g = new B();
    b = 0;

    for (c = d.length; b < c; b++) z(this.c, d[b], C(g));

    var m = [];
    b = 0;

    for (c = e.length; b < c; b++) if (d = e[b].split(":"), d[1]) for (var h = d[1].split(","), l = 0; l < h.length; l += 1) m.push(new G(d[0], h[l]));else m.push(new G(d[0]));

    E(g, function () {
      a(m, f);
    });
  };

  function ta(a, b) {
    a ? this.c = a : this.c = ua;
    this.a = [];
    this.f = [];
    this.g = b || "";
  }

  var ua = "https://fonts.googleapis.com/css";

  function va(a, b) {
    for (var c = b.length, d = 0; d < c; d++) {
      var e = b[d].split(":");
      3 == e.length && a.f.push(e.pop());
      var f = "";
      2 == e.length && "" != e[1] && (f = ":");
      a.a.push(e.join(f));
    }
  }

  function wa(a) {
    if (0 == a.a.length) throw Error("No fonts to load!");
    if (-1 != a.c.indexOf("kit=")) return a.c;

    for (var b = a.a.length, c = [], d = 0; d < b; d++) c.push(a.a[d].replace(/ /g, "+"));

    b = a.c + "?family=" + c.join("%7C");
    0 < a.f.length && (b += "&subset=" + a.f.join(","));
    0 < a.g.length && (b += "&text=" + encodeURIComponent(a.g));
    return b;
  }

  ;

  function ya(a) {
    this.f = a;
    this.a = [];
    this.c = {};
  }

  var za = {
    latin: "BESbswy",
    "latin-ext": "\u00e7\u00f6\u00fc\u011f\u015f",
    cyrillic: "\u0439\u044f\u0416",
    greek: "\u03b1\u03b2\u03a3",
    khmer: "\u1780\u1781\u1782",
    Hanuman: "\u1780\u1781\u1782"
  },
      Aa = {
    thin: "1",
    extralight: "2",
    "extra-light": "2",
    ultralight: "2",
    "ultra-light": "2",
    light: "3",
    regular: "4",
    book: "4",
    medium: "5",
    "semi-bold": "6",
    semibold: "6",
    "demi-bold": "6",
    demibold: "6",
    bold: "7",
    "extra-bold": "8",
    extrabold: "8",
    "ultra-bold": "8",
    ultrabold: "8",
    black: "9",
    heavy: "9",
    l: "3",
    r: "4",
    b: "7"
  },
      Ba = {
    i: "i",
    italic: "i",
    n: "n",
    normal: "n"
  },
      Ca = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;

  function Da(a) {
    for (var b = a.f.length, c = 0; c < b; c++) {
      var d = a.f[c].split(":"),
          e = d[0].replace(/\+/g, " "),
          f = ["n4"];

      if (2 <= d.length) {
        var g;
        var m = d[1];
        g = [];
        if (m) for (var m = m.split(","), h = m.length, l = 0; l < h; l++) {
          var k;
          k = m[l];

          if (k.match(/^[\w-]+$/)) {
            var n = Ca.exec(k.toLowerCase());
            if (null == n) k = "";else {
              k = n[2];
              k = null == k || "" == k ? "n" : Ba[k];
              n = n[1];
              if (null == n || "" == n) n = "4";else var r = Aa[n],
                  n = r ? r : isNaN(n) ? "4" : n.substr(0, 1);
              k = [k, n].join("");
            }
          } else k = "";

          k && g.push(k);
        }
        0 < g.length && (f = g);
        3 == d.length && (d = d[2], g = [], d = d ? d.split(",") : g, 0 < d.length && (d = za[d[0]]) && (a.c[e] = d));
      }

      a.c[e] || (d = za[e]) && (a.c[e] = d);

      for (d = 0; d < f.length; d += 1) a.a.push(new G(e, f[d]));
    }
  }

  ;

  function Ea(a, b) {
    this.c = a;
    this.a = b;
  }

  var Fa = {
    Arimo: !0,
    Cousine: !0,
    Tinos: !0
  };

  Ea.prototype.load = function (a) {
    var b = new B(),
        c = this.c,
        d = new ta(this.a.api, this.a.text),
        e = this.a.families;
    va(d, e);
    var f = new ya(e);
    Da(f);
    z(c, wa(d), C(b));
    E(b, function () {
      a(f.a, f.c, Fa);
    });
  };

  function Ga(a, b) {
    this.c = a;
    this.a = b;
  }

  Ga.prototype.load = function (a) {
    var b = this.a.id,
        c = this.c.o;
    b ? A(this.c, (this.a.api || "https://use.typekit.net") + "/" + b + ".js", function (b) {
      if (b) a([]);else if (c.Typekit && c.Typekit.config && c.Typekit.config.fn) {
        b = c.Typekit.config.fn;

        for (var e = [], f = 0; f < b.length; f += 2) for (var g = b[f], m = b[f + 1], h = 0; h < m.length; h++) e.push(new G(g, m[h]));

        try {
          c.Typekit.load({
            events: !1,
            classes: !1,
            async: !0
          });
        } catch (l) {}

        a(e);
      }
    }, 2E3) : a([]);
  };

  function Ha(a, b) {
    this.c = a;
    this.f = b;
    this.a = [];
  }

  Ha.prototype.load = function (a) {
    var b = this.f.id,
        c = this.c.o,
        d = this;
    b ? (c.__webfontfontdeckmodule__ || (c.__webfontfontdeckmodule__ = {}), c.__webfontfontdeckmodule__[b] = function (b, c) {
      for (var g = 0, m = c.fonts.length; g < m; ++g) {
        var h = c.fonts[g];
        d.a.push(new G(h.name, ga("font-weight:" + h.weight + ";font-style:" + h.style)));
      }

      a(d.a);
    }, A(this.c, (this.f.api || "https://f.fontdeck.com/s/css/js/") + ea(this.c) + "/" + b + ".js", function (b) {
      b && a([]);
    })) : a([]);
  };

  var Y = new oa(window);

  Y.a.c.custom = function (a, b) {
    return new sa(b, a);
  };

  Y.a.c.fontdeck = function (a, b) {
    return new Ha(b, a);
  };

  Y.a.c.monotype = function (a, b) {
    return new ra(b, a);
  };

  Y.a.c.typekit = function (a, b) {
    return new Ga(b, a);
  };

  Y.a.c.google = function (a, b) {
    return new Ea(b, a);
  };

  var Z = {
    load: p(Y.load, Y)
  };
   true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return Z;
  }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
})();

/***/ }),

/***/ "./src/js/main.ts":
/*!************************!*\
  !*** ./src/js/main.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

const baguetteBox_js_1 = (0, tslib_1.__importDefault)(__webpack_require__(/*! baguetteBox.js */ "./node_modules/baguetteBox.js/dist/baguetteBox.min.js"));
const webfontloader_1 = (0, tslib_1.__importDefault)(__webpack_require__(/*! webfontloader */ "./node_modules/webfontloader/webfontloader.js")); // import { Room } from './Room/Room.ts__';
// ルーム

window.addEventListener('DOMContentLoaded', () => {
  // const room = new Room();
  // サンプル準備
  let gOption = {
    async: true,
    buttons: true
  };
  let sampleList = new Map();
  let writerList = document.querySelectorAll('.writer');
  Array.prototype.forEach.call(writerList, w => {
    if (w.dataset.write != undefined || w.dataset.writer != null) {
      let n = w.dataset.writer;
      let g = baguetteBox_js_1.default.run('#gallery-' + n);
      sampleList.set(n, g); // room.addSample(n, g, gOption);

      w.children[0].dataset.writer = n;
      w.children[1].dataset.writer = n;
      w.children[1].children[0].dataset.writer = n;
      w.addEventListener('click', e => {
        let t = e.target;

        if (t.dataset.writer !== undefined) {
          baguetteBox_js_1.default.show(0, sampleList.get(t.dataset.writer)[0]);
          e.stopPropagation();
          e.preventDefault();
          window.addEventListener('click', closeSample);
        }
      });
    }
  });

  function closeSample() {
    baguetteBox_js_1.default.hide();
    window.removeEventListener('click', closeSample);
  } // room.addSample('irijako', baguetteBox.run('#gallery-irijako'), gOption);
  // room.addSample('inu', baguetteBox.run('#gallery-inu'), gOption);
  // room.addSample('usatore', baguetteBox.run('#gallery-usatore'), gOption);
  // room.addSample('gobori', baguetteBox.run('#gallery-gobori'), gOption);
  // room.addSample('daishinrin', baguetteBox.run('#gallery-daishinrin'), gOption);
  // room.addSample('chi_kun', baguetteBox.run('#gallery-chi_kun'), gOption);
  // room.addSample('chiba', baguetteBox.run('#gallery-chiba'), gOption);
  // room.addSample('chanja', baguetteBox.run('#gallery-chanja'), gOption);
  // room.addSample('tokumeikibou', baguetteBox.run('#gallery-tokumeikibou'), gOption);
  // room.addSample('najima', baguetteBox.run('#gallery-najima'), gOption);
  // room.addSample('narihayao', baguetteBox.run('#gallery-narihayao'), gOption);
  // room.addSample('niza', baguetteBox.run('#gallery-niza'), gOption);
  // room.addSample('ni_nana', baguetteBox.run('#gallery-ni_nana'), gOption);
  // room.addSample('herohero', baguetteBox.run('#gallery-herohero'), gOption);
  // room.addSample('marutoyo', baguetteBox.run('#gallery-marutoyo'), gOption);
  // room.addSample('megochimo', baguetteBox.run('#gallery-megochimo'), gOption);
  // room.addSample('unity_kong', baguetteBox.run('#gallery-unity_kong'), gOption);


  webfontloader_1.default.load({
    custom: {
      families: ['Cubicle'],
      urls: ['./css/style.css']
    },
    active: function () {
      console.log('finish font loading');
      go();
    },
    inactive: function () {
      console.log('font loading failed');
    }
  });
  const loading = document.querySelector('#loading');
  loading.style.display = 'none';
  /** 下準備が全部終わったらルームを生成 */

  const go = () => {// Promise.all(room.getPromisesIsReady())
    //   .catch((e) => {
    //     console.error('Loading Error');
    //     console.error(e);
    //     Promise.reject();
    //   })
    //   .then(() => {
    //     setTimeout(() => {
    //       room.go();
    //     }, 500);
    //   })
    //   .catch((e) => {
    //     console.error('Room Runtime Error');
    //     console.error(e);
    //   });
  };

  go();
});

/***/ }),

/***/ 0:
/*!******************************!*\
  !*** multi ./src/js/main.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/js/main.ts */"./src/js/main.ts");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map