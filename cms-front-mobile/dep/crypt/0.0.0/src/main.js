/**
 * Created by lifayu on 16/3/3.
 */

define(function (require) {

    var base64 = require('./base64');
    var md5 = require('./md5');

    return {
        md5: md5.hexdigest,
        decode: base64.decode,
        encode: base64.encode
    };
});