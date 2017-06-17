# Enc
Syntax:
```esy
enc{
    //code to encrypt
}
```
Imagine in your project you have a special section (like your login section) that you want to make it harder for other 
people to understand it, it this case you can use this block.

> We use `javascript-obfuscator` to do this.

## Example
```esy
enc{
    console.log("Hello World!")
}
```
After compile with default configs:
```js
var _0xa998 = [
    'log',
    'Hello\x20World\x21'
];
(function(_0x41f284, _0x183dad) {
    var _0x1c80cb = function(_0xa108b9) {
        while (--_0xa108b9) {
            _0x41f284['\x70\x75\x73\x68'](_0x41f284['\x73\x68\x69\x66\x74']());
        }
    };
    _0x1c80cb(++_0x183dad);
}(_0xa998, 0x1da));
var _0x8a99 = function(_0x4fd26d, _0x511002) {
    _0x4fd26d = _0x4fd26d - 0x0;
    var _0x39d70c = _0xa998[_0x4fd26d];
    return _0x39d70c;
};
console[_0x8a99('0x0')](_0x8a99('0x1'));
```
## Configs
The config key is `obfuscator`

Default values:
```json
{
    "compact": false,
    "controlFlowFlattening": false,
    "controlFlowFlatteningThreshold": 0.75,
    "deadCodeInjection": false,
    "deadCodeInjectionThreshold": 0.4,
    "debugProtection": false,
    "debugProtectionInterval": false,
    "disableConsoleOutput": false,
    "mangle": false,
    "reservedNames": [],
    "rotateStringArray": true,
    "seed": 0,
    "selfDefending": false,
    "sourceMap": false,
    "sourceMapBaseUrl": "",
    "sourceMapFileName": "",
    "sourceMapMode": "separate",
    "stringArray": true,
    "stringArrayEncoding": false,
    "stringArrayThreshold": 0.75,
    "unicodeEscapeSequence": false
}
```
This is the output of following command:
 ```bash
 esy config get obfuscator -jb
 ```
 To change a config like `controlFlowFlattening` run this code:
 ```bash
 esy config set obfuscator.controlFlowFlattening true
 ```