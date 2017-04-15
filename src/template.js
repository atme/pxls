import Canvas from './canvas';

export default class Template extends Canvas {
  constructor() {
    super();
    this.setUpCanvas();
  }

  setUpCanvas() {
    let template = this;
    let canvas = document.createElement('canvas');
    this.image = new Image();

    this.image.crossOrigin = "anonymous";

    this.image.onload = function() {
      canvas.width = this.width;
      canvas.height = this.height;
      canvas.getContext('2d').drawImage(this, 0, 0);

      template.canvas = canvas.getContext('2d').getImageData(
        0,
        0,
        this.width,
        this.height
      );

      template.afterLoad();
    }
  }

  static loadImage(src, callback) {
    let template = new this;

    template.afterLoad = callback;
    template.image.src = src;
    return template;
  }
}
