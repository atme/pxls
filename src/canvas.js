import Pixel from './pixel';

export default class Canvas {
  getPixel(x, y) {
    const rgba = 4;
    let coordinate = rgba * (y * this.canvas.width + x);
    return new Pixel(
      this.canvas.data.slice(coordinate, coordinate + rgba)
    );
  }
}
