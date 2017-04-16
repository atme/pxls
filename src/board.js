import Canvas from './canvas';

export default class Board extends Canvas {
  update() {
    let canvas = App.elements.board[0];
    this.canvas = canvas.getContext('2d').getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
  }
}
