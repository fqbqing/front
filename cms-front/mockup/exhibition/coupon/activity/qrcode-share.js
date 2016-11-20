/**
 * Created by Administrator on 2016/4/8 0008.
 */

/**
 * Created by Administrator on 2016/4/8 0008.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok(
        "/api/exhibition-coupon-activity/qrcode?text=http%3A%2F%2Fmalltest.babamaiche.com%2Fcoupon%2Findex%3FactivityId%3D2%26source%3D20012"
    );

};