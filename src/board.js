import Canvas from './canvas';

export default class Board extends Canvas {
  update() {
    let canvas = document.getElementById('board');
    this.canvas = canvas.getContext('2d').getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
  }
}
