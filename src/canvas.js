export default class Canvas {
  constructor() {
    this.canvas = document.getElementById('board');
    this.data = null;
  }

  static getData() {
    let canvas = document.getElementById('board');
    return canvas.getContext('2d').getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
  }
}
