/**
 * Created by Administrator on 2016/2/24 0024.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.ok({
        10: "可以访问其它组织的数据",
        20: "可以访问本组织的数据",
        30: "可以访问下属的数据"
    });

};