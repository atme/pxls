let template = new Image();

template.canvas = document.createElement('canvas');
template.data = null;
template.crossOrigin = "anonymous";

template.onload = function() {
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  this.canvas.getContext('2d').drawImage(this, 0, 0);

  this.data = this.canvas.getContext('2d').getImageData(
    0,
    0,
    this.width,
    this.height
  );

  this.afterLoad();
}

template.setSrc = function(src, callback) {
  this.afterLoad = callback;
  this.src = src;
  return this;
}

export default template;
