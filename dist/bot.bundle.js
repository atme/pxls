/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _template = __webpack_require__(4);

var _template2 = _interopRequireDefault(_template);

var _canvas = __webpack_require__(2);

var _canvas2 = _interopRequireDefault(_canvas);

var _palette = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bot = function () {
    function Bot(params) {
        _classCallCheck(this, Bot);

        this.title = params.title || '';
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.src = params.src;
        this.ignore = params.ignore || [];
        this.replace = params.replace || [];
        this.dir = params.dir || 1;
        this.chess = params.chess || false;
        this.notification = params.notification || true;

        this.setNotifications();

        this.run();
    }

    _createClass(Bot, [{
        key: "run",
        value: function run() {
            var _this = this;

            // this.board = new Board;
            this.template = _template2.default.setSrc(this.src, function () {
                // this.board.update();
                App.alert("Title: " + _this.title);
                // this.initUI();
                _this.draw();
            });
        }
    }, {
        key: "setNotifications",
        value: function setNotifications() {
            if (!this.notification) {
                return;
            }

            if (Notification.permission !== 'granted') {
                Notification.requestPermission();
            }

            var onmessage = App.socket.onmessage;
            App.socket.onmessage = function (message) {
                var data = JSON.parse(message.data);

                if (data.type === "captcha_required" && !this.notified) {
                    this.notified = true;
                    new Notification('pxls.space', {
                        body: "Hey there! Enter the captcha!"
                    });
                }
                return onmessage(message);
            };
        }
    }, {
        key: "draw",
        value: function draw() {
            var _this2 = this;

            if (this.notification) {
                App.hasFiredNotification = true;
            }

            var time = (App.cooldown - new Date().getTime()) / 1E3;
            if (time > 0) {
                this.notified = false;
                setTimeout(function () {
                    return _this2.draw();
                }, 3E3);
                return;
            }

            this.canvas = _canvas2.default.getData();

            this.drawPixel();
            setTimeout(function () {
                return _this2.draw();
            }, 2E4);
        }
    }, {
        key: "drawPixel",
        value: function drawPixel() {
            var x = void 0;
            var y = void 0;
            var s = void 0;
            if (this.dir == 1) {
                for (x = 0; x < this.template.data.width; x++) {
                    for (y = 0; y < this.template.data.height; y++) {
                        s = this.placePixelAt(x, y);
                        if (s == 0) continue;
                        if (s == 1) return;
                    }
                }
            } else if (this.dir == 2) {
                for (x = this.template.data.width - 1; x > 0; x--) {
                    for (y = 0; y < this.template.data.height; y++) {
                        s = this.placePixelAt(x, y);
                        if (s == 0) continue;
                        if (s == 1) return;
                    }
                }
            } else if (this.dir == 3) {
                for (y = 0; y < this.template.data.height; y++) {
                    for (x = 0; x < this.template.data.width; x++) {
                        s = this.placePixelAt(x, y);
                        if (s == 0) continue;
                        if (s == 1) return;
                    }
                }
            } else if (this.dir == 4) {
                for (y = this.template.data.height - 1; y > 0; y--) {
                    for (x = 0; x < this.template.data.width; x++) {
                        s = this.placePixelAt(x, y);
                        if (s == 0) continue;
                        if (s == 1) return;
                    }
                }
            }
        }
    }, {
        key: "placePixelAt",
        value: function placePixelAt(x, y) {
            var bx = x + this.x;
            var by = y + this.y;
            var pt = this.getPixel(this.template.data, x, y);
            var pb = this.getPixel(this.canvas, bx, by);

            if (pt[3] <= 127) {
                // alpha
                return 0;
            }

            pt = this.nearesColors(pt);

            // ignore color
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.ignore[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var ignore = _step.value;

                    if (this.pixelEquals(ignore, pt)) {
                        return 0;
                    }
                }

                // replace color
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.replace[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var replace = _step2.value;

                    if (!this.pixelEquals(replace, pb)) {
                        return 0;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            if (this.chess) {
                var up = this.getPixel(this.canvas, bx, by - 1);
                var down = this.getPixel(this.canvas, bx, by + 1);
                var left = this.getPixel(this.canvas, bx - 1, by);
                var right = this.getPixel(this.canvas, bx + 1, by);

                if (this.pixelEquals(pt, up) || this.pixelEquals(pt, down) || this.pixelEquals(pt, left) || this.pixelEquals(pt, right)) {
                    return 0;
                }
            }

            if (!this.pixelEquals(pt, pb)) {
                var col = this.getColorIndex(pt);
                App.color = col;
                App.attemptPlace(bx, by);
                console.log('[' + bx + ' ' + by + ']');
                return 1;
            }
        }
    }, {
        key: "getPixel",
        value: function getPixel(data, x, y) {
            var m = y * data.width * 4;
            var n = x * 4;
            var s = m + n;
            return data.data.slice(s, s + 4);
        }
    }, {
        key: "pixelEquals",
        value: function pixelEquals(a, b) {
            // compare without Alpha
            // console.log(a, b);
            for (var i = 0; i < a.length; ++i) {
                if (a[i] !== b[i]) return false;
            }
            return true;
        }
    }, {
        key: "nearesColors",
        value: function nearesColors(color) {
            var ar = [];
            for (var i = 0; i < _palette.palette.length; i++) {
                var d = this.colorDistance(_palette.palette[i], color);
                ar.push(d);
            }
            var m = this.arrayMinIndex(ar);
            return _palette.palette[m];
        }
    }, {
        key: "arrayMinIndex",
        value: function arrayMinIndex(a) {
            var m = a[0];
            var mi = 0;
            for (var i = 0; i < a.length; i++) {
                if (a[i] < m) {
                    m = a[i];
                    mi = i;
                }
            }return mi;
        }
    }, {
        key: "colorDistance",
        value: function colorDistance(a, b) {
            return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
        }
    }, {
        key: "getColorIndex",
        value: function getColorIndex(rgb) {
            for (var i = 0; i < _palette.palette.length; i++) {
                if (this.pixelEquals(_palette.palette[i], rgb)) return i;
            }return -1;
        }
    }]);

    return Bot;
}();

exports.default = Bot;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _bot = __webpack_require__(0);

var _bot2 = _interopRequireDefault(_bot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _bot2.default(window.config);
delete window.config;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = function () {
  function Canvas() {
    _classCallCheck(this, Canvas);

    this.canvas = document.getElementById('board');
    this.data = null;
  }

  _createClass(Canvas, null, [{
    key: 'getData',
    value: function getData() {
      var canvas = document.getElementById('board');
      return canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    }
  }]);

  return Canvas;
}();

exports.default = Canvas;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var palette = exports.palette = [[255, 255, 255], [228, 228, 228], [136, 136, 136], [34, 34, 34], [255, 167, 209], [229, 0, 0], [229, 149, 0], [160, 106, 66], [229, 217, 0], [148, 224, 68], [2, 190, 1], [0, 211, 221], [0, 131, 199], [0, 0, 234], [207, 110, 228], [130, 0, 128]];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var template = new Image();

template.canvas = document.createElement('canvas');
template.data = null;
template.crossOrigin = "anonymous";

template.onload = function () {
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  this.canvas.getContext('2d').drawImage(this, 0, 0);

  this.data = this.canvas.getContext('2d').getImageData(0, 0, this.width, this.height);

  this.afterLoad();
};

template.setSrc = function (src, callback) {
  this.afterLoad = callback;
  this.src = src;
  return this;
};

exports.default = template;

/***/ })
/******/ ]);