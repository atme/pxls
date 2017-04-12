# How to use

1. Press F12 (Windows, Linux) or Cmd+Alt+I (MacOS) in Chrome
2. Paste the code

```javascript
(function(){
    var _script = document.createElement('script');
    _script.type = "text/javascript";
    _script.src = "https://rawgit.com/atme/pxls/master/autopxls.js";
    _script.onload = function() {
        var b = new Botnet({
            title: "chan", // title of botnet
            src: "https://i.imgur.com/u8yZ7zc.png", // link to image
            x: 1147, // first x coordinate
            y: 1192, // first y coordinate
            ignore: [[255, 255, 255]], // default: []; colors, which the script has to ignore
            replace: [[34, 34, 34]], // default: []; colors, which the script has to replace on canvas
            dir: 1, // default: 1; how the script has to move
            pixelize: true, // default: true; must the script automatically pick right colors?
            chess: true // default: false; must the script draw pixels like chess?
            notification: true // default: true; show captcha notification?
        });
        b.start();
    }
    document.getElementsByTagName('head')[0].appendChild(_script);
})();
```
