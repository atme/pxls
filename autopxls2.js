var palette = [
    [255, 255, 255],
    [228, 228, 228],
    [136, 136, 136],
    [34, 34, 34],
    [255, 167, 209],
    [229, 0, 0],
    [229, 149, 0],
    [160, 106, 66],
    [229, 217, 0],
    [148, 224, 68],
    [2, 190, 1],
    [0, 211, 221],
    [0, 131, 199],
    [0, 0, 234],
    [207, 110, 228],
    [130, 0, 128]
];

function Botnet(_0x3882x3) {
    _0x3882x3['ignore'] = _0x3882x3['ignore'] || [];
    _0x3882x3['dir'] = _0x3882x3['dir'] || 0;
    _0x3882x3['pixelize'] = _0x3882x3['pixelize'] || false;
    this['image'] = _0x3882x3
}
Botnet['prototype']['start'] = function() {
    var _0x3882x4 = {
        image: new Image(),
        canvas: document['createElement']('canvas'),
        context: null,
        data: null
    };
    var _0x3882x5 = {
        canvas: document['getElementById']('board'),
        context: null,
        data: null
    };
    _0x3882x4['context'] = _0x3882x4['canvas']['getContext']('2d');
    _0x3882x5['context'] = _0x3882x5['canvas']['getContext']('2d');
    this['template'] = _0x3882x4;
    this['board'] = _0x3882x5;
    var _0x3882x6 = this;
    _0x3882x4['image']['onload'] = function() {
        _0x3882x4['canvas']['width'] = _0x3882x4['image']['width'];
        _0x3882x4['canvas']['height'] = _0x3882x4['image']['height'];
        _0x3882x4['context']['drawImage'](_0x3882x4['image'], 0, 0);
        _0x3882x5['data'] = updateBoardData(_0x3882x5);
        _0x3882x4['data'] = _0x3882x4['context']['getImageData'](0, 0, _0x3882x4['image']['width'], _0x3882x4['image']['height']);
        if (!_0x3882x6['image']['pixelize']) {
            var _0x3882x7 = validateTemplate(_0x3882x4['data']);
            if (!_0x3882x7['valid']) {
                App['alert']('Incorrect color ' + _0x3882x7['pixel'] + ' at [' + _0x3882x7['x'] + ', ' + _0x3882x7['y'] + ']');
                return
            } else {
                console['log']('Template valid true')
            }
        };
        App['alert']('Title: ' + _0x3882x6['image']['title']);
        launchBot(_0x3882x6)
    };
    _0x3882x4['image']['crossOrigin'] = 'anonymous';
    _0x3882x4['image']['src'] = this['image']['src']
};
var FORCE_DELAY = 1000;
var DRAW_DELAY = 1000;
var RETRY_DELAY = 4000;

function launchBot(_0x3882x6) {
    var _0x3882xc = false;
    _0x3882x1b();
    _0x3882xd();

    function _0x3882xd() {
        setTimeout(_0x3882xe, FORCE_DELAY)
    }

    function _0x3882xe() {
        var _0x3882xf = (App['cooldown'] - (new Date)['getTime']()) / 1E3;
        if (_0x3882xf > 0) {
            _0x3882xc = false;
            setTimeout(_0x3882xe, DRAW_DELAY)
        } else {
            if (!_0x3882xc) {
                _0x3882x10();
                _0x3882xc = true
            };
            setTimeout(_0x3882xe, RETRY_DELAY)
        }
    }

    function _0x3882x10() {
        _0x3882x6['board']['data'] = updateBoardData(_0x3882x6['board']);
        if (_0x3882x6['image']['dir'] == 1) {
            for (var _0x3882x11 = 0; _0x3882x11 < _0x3882x6['template']['data']['width']; _0x3882x11++) {
                for (var _0x3882x12 = 0; _0x3882x12 < _0x3882x6['template']['data']['height']; _0x3882x12++) {
                    var _0x3882x13 = _0x3882x14(_0x3882x11, _0x3882x12);
                    if (_0x3882x13 == 0) {
                        continue
                    };
                    if (_0x3882x13 == 1) {
                        return
                    }
                }
            }
        } else {
            if (_0x3882x6['image']['dir'] == 2) {
                for (var _0x3882x11 = _0x3882x6['template']['data']['width'] - 1; _0x3882x11 > 0; _0x3882x11--) {
                    for (var _0x3882x12 = 0; _0x3882x12 < _0x3882x6['template']['data']['height']; _0x3882x12++) {
                        var _0x3882x13 = _0x3882x14(_0x3882x11, _0x3882x12);
                        if (_0x3882x13 == 0) {
                            continue
                        };
                        if (_0x3882x13 == 1) {
                            return
                        }
                    }
                }
            } else {
                if (_0x3882x6['image']['dir'] == 3) {
                    for (var _0x3882x12 = 0; _0x3882x12 < _0x3882x6['template']['data']['height']; _0x3882x12++) {
                        for (var _0x3882x11 = 0; _0x3882x11 < _0x3882x6['template']['data']['width']; _0x3882x11++) {
                            var _0x3882x13 = _0x3882x14(_0x3882x11, _0x3882x12);
                            if (_0x3882x13 == 0) {
                                continue
                            };
                            if (_0x3882x13 == 1) {
                                return
                            }
                        }
                    }
                } else {
                    if (_0x3882x6['image']['dir'] == 4) {
                        for (var _0x3882x12 = _0x3882x6['template']['data']['height'] - 1; _0x3882x12 > 0; _0x3882x12--) {
                            for (var _0x3882x11 = 0; _0x3882x11 < _0x3882x6['template']['data']['width']; _0x3882x11++) {
                                var _0x3882x13 = _0x3882x14(_0x3882x11, _0x3882x12);
                                if (_0x3882x13 == 0) {
                                    continue
                                };
                                if (_0x3882x13 == 1) {
                                    return
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    function _0x3882x14(_0x3882x11, _0x3882x12) {
        var _0x3882x15 = _0x3882x11 + _0x3882x6['image']['x'];
        var _0x3882x16 = _0x3882x12 + _0x3882x6['image']['y'];
        var _0x3882x17 = getPixel(_0x3882x6['template']['data'], _0x3882x11, _0x3882x12);
        var _0x3882x18 = getPixel(_0x3882x6['board']['data'], _0x3882x15, _0x3882x16);
        if (_0x3882x17[3] <= 127) {
            return 0
        };
        for (var _0x3882x19 = 0; _0x3882x19 < _0x3882x6['image']['ignore']['length']; _0x3882x19++) {
            if (pixelEquals(_0x3882x6['image']['ignore'][_0x3882x19], _0x3882x17)) {
                return 0
            }
        };
        if (_0x3882x6['image']['pixelize']) {
            _0x3882x17 = nearesColors(_0x3882x17)
        };
        if (!pixelEquals(_0x3882x17, _0x3882x18)) {
            var _0x3882x1a = getColorIndex(_0x3882x17);
            App['color'] = _0x3882x1a;
            App['attemptPlace'](_0x3882x15, _0x3882x16);
            App['alert'](_0x3882x6['image']['title'] + ' Placed at [' + (_0x3882x15) + ', ' + (_0x3882x16) + '] Color ' + _0x3882x1a);
            return 1
        }
    }

    function _0x3882x1b() {
        var _0x3882x1c = $('#ui');
        _0x3882x1c['append']('<div class="panel" style="position: absolute;bottom: 100px;right: 32px;">' + _0x3882x6['image']['title'] + '<br>[' + (_0x3882x6['image']['x']) + ', ' + (_0x3882x6['image']['y']) + ']' + '<br><button id="restartbot">Restart Bot</button>' + '<br><button id="screenshot">Screenshot</button></div>');
        _0x3882x1c['find']('#restartbot')['click'](function() {
            _0x3882x10()
        });
        _0x3882x1c['find']('#screenshot')['click'](function() {
            var _0x3882x1d = document['getElementById']('board');
            var _0x3882x1e = new Image();
            _0x3882x1e['src'] = _0x3882x1d['toDataURL']('image/png');
            var _0x3882x1f = document['createElement']('a');
            _0x3882x1f['setAttribute']('download', 'board.png');
            _0x3882x1f['setAttribute']('href', _0x3882x1e['src']);
            _0x3882x1f['appendChild'](_0x3882x1e);
            _0x3882x1f['click']()
        })
    }
}

function updateBoardData(_0x3882x5) {
    jQuery['get']('/boarddata', function(_0x3882x1f) {
        for (var _0x3882x21 = _0x3882x5['context'], _0x3882x1d = new ImageData(App['width'], App['height']), _0x3882x22 = new Uint32Array(_0x3882x1d['data']['buffer']), _0x3882x23 = App['palette']['map'](function(_0x3882x21) {
                _0x3882x21 = hexToRgb(_0x3882x21);
                return 4278190080 | _0x3882x21['b'] << 16 | _0x3882x21['g'] << 8 | _0x3882x21['r']
            }), _0x3882x24 = 0; _0x3882x24 < App['width'] * App['height']; _0x3882x24++) {
            _0x3882x22[_0x3882x24] = _0x3882x23[_0x3882x1f['charCodeAt'](_0x3882x24)]
        };
        _0x3882x21['putImageData'](_0x3882x1d, 0, 0)
    });
    return _0x3882x5['context']['getImageData'](0, 0, _0x3882x5['canvas']['width'], _0x3882x5['canvas']['height'])
}

function validateTemplate(_0x3882x26) {
    for (var _0x3882x11 = 0; _0x3882x11 < _0x3882x26['width']; _0x3882x11++) {
        for (var _0x3882x12 = 0; _0x3882x12 < _0x3882x26['height']; _0x3882x12++) {
            var _0x3882x17 = getPixel(_0x3882x26, _0x3882x11, _0x3882x12);
            if (_0x3882x17[3] <= 127) {
                continue
            };
            if (getColorIndex(_0x3882x17)) {
                return {
                    valid: false,
                    pixel: _0x3882x17,
                    x: _0x3882x11,
                    y: _0x3882x12
                }
            }
        }
    };
    return {
        valid: true
    }
}

function getColorIndex(_0x3882x28) {
    for (var _0x3882x29 = 0; _0x3882x29 < palette['length']; _0x3882x29++) {
        if (pixelEquals(palette[_0x3882x29], _0x3882x28)) {
            return _0x3882x29
        }
    };
    return -1
}

function getPixel(_0x3882x26, _0x3882x11, _0x3882x12) {
    var _0x3882x2b = _0x3882x12 * _0x3882x26['width'] * 4;
    var _0x3882x2c = _0x3882x11 * 4;
    var _0x3882x13 = _0x3882x2b + _0x3882x2c;
    return _0x3882x26['data']['slice'](_0x3882x13, _0x3882x13 + 4)
}

function pixelEquals(_0x3882x1f, _0x3882x21) {
    return (_0x3882x1f[0] == _0x3882x21[0] && _0x3882x1f[1] == _0x3882x21[1] && _0x3882x1f[2] == _0x3882x21[2])
}

function nearesColors(_0x3882x2f) {
    var _0x3882x30 = [];
    for (var _0x3882x29 = 0; _0x3882x29 < palette['length']; _0x3882x29++) {
        var _0x3882x22 = colorDistance(palette[_0x3882x29], _0x3882x2f);
        _0x3882x30['push'](_0x3882x22)
    };
    var _0x3882x2b = arrayMinIndex(_0x3882x30);
    return palette[_0x3882x2b]
}

function arrayMinIndex(_0x3882x1f) {
    var _0x3882x2b = _0x3882x1f[0];
    var _0x3882x32 = 0;
    for (var _0x3882x29 = 0; _0x3882x29 < _0x3882x1f['length']; _0x3882x29++) {
        if (_0x3882x1f[_0x3882x29] < _0x3882x2b) {
            _0x3882x2b = _0x3882x1f[_0x3882x29];
            _0x3882x32 = _0x3882x29
        }
    };
    return _0x3882x32
}

function colorDistance(_0x3882x1f, _0x3882x21) {
    return Math['abs'](_0x3882x1f[0] - _0x3882x21[0]) + Math['abs'](_0x3882x1f[1] - _0x3882x21[1]) + Math['abs'](_0x3882x1f[2] - _0x3882x21[2])
}