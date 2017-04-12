
var palette = [
    [255,255,255],
    [228,228,228],
    [136,136,136],
    [34,34,34],
    [255,167,209],
    [229,0,0],
    [229,149,0],
    [160,106,66],
    [229,217,0],
    [148,224,68],
    [2,190,1],
    [0,211,221],
    [0,131,199],
    [0,0,234],
    [207,110,228],
    [130,0,128]
];
function Botnet(image) {
    // set default params
    image.ignore = image.ignore || [];
    image.replace = image.replace || [];
    image.dir = image.dir || 1;
    image.pixelize = image.pixelize || true;
    image.chess = image.chess || false;
    image.notification = image.notification || true;
    this.image = image;
}
Botnet.prototype.start = function() {
    var template = {
        image: new Image(),
        canvas: document.createElement('canvas'),
        context: null,
        data: null
    };
    var board = {
        canvas: document.getElementById('board'),
        context: null,
        data: null
    };
    template.context = template.canvas.getContext('2d');
    board.context = board.canvas.getContext('2d');
    this.template = template;
    this.board = board;
    var bot = this;
    bot.notification = "none";
    template.image.onload = function() {
        template.canvas.width = template.image.width;
        template.canvas.height = template.image.height;
        template.context.drawImage(template.image, 0, 0 );

        board.data = updateBoardData(board);
        template.data = template.context.getImageData(0, 0, template.image.width, template.image.height);

        if (!bot.image.pixelize) {
            var v = validateTemplate(template.data);
            if (!v.valid) {
                App.alert("Incorrect color " + v.pixel + " at ["+ v.x +", "+ v.y +"]");
                return;
            }
        }
        App.alert("Title: " + bot.image.title);
        launchBot(bot);
    };
    template.image.crossOrigin = "anonymous";
    template.image.src = this.image.src;

    if (this.image.notification) {
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }

        var onmessage = App.socket.onmessage;
        App.socket.onmessage = function(message) {
            var m = JSON.parse(message.data);

            if (m.type === "captcha_required" && bot.notification === "none") {
                bot.notification = "shown";
                var notification = new Notification('pxls.space', {
                  body: "Hey there! Enter the captcha!",
                });
            }
            return onmessage(message);
        };
    }
}
/////////////////////////////////////////////////////
//== Const ==//
var FORCE_DELAY = 3000;
var DRAW_DELAY = 1000;
var RETRY_DELAY = 12000;

function launchBot(bot) {
    // var flag = false;
    /*
    bot.image
    bot.template
    bot.board
    */
    initBotUI();
    forceDraw();
    //
    function forceDraw() {
        setTimeout(draw, FORCE_DELAY);
    }
    function draw() {
        if (bot.image.notification) {
            App.hasFiredNotification = true;
        }

        var t = (App.cooldown-(new Date).getTime()) / 1E3;
        if (t > 0) {
            bot.notification = "none";
            setTimeout(draw, DRAW_DELAY);
        } else {
            drawPixel();
            setTimeout(draw, RETRY_DELAY);
        }
    }
    function drawPixel() {
        bot.board.data = updateBoardData(bot.board);

        if (bot.image.dir == 1) {
            for (var x = 0; x < bot.template.data.width; x++) {
                for (var y = 0; y < bot.template.data.height; y++) {
                    var s = placePixelAt(x, y);
                    if (s == 0) continue;
                    if (s == 1) return;
                }
            }
        } else if (bot.image.dir == 2) {
            for (var x = bot.template.data.width - 1; x > 0 ; x--) {
                for (var y = 0; y < bot.template.data.height; y++) {
                    var s = placePixelAt(x, y);
                    if (s == 0) continue;
                    if (s == 1) return;
                }
            }
        } else if (bot.image.dir == 3) {
            for (var y = 0; y < bot.template.data.height; y++) {
                for (var x = 0; x < bot.template.data.width; x++) {
                    var s = placePixelAt(x, y);
                    if (s == 0) continue;
                    if (s == 1) return;
                }
            }
        } else if (bot.image.dir == 4) {
            for (var y = bot.template.data.height - 1; y > 0 ; y--) {
                for (var x = 0; x < bot.template.data.width; x++) {
                    var s = placePixelAt(x, y);
                    if (s == 0) continue;
                    if (s == 1) return;
                }
            }
        }
    }
    function placePixelAt(x, y) {
        var bx = x + bot.image.x;
        var by = y + bot.image.y;
        var pt = getPixel(bot.template.data, x, y);
        var pb = getPixel(bot.board.data, bx, by);

        if (pt[3] <= 127) { // alpha
            return 0;
        }
        // ignore color
        for (var ii in bot.image.ignore) {
            if (pixelEquals(bot.image.ignore[ii], pt)) {
                return 0;
            }
        }

        // replace color
        for (var ir in bot.image.replace) {
            if (!pixelEquals(bot.image.replace[ir], pb)) {
                return 0;
            }
        }

        if (bot.image.pixelize) { // pixelize
            pt = nearesColors(pt);
        }

        if (bot.image.chess) {
            var up = getPixel(bot.board.data, bx, by - 1);
            var down = getPixel(bot.board.data, bx, by + 1);
            var left = getPixel(bot.board.data, bx - 1, by);
            var right = getPixel(bot.board.data, bx + 1, by);

            if (pixelEquals(pt, up)   ||
                pixelEquals(pt, down) ||
                pixelEquals(pt, left) ||
                pixelEquals(pt, right)
            ) {
                return 0;
            }
        }

        if (!pixelEquals(pt, pb)) {
            var col = getColorIndex(pt);
            App.color = col;
            App.attemptPlace(bx, by);
            showCoordinates(bx, by);
            return 1;
        }
    }
    function initBotUI() {
        var ui = $('#ui');
        ui.append('<div class="panel" style="position: absolute;bottom: 100px;right: 32px;">'+
            bot.image.title+
            '<div class="coordinates">['+(bot.image.x)+', '+(bot.image.y)+']</div>'+
            '<button id="restartbot">Restart Bot</button></div>');
        ui.find("#restartbot").click(function(){
            drawPixel();
        });
    }
}

//== Helpers ==//
function updateBoardData(board) {
  jQuery.get("/boarddata", function(a){
    for (var b = board.context, c = new ImageData(App.width,App.height), d = new Uint32Array(c.data.buffer), f = App.palette.map(function(b) {
            b = hexToRgb(b);
            return 4278190080 | b.b << 16 | b.g << 8 | b.r
        }), e = 0; e < App.width * App.height; e++)
            d[e] = f[a.charCodeAt(e)];
    b.putImageData(c, 0, 0)
  });
    return board.context.getImageData(0, 0, board.canvas.width, board.canvas.height);
}
function validateTemplate(data) {
    for (var x = 0; x < data.width; x++)
        for (var y = 0; y < data.height; y++) {
            var pt = getPixel(data, x, y);
            if (pt[3] <= 127) continue;
            if (getColorIndex(pt)) {
                return {valid: false, pixel: pt, x: x, y: y}
            }
        }
    return {valid: true};
}
//
function getColorIndex(rgb) {
    for (var i = 0; i < palette.length; i++)
        if (pixelEquals(palette[i], rgb))
            return i;
    return -1;
}
function getPixel(data, x, y) {
    var m = y * data.width * 4;
    var n = x * 4;
    var s = m + n;
    return data.data.slice(s, s+4);
}
function pixelEquals(a, b) { // compare without Alpha
    return (
        a[0] == b[0] &&
        a[1] == b[1] &&
        a[2] == b[2]);
}

function nearesColors(color) {
    var ar = [];
    for (var i = 0; i < palette.length; i++) {
        var d = colorDistance(palette[i], color);
        ar.push(d);
    }
    var m = arrayMinIndex(ar);
    return palette[m];
}
function arrayMinIndex(a) {
    var m = a[0];
    var mi = 0;
    for (var i = 0; i < a.length; i++)
        if (a[i] < m) {
            m = a[i];
            mi = i;
        }
    return mi;
}
function colorDistance(a, b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
}
function showCoordinates(x, y) {
    $('#ui .coordinates').text('[' + x + ', ' + y + ']');
}
