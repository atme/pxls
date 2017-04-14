import Template from "./template";
import Canvas from "./canvas";
import {palette} from "./palette";

export default class Bot {

  constructor(params) {
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

  run() {
    // this.board = new Board;
    this.template = Template.setSrc(this.src, () => {
      // this.board.update();
      App.alert("Title: " + this.title);
      // this.initUI();
      this.draw();
    });
  }

  setNotifications() {
    if (!this.notification) {
      return;
    }

    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }

    let onmessage = App.socket.onmessage;
    App.socket.onmessage = function(message) {
        let data = JSON.parse(message.data);

        if (data.type === "captcha_required" && !this.notified) {
            this.notified = true;
            new Notification('pxls.space', {
              body: "Hey there! Enter the captcha!",
            });
        }
        return onmessage(message);
    };
  }

  draw() {
    if (this.notification) {
        App.hasFiredNotification = true;
    }

    let time = (App.cooldown - (new Date).getTime()) / 1E3;
    if (time > 0) {
        this.notified = false;
        setTimeout(() => this.draw(), 3E3);
        return;
    }

    this.canvas = Canvas.getData();

    this.drawPixel();
    setTimeout(() => this.draw(), 2E4);
  }

  drawPixel() {
    let x;
    let y;
    let s;
      if (this.dir == 1) {
          for (x = 0; x < this.template.data.width; x++) {
              for (y = 0; y < this.template.data.height; y++) {
                  s = this.placePixelAt(x, y);
                  if (s == 0) continue;
                  if (s == 1) return;
              }
          }
      } else if (this.dir == 2) {
          for (x = this.template.data.width - 1; x > 0 ; x--) {
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
          for (y = this.template.data.height - 1; y > 0 ; y--) {
              for (x = 0; x < this.template.data.width; x++) {
                  s = this.placePixelAt(x, y);
                  if (s == 0) continue;
                  if (s == 1) return;
              }
          }
      }
  }

  placePixelAt(x, y) {
      let bx = x + this.x;
      let by = y + this.y;
      let pt = this.getPixel(this.template.data, x, y);
      let pb = this.getPixel(this.canvas, bx, by);

      if (pt[3] <= 127) { // alpha
          return 0;
      }

      pt = this.nearesColors(pt);

      // ignore color
      for (let ignore of this.ignore) {
          if (this.pixelEquals(ignore, pt)) {
              return 0;
          }
      }

      // replace color
      for (let replace of this.replace) {
          if (!this.pixelEquals(replace, pb)) {
              return 0;
          }
      }

      if (this.chess) {
          let up = this.getPixel(this.canvas, bx, by - 1);
          let down = this.getPixel(this.canvas, bx, by + 1);
          let left = this.getPixel(this.canvas, bx - 1, by);
          let right = this.getPixel(this.canvas, bx + 1, by);

          if (this.pixelEquals(pt, up)   ||
              this.pixelEquals(pt, down) ||
              this.pixelEquals(pt, left) ||
              this.pixelEquals(pt, right)
          ) {
              return 0;
          }
      }

      if (!this.pixelEquals(pt, pb)) {
          let col = this.getColorIndex(pt);
          App.color = col;
          App.attemptPlace(bx, by);
          console.log('['+bx+' '+by+']');
          return 1;
      }
  }

  getPixel(data, x, y) {
      let m = y * data.width * 4;
      let n = x * 4;
      let s = m + n;
      return data.data.slice(s, s + 4);
  }

  pixelEquals(a, b) { // compare without Alpha
    return (
      a[0] === b[0] &&
      a[1] === b[1] &&
      a[2] === b[2]
    );
  }

  nearesColors(color) {
      let ar = [];
      for (let i = 0; i < palette.length; i++) {
          let d = this.colorDistance(palette[i], color);
          ar.push(d);
      }
      let m = this.arrayMinIndex(ar);
      return palette[m];
  }

  arrayMinIndex(a) {
      let m = a[0];
      let mi = 0;
      for (let i = 0; i < a.length; i++)
          if (a[i] < m) {
              m = a[i];
              mi = i;
          }
      return mi;
  }

  colorDistance(a, b) {
      return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
  }


  getColorIndex(rgb) {
      for (var i = 0; i < palette.length; i++)
          if (this.pixelEquals(palette[i], rgb))
              return i;
      return -1;
  }

}
