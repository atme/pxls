# How to use
```javascript
(function(){
    var _script = document.createElement('script');
    _script.type = "text/javascript";
    _script.src = "https://raw.githubusercontent.com/atme/pxls/master/autopxls.js";
    _script.onload = function() {
        var b = new Botnet({
            title: "chan",
            src: "https://i.imgur.com/u8yZ7zc.png",
            x: 1147,
            y: 1192,
            ignore: [255, 255, 255],
            dir: 1,
            pixelize: true,
            chess: true
        });
        b.start();
    }
    document.getElementsByTagName('head')[0].appendChild(_script);
})();
```
