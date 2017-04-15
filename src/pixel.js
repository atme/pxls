export default class Pixel {
  constructor(pixel) {
    this.r = pixel[0];
    this.g = pixel[1];
    this.b = pixel[2];
    this.a = (typeof pixel[3] === 'undefined' ? 255 : pixel[3]);
    this.index = -1;
  }

  // compare without Alpha
  isEqual(pixel) {
    if (pixel instanceof Pixel === false) {
      return false;
    }

    return (
      this.r === pixel.r &&
      this.g === pixel.g &&
      this.b === pixel.b
    );
  }

  adaptColor() {
      let distance = palette.map(color => {
        return this.colorDistance(color);
      });
      this.index = distance.indexOf(Math.min(...distance));
      this.r = palette[this.index].r;
      this.g = palette[this.index].g;
      this.b = palette[this.index].b;
  }

  colorDistance(color) {
      return Math.abs(this.r - color.r) +
             Math.abs(this.g - color.g) +
             Math.abs(this.b - color.b);
  }
}

let palette = [
  new Pixel([255, 255, 255]),
  new Pixel([228, 228, 228]),
  new Pixel([136, 136, 136]),
  new Pixel([34, 34, 34]),
  new Pixel([255, 167, 209]),
  new Pixel([229, 0, 0]),
  new Pixel([229, 149, 0]),
  new Pixel([160, 106, 66]),
  new Pixel([229, 217, 0]),
  new Pixel([148, 224, 68]),
  new Pixel([2, 190, 1]),
  new Pixel([0, 211, 221]),
  new Pixel([0, 131, 199]),
  new Pixel([0, 0, 234]),
  new Pixel([207, 110, 228]),
  new Pixel([130, 0, 128])
];
