var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok({
        'income': 1999, // 总体收入
        'couponCount': 20 // 优惠卷张数
    });
};
