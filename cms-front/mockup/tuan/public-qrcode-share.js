/**
 * Created by Administrator on 2016/2/27 0027.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok({
            success: true,
            data: "/tuan/qrcode?text=http%3A%2F%2Fmallybl.babamaiche.com%2Ftuan%2Fshow-tuan-msg%3FtuanId%3D5%26source%3D20000"
        }
    );
};
