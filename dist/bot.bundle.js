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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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

var _pixel = __webpack_require__(1);

var _pixel2 = _interopRequireDefault(_pixel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = function () {
  function Canvas() {
    _classCallCheck(this, Canvas);
  }

  _createClass(Canvas, [{
    key: 'getPixel',
    value: function getPixel(x, y) {
      var rgba = 4;
      var coordinate = rgba * (y * this.canvas.width + x);
      return new _pixel2.default(this.canvas.data.slice(coordinate, coordinate + rgba));
    }
  }]);

  return Canvas;
}();

exports.default = Canvas;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pixel = function () {
  function Pixel(pixel) {
    _classCallCheck(this, Pixel);

    this.r = pixel[0];
    this.g = pixel[1];
    this.b = pixel[2];
    this.a = typeof pixel[3] === 'undefined' ? 255 : pixel[3];
    this.index = -1;
  }

  // compare without Alpha


  _createClass(Pixel, [{
    key: 'isEqual',
    value: function isEqual(pixel) {
      if (pixel instanceof Pixel === false) {
        return false;
      }

      return this.r === pixel.r && this.g === pixel.g && this.b === pixel.b;
    }
  }, {
    key: 'adaptColor',
    value: function adaptColor() {
      var _this = this;

      var distance = palette.map(function (color) {
        return _this.colorDistance(color);
      });
      this.index = distance.indexOf(Math.min.apply(Math, _toConsumableArray(distance)));
      this.r = palette[this.index].r;
      this.g = palette[this.index].g;
      this.b = palette[this.index].b;
    }
  }, {
    key: 'colorDistance',
    value: function colorDistance(color) {
      return Math.abs(this.r - color.r) + Math.abs(this.g - color.g) + Math.abs(this.b - color.b);
    }
  }]);

  return Pixel;
}();

exports.default = Pixel;


var palette = [new Pixel([255, 255, 255]), new Pixel([228, 228, 228]), new Pixel([136, 136, 136]), new Pixel([34, 34, 34]), new Pixel([255, 167, 209]), new Pixel([229, 0, 0]), new Pixel([229, 149, 0]), new Pixel([160, 106, 66]), new Pixel([229, 217, 0]), new Pixel([148, 224, 68]), new Pixel([2, 190, 1]), new Pixel([0, 211, 221]), new Pixel([0, 131, 199]), new Pixel([0, 0, 234]), new Pixel([207, 110, 228]), new Pixel([130, 0, 128])];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _template = __webpack_require__(5);

var _template2 = _interopRequireDefault(_template);

var _board = __webpack_require__(4);

var _board2 = _interopRequireDefault(_board);

var _pixel = __webpack_require__(1);

var _pixel2 = _interopRequireDefault(_pixel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bot = function () {
    function Bot(params) {
        _classCallCheck(this, Bot);

        this.setParams(params);
        this.setNotifications();
        this.run();
    }

    _createClass(Bot, [{
        key: 'run',
        value: function run() {
            var _this = this;

            this.board = new _board2.default();
            this.template = _template2.default.loadImage(this.src, function () {
                App.alert("Title: " + _this.title);
                _this.draw();
            });
        }
    }, {
        key: 'setParams',
        value: function setParams(params) {
            this.title = params.title || '';
            this.x = params.x || 0;
            this.y = params.y || 0;
            this.src = params.src;
            this.ignore = params.ignore || [];
            this.replace = params.replace || [];
            this.dir = params.dir || 1;
            this.chess = params.chess || false;
            this.notification = params.notification || true;
        }
    }, {
        key: 'setNotifications',
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
        key: 'draw',
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

            this.board.update();

            this.drawPixel();
            setTimeout(function () {
                return _this2.draw();
            }, 2E4);
        }
    }, {
        key: 'drawPixel',
        value: function drawPixel() {
            var x = void 0;
            var y = void 0;
            var s = void 0;
            if (this.dir == 1) {
                for (x = 0; x < this.template.canvas.width; x++) {
                    for (y = 0; y < this.template.canvas.height; y++) {
                        s = this.placePixelAt(x, y);
                        if (s == 0) continue;
                        if (s == 1) return;
                    }
                }
            } else if (this.dir == 2) {
                for (x = this.template.canvas.width - 1; x > 0; x--) {
                    for (y = 0; y < this.template.canvas.height; y++) {
                        s = this.placePixelAt(x, y);
                        if (s == 0) continue;
                        if (s == 1) return;
                    }
                }
            } else if (this.dir == 3) {
                for (y = 0; y < this.template.canvas.height; y++) {
                    for (x = 0; x < this.template.canvas.width; x++) {
                        s = this.placePixelAt(x, y);
                        if (s == 0) continue;
                        if (s == 1) return;
                    }
                }
            } else if (this.dir == 4) {
                for (y = this.template.canvas.height - 1; y > 0; y--) {
                    for (x = 0; x < this.template.canvas.width; x++) {
                        s = this.placePixelAt(x, y);
                        if (s == 0) continue;
                        if (s == 1) return;
                    }
                }
            }
        }
    }, {
        key: 'placePixelAt',
        value: function placePixelAt(x, y) {
            var bx = x + this.x;
            var by = y + this.y;
            var templatePixel = this.template.getPixel(x, y);
            var boardPixel = this.board.getPixel(bx, by);

            if (templatePixel.a <= 127) {
                // alpha
                return 0;
            }

            templatePixel.adaptColor();

            // ignore color
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.ignore[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var ignore = _step.value;

                    if (templatePixel.isEqual(new _pixel2.default(ignore))) {
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

                    if (!boardPixel.isEqual(new _pixel2.default(replace))) {
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
                var up = this.board.getPixel(bx, by - 1);
                var down = this.board.getPixel(bx, by + 1);
                var left = this.board.getPixel(bx - 1, by);
                var right = this.board.getPixel(bx + 1, by);

                if (templatePixel.isEqual(up) || templatePixel.isEqual(down) || templatePixel.isEqual(left) || templatePixel.isEqual(right)) {
                    return 0;
                }
            }

            if (!templatePixel.isEqual(boardPixel)) {
                App.color = templatePixel.index;
                App.attemptPlace(bx, by);
                console.log('[' + bx + ' ' + by + ']');
                return 1;
            }
        }
    }]);

    return Bot;
}();

exports.default = Bot;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _bot = __webpack_require__(2);

var _bot2 = _interopRequireDefault(_bot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _bot2.default(window.config);
delete window.config;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _canvas = __webpack_require__(0);

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Board = function (_Canvas) {
  _inherits(Board, _Canvas);

  function Board() {
    _classCallCheck(this, Board);

    return _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).apply(this, arguments));
  }

  _createClass(Board, [{
    key: 'update',
    value: function update() {
      var canvas = document.getElementById('board');
      this.canvas = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    }
  }]);

  return Board;
}(_canvas2.default);

exports.default = Board;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _canvas = __webpack_require__(0);

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Template = function (_Canvas) {
  _inherits(Template, _Canvas);

  function Template() {
    _classCallCheck(this, Template);

    var _this = _possibleConstructorReturn(this, (Template.__proto__ || Object.getPrototypeOf(Template)).call(this));

    _this.setUpCanvas();
    return _this;
  }

  _createClass(Template, [{
    key: 'setUpCanvas',
    value: function setUpCanvas() {
      var template = this;
      var canvas = document.createElement('canvas');
      this.image = new Image();

      this.image.crossOrigin = "anonymous";

      this.image.onload = function () {
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.getContext('2d').drawImage(this, 0, 0);

        template.canvas = canvas.getContext('2d').getImageData(0, 0, this.width, this.height);

        template.afterLoad();
      };
    }
  }], [{
    key: 'loadImage',
    value: function loadImage(src, callback) {
      var template = new this();

      template.afterLoad = callback;
      template.image.src = src;
      return template;
    }
  }]);

  return Template;
}(_canvas2.default);

exports.default = Template;

/***/ })
/******/ ]);