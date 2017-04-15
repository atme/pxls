import Template from './template';
import Board from './board';
import Pixel from './pixel';

export default class Bot {

  constructor(params) {
    this.setParams(params);
    this.setNotifications();
    this.run();
  }

  run() {
    this.board = new Board;
    this.template = Template.loadImage(this.src, () => {
      App.alert("Title: " + this.title);
      this.draw();
    });
  }

  setParams(params) {
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

    this.board.update();

    this.drawPixel();
    setTimeout(() => this.draw(), 2E4);
  }

  drawPixel() {
    let x;
    let y;
    let s;
      if (this.dir == 1) {
          for (x = 0; x < this.template.canvas.width; x++) {
              for (y = 0; y < this.template.canvas.height; y++) {
                  s = this.placePixelAt(x, y);
                  if (s == 0) continue;
                  if (s == 1) return;
              }
          }
      } else if (this.dir == 2) {
          for (x = this.template.canvas.width - 1; x > 0 ; x--) {
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
          for (y = this.template.canvas.height - 1; y > 0 ; y--) {
              for (x = 0; x < this.template.canvas.width; x++) {
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
      let templatePixel = this.template.getPixel(x, y);
      let boardPixel = this.board.getPixel(bx, by);

      if (templatePixel.a <= 127) { // alpha
          return 0;
      }

      templatePixel.adaptColor();

      // ignore color
      for (let ignore of this.ignore) {
          if (templatePixel.isEqual(new Pixel(ignore))) {
              return 0;
          }
      }

      // replace color
      for (let replace of this.replace) {
          if (!boardPixel.isEqual(new Pixel(replace))) {
              return 0;
          }
      }

      if (this.chess) {
          let up = this.board.getPixel(bx, by - 1);
          let down = this.board.getPixel(bx, by + 1);
          let left = this.board.getPixel(bx - 1, by);
          let right = this.board.getPixel(bx + 1, by);

          if (templatePixel.isEqual(up)   ||
              templatePixel.isEqual(down) ||
              templatePixel.isEqual(left) ||
              templatePixel.isEqual(right)
          ) {
              return 0;
          }
      }

      if (!templatePixel.isEqual(boardPixel)) {
          App.color = templatePixel.index;
          App.attemptPlace(bx, by);
          console.log('['+bx+' '+by+']');
          return 1;
      }
  }

}
