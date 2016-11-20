/**
 * Created by baba on 16/4/7.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.ok(
        "/api/exhibition-coupon-activity/qrcode?text=http%3A%2F%2Fmalltest.babamaiche.com%2Fcoupon%2Findex%3FactivityId%3D2"
    );

};