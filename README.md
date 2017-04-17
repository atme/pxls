# How to use

1. Press F12 (Windows, Linux) or Cmd+Alt+I (MacOS) in Chrome
2. Paste the code

```javascript
(function() {
  window.config = {
    title: "title", // title of botnet
    src: "https://i.imgur.com/7NgC7qM.jpg", // link to image
    x: 500, // first x coordinate
    y: 500, // first y coordinate
    ignore: [[255, 255, 255]], // default: []; colors, which the script has to ignore
    replace: [[34, 34, 34]], // default: []; colors, which the script has to replace on canvas
    dir: 1, // default: 1; how the script has to move
    chess: true // default: false; must the script draw pixels like chess?
    notification: true // default: true; show captcha notification?
  };
  var _script = document.createElement('script');
  _script.type = "text/javascript";
  _script.src = "https://cdn.rawgit.com/atme/pxls/v1.0/dist/bot.bundle.js";
  document.getElementsByTagName('head')[0].appendChild(_script);
})();
```
