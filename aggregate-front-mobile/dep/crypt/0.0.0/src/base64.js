/**
 * @file base64.js
 * @author github
 **/

define(function (require) {
    var _PADCHAR = '=';
    var _ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var _VERSION = '1.0';

    function getbyte64(s, i) {
        // This is oddly fast, except on Chrome/V8.
        // Minimal or no improvement in performance by using a
        // object with properties mapping chars to value (eg. 'A': 0)

        var idx = _ALPHA.indexOf(s.charAt(i));

        if (idx === -1) {
            throw 'Cannot decode base64';
        }

        return idx;
    }

    function decode(s) {
        var pads = 0;
        var i;
        var b10;
        var imax = s.length;
        var x = [];

        s = String(s);

        if (imax === 0) {
            return s;
        }

        if (imax % 4 !== 0) {
            throw 'Cannot decode base64';
        }

        if (s.charAt(imax - 1) === _PADCHAR) {
            pads = 1;

            if (s.charAt(imax - 2) === _PADCHAR) {
                pads = 2;
            }

            // either way, we want to ignore this last block
            imax -= 4;
        }

        for (i = 0; i < imax; i += 4) {
            b10 = (getbyte64(s, i) << 18) | (getbyte64(s, i + 1) << 12)
                | (getbyte64(s, i + 2) << 6) | getbyte64(s, i + 3);
            x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff, b10 & 0xff));
        }

        switch (pads) {
            case 1:
                b10 = (getbyte64(s, i) << 18) | (getbyte64(s, i + 1) << 12) | (getbyte64(s, i + 2) << 6);
                x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff));
                break;

            case 2:
                b10 = (getbyte64(s, i) << 18) | (getbyte64(s, i + 1) << 12);
                x.push(String.fromCharCode(b10 >> 16));
                break;
        }

        return x.join('');
    }

    function getbyte(s, i) {
        var x = s.charCodeAt(i);

        if (x > 255) {
            throw 'INVALID_CHARACTER_ERR: DOM Exception 5';
        }

        return x;
    }

    function encode(s) {
        if (arguments.length !== 1) {
            throw 'SyntaxError: exactly one argument required';
        }

        s = String(s);

        var i;
        var b10;
        var x = [];
        var imax = s.length - s.length % 3;

        if (s.length === 0) {
            return s;
        }

        for (i = 0; i < imax; i += 3) {
            b10 = (getbyte(s, i) << 16) | (getbyte(s, i + 1) << 8) | getbyte(s, i + 2);
            x.push(_ALPHA.charAt(b10 >> 18));
            x.push(_ALPHA.charAt((b10 >> 12) & 0x3F));
            x.push(_ALPHA.charAt((b10 >> 6) & 0x3f));
            x.push(_ALPHA.charAt(b10 & 0x3f));
        }

        switch (s.length - imax) {
            case 1:
                b10 = getbyte(s, i) << 16;
                x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt((b10 >> 12) & 0x3F) + _PADCHAR + _PADCHAR);
                break;

            case 2:
                b10 = (getbyte(s, i) << 16) | (getbyte(s, i + 1) << 8);
                x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt((b10 >> 12) & 0x3F)
                    + _ALPHA.charAt((b10 >> 6) & 0x3f) + _PADCHAR);
                break;
        }

        return x.join('');
    }

    return {
        decode: decode,
        encode: encode,
        VERSION: _VERSION
    };
});
